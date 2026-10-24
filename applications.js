// 投递管理脚本 - 幻星填表助手
let applicationsList = [];
let activeStatusFilter = "all";
let activeSearchQuery = "";
let currentView = "table";
let selectedRecordIds = new Set();
let autoAddEnabled = true;

const STATUS_COLOR_MAP = {
  "未投递": { color: "#475569", bg: "#f1f5f9" },
  "已投递": { color: "#0284c7", bg: "#f0f9ff" },
  "已一面": { color: "#d97706", bg: "#fffbeb" },
  "已二面": { color: "#ea580c", bg: "#fff7ed" },
  "已终面": { color: "#7c3aed", bg: "#f5f3ff" },
  "已获Offer": { color: "#16a34a", bg: "#f0fdf4" },
  "未通过": { color: "#dc2626", bg: "#fef2f2" },
  "已放弃": { color: "#6b7280", bg: "#f3f4f6" }
};

const DOWNSTREAM_STAGES = ["已一面", "已二面", "已终面", "已获Offer", "未通过", "已放弃"];
const NEXT_STAGE_MAP = {
  "未投递": "已投递",
  "已投递": "已一面",
  "已一面": "已二面",
  "已二面": "已终面",
  "已终面": "已获Offer"
};

let advanceSelectedIds = new Set();
let advanceTargetStage = "已一面";

// 页面加载启动
document.addEventListener("DOMContentLoaded", () => {
  initEvents();
  loadData();
});

// 加载本地投递记录与配置
async function loadData() {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    try {
      const data = await chrome.storage.local.get([
        "job_applications",
        "autoAddApplicationAfterFill",
        "nextoffer_resumes"
      ]);

      if (Array.isArray(data.job_applications)) {
        applicationsList = data.job_applications;
        // 自动将旧数据中的英文 esunny 修正为易盛信息，网申职位修正为软件研发岗
        let changed = false;
        applicationsList.forEach(item => {
          if (item.company === "esunny") { item.company = "易盛信息"; changed = true; }
          if (item.position === "网申职位") { item.position = "软件研发岗"; changed = true; }
        });
        if (changed) {
          chrome.storage.local.set({ job_applications: applicationsList });
        }
      } else {
        applicationsList = [];
      }

      autoAddEnabled = data.autoAddApplicationAfterFill !== false;
      document.getElementById("toggle-auto-add").checked = autoAddEnabled;

      // 同步简历选项到表单
      if (Array.isArray(data.nextoffer_resumes)) {
        const sel = document.getElementById("form-resume-name");
        if (sel) {
          sel.innerHTML = "";
          data.nextoffer_resumes.forEach((r, idx) => {
            const opt = document.createElement("option");
            opt.value = r.name || `简历${idx + 1}`;
            opt.textContent = r.name || `简历${idx + 1}`;
            sel.appendChild(opt);
          });
        }
      }
    } catch (err) {
      console.warn("读取本地投递记录失败:", err);
    }
  }

  updateStats();
  renderCurrentView();

  // 若 URL 携带 ?application=id，则高亮并滚动到该条目
  const urlParams = new URLSearchParams(window.location.search);
  const targetAppId = urlParams.get("application");
  if (targetAppId) {
    setTimeout(() => {
      const row = document.querySelector(`tr[data-id="${targetAppId}"]`);
      if (row) {
        row.scrollIntoView({ behavior: "smooth", block: "center" });
        row.style.transition = "background-color 0.5s ease";
        row.style.backgroundColor = "#fff7ed";
        setTimeout(() => {
          row.style.backgroundColor = "";
        }, 3000);
      }
    }, 200);
  }
}

// 保存投递记录至本地
async function saveApplications() {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    try {
      await chrome.storage.local.set({
        job_applications: applicationsList,
        autoAddApplicationAfterFill: autoAddEnabled
      });
    } catch (err) {
      showToast("❌ 保存数据失败: " + err.message);
    }
  }
  updateStats();
  renderCurrentView();
}

