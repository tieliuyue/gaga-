// popup.js - 幻星填表助手 Popup 控制面板
(function () {
  let activeTab = null;
  let activeResumeId = "1";
  let resumesList = [];
  let currentScanResult = null;
  let isFillingInProgress = false;
  let isScanning = false;
  let isDetectionEnabled = true;

  // DOM 元素
  const resumeListEl = document.getElementById("resume-list");
  const btnFillForm = document.getElementById("btn-fill-form");
  const btnFillText = document.getElementById("btn-fill-text");
  const pageStatusBox = document.getElementById("page-status-box");
  const statusIcon = document.getElementById("status-icon");
  const statusMainText = document.getElementById("status-main-text");
  const statusSubText = document.getElementById("status-sub-text");
  const btnToggleScan = document.getElementById("btn-toggle-scan");
  const btnToggleScanText = document.getElementById("btn-toggle-scan-text");
  const btnRefreshScan = document.getElementById("btn-refresh-scan");
  const sectionLogs = document.getElementById("section-logs");
  const logsContainer = document.getElementById("logs-container");
  const logsStepTitle = document.getElementById("logs-step-title");
  const btnAbortFill = document.getElementById("btn-abort-fill");
  const sectionComplete = document.getElementById("section-complete");
  const completeTitle = document.getElementById("complete-title");
  const completeDesc = document.getElementById("complete-desc");
  const btnAddApplication = document.getElementById("btn-add-application");
  const btnAddAppText = document.getElementById("btn-add-app-text");
  const btnGotoApplications = document.getElementById("btn-goto-applications");
  const footerResumeName = document.getElementById("footer-resume-name");

  // 1. 初始化入口
  async function init() {
    bindNavEvents();
    await loadDetectionSetting();
    await loadResumes();
    if (isDetectionEnabled) {
      await detectCurrentTab();
    } else {
      renderDetectionDisabledState();
    }
    setupMessageListener();
  }

  // 绑定头部和导航事件
  function bindNavEvents() {
    document.getElementById("btn-open-applications").addEventListener("click", () => {
      openExtensionTab("applications.html");
    });
    document.getElementById("btn-open-settings").addEventListener("click", () => {
      openExtensionTab("options.html");
    });
    document.getElementById("link-manage-resumes").addEventListener("click", (e) => {
      e.preventDefault();
      openExtensionTab("options.html");
    });
    document.getElementById("link-api-settings").addEventListener("click", (e) => {
      e.preventDefault();
      openExtensionTab("options.html#mod-apiSettings");
    });

    if (btnToggleScan) {
      btnToggleScan.addEventListener("click", handleToggleDetection);
    }

    btnRefreshScan.addEventListener("click", () => {
      if (!isDetectionEnabled) {
        alert("当前表单检测已关闭，请先点击「检测开启」！");
        return;
      }
      if (isScanning) return;
      btnRefreshScan.classList.add("spinning");
      detectCurrentTab(true).finally(() => {
        setTimeout(() => btnRefreshScan.classList.remove("spinning"), 600);
      });
    });

    btnGotoApplications.addEventListener("click", () => {
      openExtensionTab("applications.html");
    });
    btnAddApplication.addEventListener("click", handleAddApplication);
    btnAbortFill.addEventListener("click", handleAbortFill);
    btnFillForm.addEventListener("click", handleStartFill);
  }

  function openExtensionTab(path) {
    const url = chrome.runtime.getURL(path);
    chrome.tabs.query({ url: chrome.runtime.getURL(path.split("#")[0] + "*") }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { active: true, url: url });
        if (tabs[0].windowId && chrome.windows?.update) {
          chrome.windows.update(tabs[0].windowId, { focused: true });
        }
      } else {
        chrome.tabs.create({ url: url });
      }
    });
  }

  // 2. 加载与计算 3 份简历
  async function loadResumes() {
    const data = await chrome.storage.local.get([
      "nextoffer_resumes",
      "nextoffer_selected_resume_id",
      "resumeData"
    ]);

    activeResumeId = String(data.nextoffer_selected_resume_id || "1");

    resumesList = [
      { id: "1", name: "简历一", completionRate: 0, resume: {} },
      { id: "2", name: "简历二", completionRate: 0, resume: {} },
      { id: "3", name: "简历三", completionRate: 0, resume: {} }
    ];

    if (data.nextoffer_resumes && Array.isArray(data.nextoffer_resumes)) {
      for (let i = 0; i < 3; i++) {
        const idStr = String(i + 1);
        const existing = data.nextoffer_resumes.find(r => String(r.id) === idStr);
        if (existing) {
          const rate = existing.completionRate !== undefined ? existing.completionRate : calcCompletionRate(existing.resume || existing.data);
          resumesList[i] = {
            id: idStr,
            name: existing.name || ("简历" + (i === 0 ? "一" : i === 1 ? "二" : "三")),
            completionRate: rate,
            resume: existing.resume || existing.data || {}
          };
        }
      }
    } else if (data.resumeData) {
      resumesList[0].name = "简历一";
      resumesList[0].resume = data.resumeData;
      resumesList[0].completionRate = calcCompletionRate(data.resumeData);
    }

    renderResumes();
  }

  function renderResumes() {
    resumeListEl.innerHTML = "";
    resumesList.forEach((item) => {
      const isSelected = item.id === activeResumeId;
      const card = document.createElement("div");
      card.className = "resume-card" + (isSelected ? " active" : "");
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="resume-card-left">
          <div class="radio-dot">
            <div class="radio-dot-inner"></div>
          </div>
          <div class="resume-meta">
            <div class="resume-name">${escapeHtml(item.name)}</div>
            <div class="resume-rate-wrap">
              <span class="resume-rate">${item.completionRate}% 完整度</span>
              <span>·</span>
              <span class="resume-view-link" data-view-id="${item.id}">查看</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("resume-view-link")) {
          e.stopPropagation();
          chrome.storage.local.set({ nextoffer_selected_resume_id: item.id }).then(() => {
            openExtensionTab("options.html");
          });
          return;
        }
        selectResume(item.id);
      });

      resumeListEl.appendChild(card);
    });

    const activeItem = resumesList.find(r => r.id === activeResumeId) || resumesList[0];
    if (footerResumeName) {
      footerResumeName.textContent = activeItem.name;
    }
  }

  async function selectResume(id) {
    activeResumeId = id;
    renderResumes();
    await chrome.storage.local.set({ nextoffer_selected_resume_id: id });
    const sel = resumesList.find(r => r.id === id);
    if (sel && sel.resume && Object.keys(sel.resume).length > 0) {
      await chrome.storage.local.set({ resumeData: sel.resume });
    }
  }

  // 加载与管理检测开关
  async function loadDetectionSetting() {
    try {
      const data = await chrome.storage.local.get(["form_detection_enabled"]);
      isDetectionEnabled = data.form_detection_enabled !== false;
    } catch (e) {
      isDetectionEnabled = true;
    }
    updateToggleScanButtonUI();
  }

  function updateToggleScanButtonUI() {
    if (!btnToggleScan || !btnToggleScanText) return;
    if (isDetectionEnabled) {
      btnToggleScan.className = "btn-toggle-scan is-enabled";
      btnToggleScan.title = "当前检测开启，点击切换为【检测关闭】";
      btnToggleScanText.textContent = "检测开启";
      pageStatusBox.classList.remove("scan-off");
    } else {
      btnToggleScan.className = "btn-toggle-scan is-disabled";
      btnToggleScan.title = "当前检测关闭，点击切换为【检测开启】";
      btnToggleScanText.textContent = "检测关闭";
      pageStatusBox.classList.add("scan-off");
    }
  }

  function renderDetectionDisabledState() {
    pageStatusBox.className = "page-status-box scan-off";
    statusMainText.textContent = "页面表单检测已关闭";
    statusSubText.textContent = "已停止自动检测，不消耗资源及 Token";
    if (statusIcon) {
      statusIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;
    }
    btnFillForm.disabled = true;
    currentScanResult = null;
  }

  function restoreStatusIcon() {
    if (statusIcon) {
      statusIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
    }
  }

  async function handleToggleDetection() {
    isDetectionEnabled = !isDetectionEnabled;
    await chrome.storage.local.set({ form_detection_enabled: isDetectionEnabled });
    updateToggleScanButtonUI();

    // 通知所有页面 content script 同步开启/关闭检测
    try {
      const tabs = await chrome.tabs.query({});
      for (const tab of tabs) {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: "SET_DETECTION_ENABLED",
            enabled: isDetectionEnabled
          }).catch(() => {});
        }
      }
    } catch (e) {}

    if (isDetectionEnabled) {
      restoreStatusIcon();
      detectCurrentTab(true);
    } else {
      renderDetectionDisabledState();
    }
  }

  // 3. 页面检测与重连
  async function detectCurrentTab(isManualRefresh = false) {
    if (!isDetectionEnabled) {
      renderDetectionDisabledState();
      return;
    }
    isScanning = true;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      activeTab = tab;

      if (!tab || !tab.id || !tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("edge://") || tab.url.startsWith("about:")) {
        showUnsupportedStatus("当前页面不支持填表（请在网申页面使用）");
        btnFillForm.disabled = true;
        return;
      }

      statusMainText.textContent = isManualRefresh ? "正在重新扫描网页表单..." : "正在检测当前网页表单...";
      statusSubText.textContent = tab.title || tab.url;

      // 尝试向页面发送查询消息
      let response = await sendTabMessageWithTimeout(tab.id, { type: "POPUP_GET_STATUS" }, 1500);

      // 如果未收到响应或连接断开（例如扩展刚重载过）
      if (!response || !response.ok) {
        // 尝试通过 scripting 动态注入 content.js
        const injected = await tryInjectContentScript(tab.id);
        if (injected) {
          await new Promise(r => setTimeout(r, 200));
          response = await sendTabMessageWithTimeout(tab.id, { type: "POPUP_GET_STATUS" }, 2000);
        }
      }

      if (!isDetectionEnabled) {
        renderDetectionDisabledState();
        return;
      }

      if (!response || !response.ok) {
        // 如果依然无法建立连接，提供直观的刷新网页按钮
        showReloadWebpagePrompt(tab);
        btnFillForm.disabled = true;
        return;
      }

      currentScanResult = response;
      handlePageStatusResponse(response);
    } catch (err) {
      if (isDetectionEnabled) {
        showReloadWebpagePrompt(activeTab);
      }
    } finally {
      isScanning = false;
    }
  }

  function sendTabMessageWithTimeout(tabId, message, timeoutMs = 1500) {
    return new Promise((resolve) => {
      let resolved = false;
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(null);
        }
      }, timeoutMs);

      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          if (chrome.runtime.lastError || !response) {
            resolve(null);
          } else {
            resolve(response);
          }
        }
      });
    });
  }

  async function tryInjectContentScript(tabId) {
    if (!chrome.scripting || !chrome.scripting.executeScript) return false;
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content-scripts/content.js"]
      });
      return true;
    } catch (e) {
      console.warn("Script injection not permitted on this page:", e);
      return false;
    }
  }

  function showReloadWebpagePrompt(tab) {
    pageStatusBox.className = "page-status-box";
    statusMainText.innerHTML = `扩展已更新，需要与网页建立连接`;
    statusSubText.innerHTML = `
      <button id="btn-do-reload-tab" class="btn-reload-page">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
        <span>刷新当前网页并检测</span>
      </button>
    `;
    const btnReload = document.getElementById("btn-do-reload-tab");
    if (btnReload && tab && tab.id) {
      btnReload.addEventListener("click", () => {
        btnReload.disabled = true;
        btnReload.textContent = "正在刷新网页...";
        chrome.tabs.reload(tab.id, {}, () => {
          setTimeout(() => {
            detectCurrentTab();
          }, 1800);
        });
      });
    }
    btnFillForm.disabled = true;
  }

  function handlePageStatusResponse(res) {
    if (!isDetectionEnabled || res.disabled) {
      renderDetectionDisabledState();
      return;
    }

    const fieldCount = res.fieldCount || 0;
    const isApp = res.isApplicationPage;

    if (fieldCount > 0) {
      pageStatusBox.className = "page-status-box has-form";
      statusMainText.textContent = `已检测到可填写表单 (共 ${fieldCount} 个字段)`;
      statusSubText.textContent = res.title || activeTab?.title || "";
      btnFillForm.disabled = false;
    } else if (isApp) {
      pageStatusBox.className = "page-status-box";
      statusMainText.textContent = "识别为网申页面，正在等待表单字段渲染...";
      statusSubText.textContent = res.title || "";
      btnFillForm.disabled = true;
      // 动态SPA页面（如北森/易盛）可在500ms后自动轻量重测一次
      setTimeout(() => {
        if (isDetectionEnabled && !isFillingInProgress && (!currentScanResult || currentScanResult.fieldCount === 0)) {
          detectCurrentTab(false);
        }
      }, 800);
    } else {
      pageStatusBox.className = "page-status-box";
      statusMainText.textContent = "当前页面未检测到可填写网申表单";
      statusSubText.textContent = res.title || "";
      btnFillForm.disabled = true;
    }

    // 检查是否正在填写中
    if (res.status === "scanning" || res.status === "matching" || res.status === "writing") {
      isFillingInProgress = true;
      showLogsSection(res.status, res.logs || []);
    } else if (res.status === "success") {
      btnFillText.textContent = "重新填写";
      if (res.fillResult && res.fillResult.success > 0) {
        showCompleteSection(res.fillResult.success);
      }
    }
  }

  function showUnsupportedStatus(text) {
    pageStatusBox.className = "page-status-box";
    statusMainText.textContent = text;
    statusSubText.textContent = "";
  }

  // 4. 开始填写表单
  async function handleStartFill() {
    if (!isDetectionEnabled) {
      alert("当前表单检测已关闭，请先点击「检测开启」！");
      return;
    }
    if (!activeTab || !activeTab.id) return;

    if (btnFillText.textContent.includes("重新填写")) {
      const ok = confirm("重新填写确认：\n\n确定要重新填写当前页面的网申表单吗？已有内容可能会被覆盖。");
      if (!ok) return;
    }

    isFillingInProgress = true;
    sectionComplete.style.display = "none";
    logsContainer.innerHTML = "";
    showLogsSection("scanning", [`[${getNowTime()}] 正在扫描页面结构与候选组件...`]);

    btnFillForm.disabled = true;
    btnFillText.textContent = "正在填写中...";

    chrome.tabs.sendMessage(activeTab.id, {
      type: "POPUP_START_FILL",
      resumeId: activeResumeId
    }, (res) => {
      if (chrome.runtime.lastError || !res || !res.ok) {
        appendLog(`[${getNowTime()}] 启动失败: ` + (res?.error || chrome.runtime.lastError?.message || "引擎未响应"));
        logsStepTitle.textContent = "启动失败: " + (res?.error || "引擎未响应");
        const spinner = sectionLogs.querySelector(".spinner-sm");
        if (spinner) spinner.style.display = "none";
        btnFillForm.disabled = false;
        btnFillText.textContent = "重新填写";
        isFillingInProgress = false;
      }
    });
  }

  // 5. 中断填写
  function handleAbortFill() {
    if (!activeTab || !activeTab.id) return;
    chrome.tabs.sendMessage(activeTab.id, { type: "POPUP_ABORT_FILL" }, () => {
      appendLog(`[${getNowTime()}] 已由用户手动中断填写`);
      logsStepTitle.textContent = "填表已中断";
      const spinner = sectionLogs.querySelector(".spinner-sm");
      if (spinner) spinner.style.display = "none";
      btnFillForm.disabled = false;
      btnFillText.textContent = "重新填写";
      isFillingInProgress = false;
    });
  }

  // 6. 实时日志监听
  function setupMessageListener() {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "POPUP_FILL_LOG") {
        if (!isFillingInProgress) {
          showLogsSection("writing", []);
          isFillingInProgress = true;
        }
        appendLog(msg.log);
        if (msg.text) {
          logsStepTitle.textContent = msg.text.slice(0, 30);
        }
      } else if (msg.type === "POPUP_FILL_DONE") {
        isFillingInProgress = false;
        btnFillForm.disabled = false;
        btnFillText.textContent = "重新填写";
        const spinner = sectionLogs.querySelector(".spinner-sm");
        if (spinner) spinner.style.display = "none";
        showCompleteSection(msg.successCount || 0);
      } else if (msg.type === "POPUP_FILL_ERROR") {
        isFillingInProgress = false;
        btnFillForm.disabled = false;
        btnFillText.textContent = "重新填写";
        logsStepTitle.textContent = "填表失败";
        const spinner = sectionLogs.querySelector(".spinner-sm");
        if (spinner) spinner.style.display = "none";
      }
    });
  }

  function showLogsSection(status, logs) {
    sectionLogs.style.display = "block";
    const spinner = sectionLogs.querySelector(".spinner-sm");
    if (spinner) spinner.style.display = "inline-block";
    let title = "正在执行网申填表...";
    if (status === "scanning") title = "正在分析页面结构与字段...";
    else if (status === "matching") title = "大模型正在智能匹配简历信息...";
    else if (status === "writing") title = "正在自动填入表单输入项...";
    logsStepTitle.textContent = title;

    if (logs && logs.length > 0) {
      logsContainer.innerHTML = "";
      logs.forEach(l => appendLog(l));
    }
  }

  function appendLog(text) {
    sectionLogs.style.display = "block";
    const line = document.createElement("div");
    line.className = "log-line";
    line.textContent = text;
    logsContainer.appendChild(line);
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  function showCompleteSection(count) {
    sectionLogs.style.display = "none";
    sectionComplete.style.display = "block";
    completeTitle.textContent = "表单填写已完成！";
    completeDesc.textContent = count > 0 ? `已成功为您自动填写 ${count} 个字段` : "已完成字段扫描与填写流程";
    btnAddApplication.disabled = false;
    btnAddAppText.textContent = "加入投递管理";
  }

  // 7. 加入投递记录
  async function handleAddApplication() {
    if (!activeTab) return;

    let company = "";
    let position = "网申岗位";
    const title = activeTab.title || "";
    const url = activeTab.url || "";

    if (title.includes("-")) {
      const parts = title.split("-");
      company = parts[0].trim();
      if (parts.length > 1) position = parts[1].trim();
    } else if (title.includes("—")) {
      const parts = title.split("—");
      company = parts[0].trim();
      if (parts.length > 1) position = parts[1].trim();
    } else if (title.includes(" ")) {
      company = title.split(" ")[0].trim();
    }

    if (!company || company.length > 25) {
      try {
        const u = new URL(url);
        company = u.hostname.replace(/^www\./, "").split(".")[0];
      } catch (e) {
        company = "企业校招网申";
      }
    }

    const newRecord = {
      id: "app_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
      company: company,
      position: position,
      date: new Date().toISOString().split("T")[0],
      status: "已投递",
      todo: "",
      url: url,
      notes: "通过幻星填表助手一键完成填表并收录",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const data = await chrome.storage.local.get(["job_applications"]);
    const list = Array.isArray(data.job_applications) ? data.job_applications : [];
    list.unshift(newRecord);
    await chrome.storage.local.set({ job_applications: list });

    btnAddAppText.textContent = "✓ 已加入投递管理";
    btnAddApplication.disabled = true;
  }

  // 工具函数
  function getNowTime() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function calcCompletionRate(resume) {
    if (!resume || typeof resume !== "object") return 0;
    const b = resume["基本信息"] || {};
    const bFilled = Object.values(b).filter(v => v !== null && String(v).trim().length > 0).length;

    const ji = Array.isArray(resume["求职意向"]) ? resume["求职意向"] : [];
    let jiFilled = 0;
    ji.forEach(item => {
      if (item["意向岗位"]) jiFilled++;
      if (item["期望城市"]) jiFilled++;
      if (item["期望薪资"]) jiFilled++;
    });

    const edu = Array.isArray(resume["教育背景"]) ? resume["教育背景"] : [];
    let eduFilled = 0;
    edu.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) eduFilled++; });
    });

    const work = Array.isArray(resume["实习/工作经历"]) ? resume["实习/工作经历"] : [];
    let workFilled = 0;
    work.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) workFilled++; });
    });

    const proj = Array.isArray(resume["项目经历"]) ? resume["项目经历"] : [];
    let projFilled = 0;
    proj.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) projFilled++; });
    });

    const camp = Array.isArray(resume["在校任职经历"]) ? resume["在校任职经历"] : [];
    let campFilled = 0;
    camp.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) campFilled++; });
    });

    const aw = Array.isArray(resume["奖项"]) ? resume["奖项"] : [];
    let awFilled = 0;
    aw.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) awFilled++; });
    });

    const pb = Array.isArray(resume["论文"]) ? resume["论文"] : [];
    let pbFilled = 0;
    pb.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) pbFilled++; });
    });

    const cf = Array.isArray(resume["证书"]) ? resume["证书"] : [];
    let cfFilled = 0;
    cf.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) cfFilled++; });
    });

    const lg = Array.isArray(resume["语言能力"]) ? resume["语言能力"] : [];
    let lgFilled = 0;
    lg.forEach(item => {
      Object.values(item).forEach(v => { if (v && String(v).trim()) lgFilled++; });
    });

    const sk = Array.isArray(resume["技能标签"]) ? resume["技能标签"] : [];
    const se = resume["自我评价"] || {};
    const seVal = se["个人评价"] || "";
    const ot = resume["其他"] || {};
    const otFilled = Object.values(ot).filter(v => v !== null && String(v).trim().length > 0).length;

    const totalFilled = bFilled + jiFilled + eduFilled + workFilled + projFilled + campFilled + awFilled + pbFilled + cfFilled + lgFilled + (sk.length > 0 ? 1 : 0) + (seVal ? 1 : 0) + otFilled;
    const totalFields = 11 + Math.max(3, ji.length * 3) + Math.max(16, edu.length * 16) + Math.max(12, work.length * 12) + Math.max(9, proj.length * 9) + Math.max(5, camp.length * 5) + Math.max(5, aw.length * 5) + Math.max(6, pb.length * 6) + Math.max(5, cf.length * 5) + Math.max(4, lg.length * 4) + 1 + 1 + Math.max(12, Object.keys(ot).length);

    return Math.min(100, Math.round((totalFilled / totalFields) * 100));
  }

  // 启动
  document.addEventListener("DOMContentLoaded", init);
})();