// 计算并更新顶部 5 大指标与分类标签数量
function updateStats() {
  const todayStr = new Date().toISOString().split("T")[0];
  let todayCount = 0;
  let todayTodoCount = 0;
  let uncompletedTodoCount = 0;
  let offerCount = 0;

  const countsByStatus = {
    "未投递": 0,
    "已投递": 0,
    "已一面": 0,
    "已二面": 0,
    "已终面": 0,
    "已获Offer": 0,
    "未通过": 0,
    "已放弃": 0,
    "has_todo": 0
  };

  applicationsList.forEach(item => {
    if (item.date === todayStr) todayCount++;
    if (item.status === "已获Offer") offerCount++;

    if (item.todo && item.todo.trim()) {
      uncompletedTodoCount++;
      countsByStatus["has_todo"]++;
      if (item.todo.includes(todayStr) || (item.todoDate === todayStr)) {
        todayTodoCount++;
      }
    }

    if (countsByStatus[item.status] !== undefined) {
      countsByStatus[item.status]++;
    }
  });

  // 更新指标卡片
  document.getElementById("stat-total").textContent = applicationsList.length;
  document.getElementById("stat-today").textContent = todayCount;
  document.getElementById("stat-today-todo").textContent = todayTodoCount;
  document.getElementById("stat-pending-todo").textContent = uncompletedTodoCount;
  document.getElementById("stat-offer").textContent = offerCount;

  // 更新筛选标签数量
  document.getElementById("count-all").textContent = applicationsList.length;
  document.getElementById("count-has_todo").textContent = countsByStatus["has_todo"];
  Object.keys(countsByStatus).forEach(st => {
    const el = document.getElementById(`count-${st}`);
    if (el) el.textContent = countsByStatus[st];
  });
}

// 获取筛选过滤后的记录列表
function getFilteredList() {
  return applicationsList.filter(item => {
    // 状态过滤
    if (activeStatusFilter === "has_todo") {
      if (!item.todo || !item.todo.trim()) return false;
    } else if (activeStatusFilter !== "all" && item.status !== activeStatusFilter) {
      return false;
    }

    // 关键词搜索过滤
    if (activeSearchQuery) {
      const q = activeSearchQuery.toLowerCase();
      const matchCompany = (item.company || "").toLowerCase().includes(q);
      const matchPos = (item.position || "").toLowerCase().includes(q);
      const matchNotes = (item.notes || "").toLowerCase().includes(q);
      const matchTodo = (item.todo || "").toLowerCase().includes(q);
      if (!matchCompany && !matchPos && !matchNotes && !matchTodo) return false;
    }

    return true;
  });
}

// 渲染视图（表格/看板/日历）
function renderCurrentView() {
  const filtered = getFilteredList();

  const tableView = document.getElementById("table-view-container");
  const kanbanView = document.getElementById("kanban-view-container");
  const calendarView = document.getElementById("calendar-view-container");
  const emptyCard = document.getElementById("empty-state-card");
  const tableEl = document.getElementById("applications-table");

  if (currentView === "table") {
    tableView.style.display = "block";
    kanbanView.style.display = "none";
    calendarView.style.display = "none";

    if (filtered.length === 0) {
      tableEl.style.display = "none";
      emptyCard.style.display = "flex";
    } else {
      tableEl.style.display = "table";
      emptyCard.style.display = "none";
      renderTableRows(filtered);
    }
  } else if (currentView === "kanban") {
    tableView.style.display = "none";
    kanbanView.style.display = "block";
    calendarView.style.display = "none";
    renderKanban(filtered);
  } else if (currentView === "calendar") {
    tableView.style.display = "none";
    kanbanView.style.display = "none";
    calendarView.style.display = "block";
    renderCalendar(filtered);
  }

  // 更新删除按钮状态
  const delBtn = document.getElementById("btn-delete-selected");
  delBtn.disabled = selectedRecordIds.size === 0;

  // 更新前序推进按钮与空状态文案
  updateAdvanceButtonVisibility(filtered);
}

// 渲染表格数据行
function renderTableRows(records) {
  const tbody = document.getElementById("applications-table-body");
  tbody.innerHTML = "";

  records.forEach(item => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", item.id);

    // Checkbox
    const tdCheck = document.createElement("td");
    tdCheck.style.textAlign = "center";
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = selectedRecordIds.has(item.id);
    chk.addEventListener("change", (e) => {
      if (e.target.checked) selectedRecordIds.add(item.id);
      else selectedRecordIds.delete(item.id);
      document.getElementById("btn-delete-selected").disabled = selectedRecordIds.size === 0;
    });
    tdCheck.appendChild(chk);
    tr.appendChild(tdCheck);

    // 投递日期
    const tdDate = document.createElement("td");
    tdDate.textContent = item.date || "-";
    tdDate.style.color = "var(--text-secondary)";
    tr.appendChild(tdDate);

    // 公司名称
    const tdComp = document.createElement("td");
    tdComp.className = "company-name";
    tdComp.textContent = item.company || "-";
    tr.appendChild(tdComp);

    // 岗位
    const tdPos = document.createElement("td");
    tdPos.className = "job-title";
    tdPos.textContent = item.position || "-";
    tr.appendChild(tdPos);

    // 状态切换下拉
    const tdStatus = document.createElement("td");
    const select = document.createElement("select");
    select.className = "table-status-select";
    const statusStyle = STATUS_COLOR_MAP[item.status] || { color: "#475569", bg: "#f1f5f9" };
    select.style.color = statusStyle.color;
    select.style.background = statusStyle.bg;
    select.style.borderColor = statusStyle.color + "33";

    Object.keys(STATUS_COLOR_MAP).forEach(st => {
      const opt = document.createElement("option");
      opt.value = st;
      opt.textContent = st;
      if (st === item.status) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener("change", (e) => {
      item.status = e.target.value;
      const newStyle = STATUS_COLOR_MAP[item.status] || { color: "#475569", bg: "#f1f5f9" };
      select.style.color = newStyle.color;
      select.style.background = newStyle.bg;
      select.style.borderColor = newStyle.color + "33";
      saveApplications();
      showToast(`已更新为【${item.status}】`);
    });
    tdStatus.appendChild(select);
    tr.appendChild(tdStatus);

    // 待办事项
    const tdTodo = document.createElement("td");
    tdTodo.textContent = item.todo || "-";
    if (item.todo) tdTodo.style.color = "#ea580c";
    tr.appendChild(tdTodo);

    // 备注
    const tdNotes = document.createElement("td");
    tdNotes.textContent = item.notes || "-";
    tdNotes.style.color = "var(--text-dim)";
    tr.appendChild(tdNotes);

    // 投递链接
    const tdUrl = document.createElement("td");
    if (item.url) {
      const a = document.createElement("a");
      a.href = item.url;
      a.target = "_blank";
      a.className = "table-link";
      a.innerHTML = `<span>访问</span> <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
      tdUrl.appendChild(a);
    } else {
      tdUrl.textContent = "-";
    }
    tr.appendChild(tdUrl);

    // 操作 (编辑 / 删除)
    const tdActions = document.createElement("td");
    tdActions.className = "action-btns";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn-icon-action";
    btnEdit.title = "编辑记录";
    btnEdit.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    btnEdit.addEventListener("click", () => openEditModal(item));

    const btnDel = document.createElement("button");
    btnDel.className = "btn-icon-action";
    btnDel.title = "删除记录";
    btnDel.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
    btnDel.addEventListener("click", () => {
      if (confirm(`确定删除【${item.company} - ${item.position}】的投递记录吗？`)) {
        applicationsList = applicationsList.filter(a => a.id !== item.id);
        selectedRecordIds.delete(item.id);
        saveApplications();
        showToast("已删除该条记录");
      }
    });

    // 快捷推进下一阶段
    if (NEXT_STAGE_MAP[item.status]) {
      const nextStage = NEXT_STAGE_MAP[item.status];
      const btnAdv = document.createElement("button");
      btnAdv.className = "btn-icon-action btn-action-advance";
      btnAdv.title = `一键推进至【${nextStage}】`;
      btnAdv.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14m-5-5 5 5-5 5"></path></svg>`;
      btnAdv.addEventListener("click", () => {
        item.status = nextStage;
        item.updatedAt = new Date().toISOString();
        saveApplications();
        showToast(`🚀 已将【${item.company}】推进至【${nextStage}】`);
      });
      tdActions.appendChild(btnAdv);
    }

    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDel);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

// 渲染看板视图
function renderKanban(records) {
  const container = document.getElementById("kanban-columns");
  container.innerHTML = "";

  const kanbanStatuses = ["未投递", "已投递", "已一面", "已二面", "已终面", "已获Offer", "未通过", "已放弃"];

  kanbanStatuses.forEach(st => {
    const col = document.createElement("div");
    col.className = "kanban-col";

    const colRecords = records.filter(r => r.status === st);
    const colorStyle = STATUS_COLOR_MAP[st] || { color: "#333", bg: "#eee" };

    col.innerHTML = `
      <div class="kanban-col-header" style="color: ${colorStyle.color};">
        <span>${st}</span>
        <span style="background: ${colorStyle.bg}; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${colRecords.length}</span>
      </div>
    `;

    colRecords.forEach(item => {
      const card = document.createElement("div");
      card.className = "kanban-card";
      card.innerHTML = `
        <div class="kanban-card-title">${item.company}</div>
        <div class="kanban-card-pos">${item.position}</div>
        ${item.todo ? `<div style="font-size: 11px; color: #ea580c; background: #fff7ed; padding: 3px 6px; border-radius: 4px;">⏰ ${item.todo}</div>` : ""}
        <div class="kanban-card-footer">
          <span>📅 ${item.date || ""}</span>
          <span style="color: var(--accent); cursor: pointer;" class="kanban-card-edit">编辑</span>
        </div>
      `;
      card.querySelector(".kanban-card-edit").onclick = () => openEditModal(item);
      col.appendChild(card);
    });

    container.appendChild(col);
  });
}

// 渲染日历视图
function renderCalendar(records) {
  const grid = document.getElementById("calendar-days-grid");
  grid.innerHTML = "";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const dStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayRecords = records.filter(r => r.date === dStr || (r.todo && r.todo.includes(dStr)));

    const cell = document.createElement("div");
    cell.className = "cal-day-cell";
    cell.innerHTML = `<div class="cal-day-num">${d}日</div>`;

    dayRecords.forEach(r => {
      const ev = document.createElement("div");
      ev.className = "cal-day-event";
      ev.title = `${r.company} - ${r.position} (${r.status})`;
      ev.textContent = `${r.company}: ${r.status}`;
      cell.appendChild(ev);
    });

    grid.appendChild(cell);
  }
}

// 打开添加模态弹窗
function openAddModal() {
  document.getElementById("modal-form-title").textContent = "添加投递记录";
  document.getElementById("form-record-id").value = "";
  document.getElementById("form-company").value = "";
  document.getElementById("form-position").value = "";
  document.getElementById("form-date").value = new Date().toISOString().split("T")[0];
  document.getElementById("form-status").value = "已投递";
  document.getElementById("form-todo").value = "";
  document.getElementById("form-url").value = "";
  document.getElementById("form-notes").value = "";

  document.getElementById("record-modal-backdrop").style.display = "flex";
}

// 打开编辑模态弹窗
function openEditModal(item) {
  document.getElementById("modal-form-title").textContent = "编辑投递记录";
  document.getElementById("form-record-id").value = item.id;
  document.getElementById("form-company").value = item.company || "";
  document.getElementById("form-position").value = item.position || "";
  document.getElementById("form-date").value = item.date || "";
  document.getElementById("form-status").value = item.status || "已投递";
  document.getElementById("form-todo").value = item.todo || "";
  document.getElementById("form-url").value = item.url || "";
  document.getElementById("form-notes").value = item.notes || "";
  if (item.resumeName) {
    document.getElementById("form-resume-name").value = item.resumeName;
  }

  document.getElementById("record-modal-backdrop").style.display = "flex";
}

// 关闭模态弹窗
function closeModal() {
  document.getElementById("record-modal-backdrop").style.display = "none";
}

// 绑定交互事件
function initEvents() {
  // 添加记录按钮
  document.getElementById("btn-add-top").addEventListener("click", openAddModal);
  document.getElementById("btn-add-record").addEventListener("click", openAddModal);
  document.getElementById("btn-empty-add").addEventListener("click", openAddModal);

  // 关闭弹窗
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
  document.getElementById("btn-cancel-modal").addEventListener("click", closeModal);

  // 保存记录表单提交
  document.getElementById("record-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("form-record-id").value;
    const company = document.getElementById("form-company").value.trim();
    const position = document.getElementById("form-position").value.trim();
    const date = document.getElementById("form-date").value;
    const status = document.getElementById("form-status").value;
    const todo = document.getElementById("form-todo").value.trim();
    const url = document.getElementById("form-url").value.trim();
    const resumeName = document.getElementById("form-resume-name").value;
    const notes = document.getElementById("form-notes").value.trim();

    if (id) {
      // 编辑已有记录
      const idx = applicationsList.findIndex(a => a.id === id);
      if (idx !== -1) {
        applicationsList[idx] = {
          ...applicationsList[idx],
          company, position, date, status, todo, url, resumeName, notes,
          updatedAt: new Date().toISOString()
        };
        showToast("已更新投递记录");
      }
    } else {
      // 新建记录
      const newRec = {
        id: "app_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
        company, position, date, status, todo, url, resumeName, notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      applicationsList.unshift(newRec);
      showToast("成功添加投递记录");
    }

    saveApplications();
    closeModal();
  });

  // 全选 Checkbox
  document.getElementById("select-all-checkbox").addEventListener("change", (e) => {
    const checked = e.target.checked;
    const filtered = getFilteredList();
    if (checked) {
      filtered.forEach(item => selectedRecordIds.add(item.id));
    } else {
      selectedRecordIds.clear();
    }
    renderCurrentView();
  });

  // 删除选中
  document.getElementById("btn-delete-selected").addEventListener("click", () => {
    if (selectedRecordIds.size === 0) return;
    if (confirm(`确定删除选中的 ${selectedRecordIds.size} 条记录吗？`)) {
      applicationsList = applicationsList.filter(item => !selectedRecordIds.has(item.id));
      selectedRecordIds.clear();
      saveApplications();
      showToast("已删除选中记录");
    }
  });

  // 自动加入开关
  document.getElementById("toggle-auto-add").addEventListener("change", (e) => {
    autoAddEnabled = e.target.checked;
    saveApplications();
    showToast(autoAddEnabled ? "已开启：填表后自动记录" : "已关闭自动记录");
  });

  // 搜索框输入
  document.getElementById("search-input").addEventListener("input", (e) => {
    activeSearchQuery = e.target.value.trim();
    renderCurrentView();
  });

  // 状态分类芯片点击
  document.querySelectorAll(".aw-legend-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".aw-legend-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeStatusFilter = chip.getAttribute("data-status");
      renderCurrentView();
    });
  });

  // 视图切换
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentView = btn.getAttribute("data-view");
      renderCurrentView();
    });
  });

  // 清除筛选
  document.getElementById("btn-clear-filter").addEventListener("click", () => {
    activeSearchQuery = "";
    document.getElementById("search-input").value = "";
    activeStatusFilter = "all";
    document.querySelectorAll(".aw-legend-chip").forEach(c => c.classList.remove("active"));
    document.querySelector('.aw-legend-chip[data-status="all"]').classList.add("active");
    renderCurrentView();
  });

  // 导出 JSON
  document.getElementById("btn-export-data").addEventListener("click", () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applicationsList, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `幻星求职投递记录_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("已导出全部投递记录 JSON");
  });

  // 导入数据
  document.getElementById("btn-import-data").addEventListener("click", () => {
    document.getElementById("import-file-input").click();
  });
  document.getElementById("btn-empty-import").addEventListener("click", () => {
    document.getElementById("import-file-input").click();
  });
  document.getElementById("import-file-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          applicationsList = [...imported, ...applicationsList];
          saveApplications();
          showToast(`成功导入 ${imported.length} 条记录！`);
        } else {
          alert("文件内容不是合法的记录列表数组");
        }
      } catch (err) {
        alert("导入解析失败: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  // 推进弹窗事件
  document.getElementById("btn-advance-stage")?.addEventListener("click", () => openAdvanceModal(activeStatusFilter));
  document.getElementById("btn-empty-advance")?.addEventListener("click", () => openAdvanceModal(activeStatusFilter));
  document.getElementById("advance-modal-close")?.addEventListener("click", () => {
    document.getElementById("advance-modal").style.display = "none";
  });
  document.getElementById("btn-advance-cancel")?.addEventListener("click", () => {
    document.getElementById("advance-modal").style.display = "none";
  });
  document.getElementById("advance-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "advance-modal") {
      document.getElementById("advance-modal").style.display = "none";
    }
  });
  document.getElementById("advance-search-input")?.addEventListener("input", () => {
    renderAdvanceCandidates();
  });
  document.getElementById("btn-advance-submit")?.addEventListener("click", () => {
    if (advanceSelectedIds.size === 0) {
      alert("请至少勾选一条需要推进的投递记录！");
      return;
    }
    const todoVal = (document.getElementById("advance-todo-input")?.value || "").trim();
    let count = 0;
    applicationsList.forEach(item => {
      if (advanceSelectedIds.has(item.id)) {
        item.status = advanceTargetStage;
        if (todoVal) item.todo = todoVal;
        item.updatedAt = new Date().toISOString();
        count++;
      }
    });
    saveApplications();
    document.getElementById("advance-modal").style.display = "none";
    showToast(`🚀 已成功将 ${count} 条记录推进至【${advanceTargetStage}】！`);
  });
}

// 轻量 Toast 提示
function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 2500);
}

// 更新前序推进按钮与空状态显示
function updateAdvanceButtonVisibility(filteredList) {
  const btnToolbar = document.getElementById("btn-advance-stage");
  const labelToolbar = document.getElementById("btn-advance-label");
  const btnEmpty = document.getElementById("btn-empty-advance");
  const emptyTitle = document.getElementById("empty-state-title");
  const emptyDesc = document.getElementById("empty-state-desc");

  const isDownstream = DOWNSTREAM_STAGES.includes(activeStatusFilter);

  if (btnToolbar) {
    if (isDownstream) {
      btnToolbar.style.display = "inline-flex";
      if (labelToolbar) labelToolbar.textContent = `从前序记录推进至【${activeStatusFilter}】`;
    } else {
      btnToolbar.style.display = "none";
    }
  }

  if (emptyTitle && emptyDesc) {
    if (isDownstream && filteredList && filteredList.length === 0) {
      emptyTitle.textContent = `暂无【${activeStatusFilter}】记录`;
      emptyDesc.textContent = `您可以直接从前序阶段（如已投递）的数据中勾选，直接改变状态推进。`;
      if (btnEmpty) {
        btnEmpty.style.display = "inline-block";
        btnEmpty.textContent = `🚀 选择已有记录推进至【${activeStatusFilter}】`;
      }
    } else {
      emptyTitle.textContent = `开始记录你的求职进展`;
      emptyDesc.textContent = `集中管理投递、面试与待办，让每一次机会都有迹可循。`;
      if (btnEmpty) btnEmpty.style.display = "none";
    }
  }
}

// 打开推进选择弹窗
function openAdvanceModal(targetStage) {
  advanceTargetStage = targetStage || (DOWNSTREAM_STAGES.includes(activeStatusFilter) ? activeStatusFilter : "已一面");
  advanceSelectedIds.clear();

  const titleEl = document.getElementById("advance-modal-title");
  if (titleEl) titleEl.textContent = `🚀 推进流程 ➔ 【${advanceTargetStage}】`;

  const submitEl = document.getElementById("btn-advance-submit");
  if (submitEl) submitEl.textContent = `确认推进至【${advanceTargetStage}】`;

  const searchInput = document.getElementById("advance-search-input");
  if (searchInput) searchInput.value = "";

  const todoInput = document.getElementById("advance-todo-input");
  if (todoInput) todoInput.value = "";

  renderAdvanceCandidates();
  document.getElementById("advance-modal").style.display = "flex";
}

// 渲染推进候选列表
function renderAdvanceCandidates() {
  const container = document.getElementById("advance-candidates-list");
  if (!container) return;
  container.innerHTML = "";

  const query = (document.getElementById("advance-search-input")?.value || "").toLowerCase().trim();

  // 筛选候选记录（处于当前目标阶段前面的记录）
  const candidates = applicationsList.filter(item => {
    if (item.status === advanceTargetStage) return false;

    if (advanceTargetStage === "已一面") {
      if (item.status !== "未投递" && item.status !== "已投递") return false;
    } else if (advanceTargetStage === "已二面") {
      if (!["未投递", "已投递", "已一面"].includes(item.status)) return false;
    } else if (advanceTargetStage === "已终面") {
      if (!["未投递", "已投递", "已一面", "已二面"].includes(item.status)) return false;
    } else if (advanceTargetStage === "已获Offer") {
      if (["未通过", "已放弃"].includes(item.status)) return false;
    }

    if (query) {
      const matchComp = (item.company || "").toLowerCase().includes(query);
      const matchPos = (item.position || "").toLowerCase().includes(query);
      if (!matchComp && !matchPos) return false;
    }

    return true;
  });

  if (candidates.length === 0) {
    container.innerHTML = `
      <div style="padding: 30px 10px; text-align: center; color: var(--text-dim); font-size: 13px;">
        没有找到可推进的前序投递记录（当前所有记录均已在此阶段或后续阶段）
      </div>
    `;
    return;
  }

  candidates.forEach(item => {
    const row = document.createElement("div");
    row.className = `advance-candidate-item${advanceSelectedIds.has(item.id) ? " selected" : ""}`;

    const left = document.createElement("div");
    left.className = "candidate-left";

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.className = "candidate-checkbox";
    chk.checked = advanceSelectedIds.has(item.id);

    const info = document.createElement("div");
    info.className = "candidate-info";

    const title = document.createElement("div");
    title.className = "candidate-title";
    title.textContent = `${item.company || "未命名企业"} · ${item.position || "职位"}`;

    const sub = document.createElement("div");
    sub.className = "candidate-sub";
    sub.textContent = `投递日期: ${item.date || "-"} ${item.todo ? ` | 待办: ${item.todo}` : ""}`;

    info.appendChild(title);
    info.appendChild(sub);
    left.appendChild(chk);
    left.appendChild(info);

    const right = document.createElement("div");
    const statusStyle = STATUS_COLOR_MAP[item.status] || { color: "#4c4b49", bg: "#e6e5e3" };
    right.className = "candidate-status-tag";
    right.style.color = statusStyle.color;
    right.style.background = statusStyle.bg;
    right.textContent = item.status;

    row.appendChild(left);
    row.appendChild(right);

    const toggle = () => {
      if (advanceSelectedIds.has(item.id)) {
        advanceSelectedIds.delete(item.id);
        row.classList.remove("selected");
        chk.checked = false;
      } else {
        advanceSelectedIds.add(item.id);
        row.classList.add("selected");
        chk.checked = true;
      }
    };

    row.addEventListener("click", (e) => {
      if (e.target !== chk) toggle();
    });
    chk.addEventListener("change", toggle);

    container.appendChild(row);
  });
}
