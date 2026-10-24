// 幻星填表助手 - 核心逻辑与全量数据管理 (无隐私泄露安全版)

// 纯净默认空白模版（保护用户隐私，朋友试用时不会暴露任何私人信息）
const DEFAULT_RESUME = {
  "基本信息": {
    "姓名": "",
    "性别": "",
    "出生日期": "",
    "出生年": "",
    "出生月": "",
    "出生日": "",
    "年龄": "",
    "学历": "",
    "手机号": "",
    "邮箱": "",
    "QQ号": "",
    "微信号": "",
    "英文名": "",
    "民族": "",
    "籍贯": "",
    "政治面貌": "",
    "婚姻状况": "",
    "现居城市": "",
    "期望工作城市": "",
    "作品主页/在线简历": "",
    "GitHub": ""
  },
  "求职意向": [
    {
      "意向岗位": "",
      "期望城市": "",
      "期望薪资": ""
    }
  ],
  "教育背景": [
    {
      "学校": "",
      "专业": "",
      "学历": "",
      "学位": "",
      "开始时间": "",
      "结束时间": "",
      "院校层次": "",
      "GPA": "",
      "海外院校": "否",
      "毕业证号": "",
      "学位证号": "",
      "学院名称": "",
      "研究方向": "",
      "学校城市": "",
      "专业课程": "",
      "学生干部": "否"
    }
  ],
  "实习/工作经历": [],
  "项目经历": [],
  "在校任职经历": [],
  "奖项": [],
  "论文": [],
  "证书": [],
  "语言能力": [],
  "技能标签": [],
  "自我评价": {
    "个人评价": ""
  },
  "其他": {
    "生源地": "",
    "户口所在地": "",
    "现居住地址": "",
    "身份证号": "",
    "护照号": "",
    "驾照类型": "",
    "兵役情况": "",
    "健康状况": "",
    "身高": "",
    "兴趣爱好": "",
    "紧急联系人": "",
    "紧急联系人电话": ""
  }
};

const DEFAULT_API_CONFIG = {
  apiKey: "",
  baseUrl: "https://api.deepseek.com",
  model: "deepseek-chat"
};

const PRESET_APIS = {
  deepseek: {
    baseUrl: "https://api.deepseek.com",
    model: "deepseek-chat",
    placeholder: "sk-xxxxxxxx"
  },
  gemini: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
    model: "gemini-2.5-flash",
    placeholder: "AIzaSyxxxxxxxx"
  },
  kimi: {
    baseUrl: "https://api.moonshot.cn/v1",
    model: "moonshot-v1-8k",
    placeholder: "sk-xxxxxxxx"
  },
  qwen: {
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    model: "qwen-plus",
    placeholder: "sk-xxxxxxxx"
  },
  openai: {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    placeholder: "sk-xxxxxxxx"
  },
  ollama: {
    baseUrl: "http://localhost:11434/v1",
    model: "qwen2.5:7b",
    placeholder: "ollama (不需要Key)"
  }
};

// 全局运行时状态
let resumesList = [
  { id: "1", name: "简历一", resume: JSON.parse(JSON.stringify(DEFAULT_RESUME)), updatedAt: new Date().toISOString() },
  { id: "2", name: "简历二", resume: JSON.parse(JSON.stringify(DEFAULT_RESUME)), updatedAt: new Date().toISOString() },
  { id: "3", name: "简历三", resume: JSON.parse(JSON.stringify(DEFAULT_RESUME)), updatedAt: new Date().toISOString() }
];
let activeResumeId = "1";
let currentResume = resumesList[0].resume;
let currentApiConfig = { ...DEFAULT_API_CONFIG };
let currentResumeTitle = "简历一";

// 切换多份简历标签（简历一、简历二、简历三）
function switchResumeTab(newId) {
  newId = String(newId);
  if (newId === activeResumeId) return;

  // 1. 先保存当前正在编辑的表单数据到内存列表
  collectBasicInfo();
  collectSelfEvaluation();
  collectApiSettings();
  const currentIdx = resumesList.findIndex(r => String(r.id) === String(activeResumeId));
  if (currentIdx !== -1) {
    const inputTitle = document.getElementById("resume-title-input")?.value?.trim();
    if (inputTitle) resumesList[currentIdx].name = inputTitle;
    resumesList[currentIdx].resume = JSON.parse(JSON.stringify(currentResume));
    resumesList[currentIdx].updatedAt = new Date().toISOString();
  }

  // 2. 切换至目标简历
  activeResumeId = newId;
  const target = resumesList.find(r => String(r.id) === String(activeResumeId)) || resumesList[0];
  currentResume = JSON.parse(JSON.stringify(target.resume));
  currentResumeTitle = target.name || ("简历" + (newId === "1" ? "一" : newId === "2" ? "二" : "三"));

  // 3. 更新顶部标签高亮与标题
  document.querySelectorAll(".resume-tab-btn").forEach(btn => {
    if (btn.getAttribute("data-tab-id") === activeResumeId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 4. 重新渲染表单视图
  renderAll();
  showToast(`已切换至【${currentResumeTitle}】`);
}

// 通用二次确认弹窗
function showConfirmDialog(title, message, okText = "确定", cancelText = "取消") {
  return new Promise((resolve) => {
    const backdrop = document.getElementById("confirm-modal-backdrop");
    const titleEl = document.getElementById("confirm-modal-title");
    const bodyEl = document.getElementById("confirm-modal-body");
    const okBtn = document.getElementById("confirm-modal-ok");
    const cancelBtn = document.getElementById("confirm-modal-cancel");

    if (!backdrop || !titleEl || !bodyEl || !okBtn || !cancelBtn) {
      resolve(confirm(`${title}\n\n${message}`));
      return;
    }

    titleEl.textContent = title;
    bodyEl.textContent = message;
    okBtn.textContent = okText;
    cancelBtn.textContent = cancelText;

    backdrop.style.display = "flex";

    const cleanup = () => {
      backdrop.style.display = "none";
      okBtn.removeEventListener("click", onOk);
      cancelBtn.removeEventListener("click", onCancel);
    };

    const onOk = () => { cleanup(); resolve(true); };
    const onCancel = () => { cleanup(); resolve(false); };

    okBtn.addEventListener("click", onOk);
    cancelBtn.addEventListener("click", onCancel);
  });
}

// 初始化年份、月份、日期的下拉选项
function populateDateSelects(yearSel, monthSel, daySel) {
  if (yearSel && yearSel.children.length === 0) {
    const optDefault = document.createElement("option");
    optDefault.value = "";
    optDefault.textContent = "年份";
    yearSel.appendChild(optDefault);
    for (let y = 2030; y >= 1970; y--) {
      const opt = document.createElement("option");
      opt.value = String(y);
      opt.textContent = String(y);
      yearSel.appendChild(opt);
    }
  }
  if (monthSel && monthSel.children.length === 0) {
    const optDefault = document.createElement("option");
    optDefault.value = "";
    optDefault.textContent = "月份";
    monthSel.appendChild(optDefault);
    for (let m = 1; m <= 12; m++) {
      const val = m < 10 ? `0${m}` : `${m}`;
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = `${m}`;
      monthSel.appendChild(opt);
    }
  }
  if (daySel && daySel.children.length === 0) {
    const optDefault = document.createElement("option");
    optDefault.value = "";
    optDefault.textContent = "日期";
    daySel.appendChild(optDefault);
    for (let d = 1; d <= 31; d++) {
      const val = d < 10 ? `0${d}` : `${d}`;
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = `${d}`;
      daySel.appendChild(opt);
    }
  }
}

function parseDateTriple(dateStr) {
  if (!dateStr) return { y: "", m: "", d: "" };
  const parts = String(dateStr).split(/[-/.]/);
  return {
    y: parts[0] || "",
    m: parts[1] ? (parts[1].length === 1 ? `0${parts[1]}` : parts[1]) : "",
    d: parts[2] ? (parts[2].length === 1 ? `0${parts[2]}` : parts[2]) : ""
  };
}

function formatDateTriple(y, m, d) {
  if (!y) return "";
  let res = y;
  if (m) res += `-${m.padStart(2, '0')}`;
  if (d) res += `-${d.padStart(2, '0')}`;
  return res;
}

// 渲染基本信息表单
function renderBasicInfo() {
  const b = currentResume["基本信息"] || {};
  document.getElementById("basic-name").value = b["姓名"] || "";
  document.getElementById("basic-gender").value = b["性别"] || "";
  document.getElementById("basic-phone").value = b["手机号"] || "";
  document.getElementById("basic-email").value = b["邮箱"] || "";
  document.getElementById("basic-en-name").value = b["英文名"] || "";
  document.getElementById("basic-nation").value = b["民族"] || "";
  document.getElementById("basic-wechat").value = b["微信号"] || "";
  document.getElementById("basic-origin").value = b["籍贯"] || "";
  document.getElementById("basic-politics").value = b["政治面貌"] || "";
  document.getElementById("basic-marital").value = b["婚姻状况"] || "";
  document.getElementById("basic-qq").value = b["QQ号"] || "";
  document.getElementById("basic-city").value = b["现居城市"] || "";
  document.getElementById("basic-portfolio").value = b["作品主页/在线简历"] || "";

  const yearSel = document.getElementById("basic-birth-year");
  const monthSel = document.getElementById("basic-birth-month");
  const daySel = document.getElementById("basic-birth-day");
  populateDateSelects(yearSel, monthSel, daySel);

  const { y, m, d } = parseDateTriple(b["出生日期"] || `${b["出生年"] || ""}-${b["出生月"] || ""}-${b["出生日"] || ""}`);
  yearSel.value = y;
  monthSel.value = m;
  daySel.value = d;
}

function collectBasicInfo() {
  const yearSel = document.getElementById("basic-birth-year");
  const monthSel = document.getElementById("basic-birth-month");
  const daySel = document.getElementById("basic-birth-day");
  const birthDate = formatDateTriple(yearSel.value, monthSel.value, daySel.value);

  currentResume["基本信息"] = {
    ...currentResume["基本信息"],
    "姓名": document.getElementById("basic-name").value.trim(),
    "性别": document.getElementById("basic-gender").value,
    "出生日期": birthDate,
    "出生年": yearSel.value,
    "出生月": monthSel.value,
    "出生日": daySel.value,
    "手机号": document.getElementById("basic-phone").value.trim(),
    "邮箱": document.getElementById("basic-email").value.trim(),
    "英文名": document.getElementById("basic-en-name").value.trim(),
    "民族": document.getElementById("basic-nation").value.trim(),
    "微信号": document.getElementById("basic-wechat").value.trim(),
    "籍贯": document.getElementById("basic-origin").value.trim(),
    "政治面貌": document.getElementById("basic-politics").value,
    "婚姻状况": document.getElementById("basic-marital").value,
    "QQ号": document.getElementById("basic-qq").value.trim(),
    "现居城市": document.getElementById("basic-city").value.trim(),
    "作品主页/在线简历": document.getElementById("basic-portfolio").value.trim()
  };
}

// 动态卡片容器组件
function createSubCard(titleBadge, onDelete) {
  const card = document.createElement("div");
  card.className = "sub-card";

  const header = document.createElement("div");
  header.className = "sub-card-header";

  const badge = document.createElement("span");
  badge.className = "sub-card-badge";
  badge.textContent = titleBadge;

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "sub-card-delete-btn";
  delBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
    删除
  `;
  delBtn.onclick = onDelete;

  header.appendChild(badge);
  header.appendChild(delBtn);
  card.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "form-grid-2";
  card.appendChild(grid);

  return { card, grid };
}

// 1. 求职意向
function renderJobIntentions() {
  const container = document.getElementById("container-jobIntentions");
  container.innerHTML = "";
  const list = currentResume["求职意向"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`求职意向 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderJobIntentions();
      updateCompletionStats();
    });

    grid.innerHTML = `
      <div class="form-item">
        <label class="form-label">意向岗位</label>
        <input type="text" class="input-field f-job" value="${item["意向岗位"] || ""}" placeholder="如：软件工程师 / 产品经理">
      </div>
      <div class="form-item">
        <label class="form-label">期望城市</label>
        <input type="text" class="input-field f-city" value="${item["期望城市"] || ""}" placeholder="如：北京 / 上海 / 深圳" maxlength="20">
      </div>
      <div class="form-item col-full">
        <label class="form-label">期望薪资</label>
        <input type="text" class="input-field f-salary" value="${item["期望薪资"] || ""}" placeholder="如：10k-15k / 面议" maxlength="30">
      </div>
    `;

    grid.querySelectorAll("input").forEach(inp => {
      inp.addEventListener("input", () => {
        item["意向岗位"] = grid.querySelector(".f-job").value.trim();
        item["期望城市"] = grid.querySelector(".f-city").value.trim();
        item["期望薪资"] = grid.querySelector(".f-salary").value.trim();
        updateCompletionStats();
      });
    });

    container.appendChild(card);
  });
}

// 2. 教育背景
function renderEducations() {
  const container = document.getElementById("container-educations");
  container.innerHTML = "";
  const list = currentResume["教育背景"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`教育背景 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderEducations();
      updateCompletionStats();
    });

    const sD = parseDateTriple(item["开始时间"]);
    const eD = parseDateTriple(item["结束时间"]);

    grid.innerHTML = `
      <div class="form-item col-full">
        <label class="form-label">学校</label>
        <input type="text" class="input-field f-school" value="${item["学校"] || ""}" placeholder="请输入学校名称">
      </div>
      <div class="form-item">
        <label class="form-label">专业</label>
        <input type="text" class="input-field f-major" value="${item["专业"] || ""}" placeholder="请输入专业">
      </div>
      <div class="form-item">
        <label class="form-label">学历</label>
        <select class="select-field f-degree-level">
          <option value="">请选择</option>
          <option value="高中">高中</option>
          <option value="中专">中专</option>
          <option value="大专">大专</option>
          <option value="本科">本科</option>
          <option value="硕士研究生">硕士研究生</option>
          <option value="博士研究生">博士研究生</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">学位</label>
        <select class="select-field f-degree">
          <option value="">请选择</option>
          <option value="无">无</option>
          <option value="学士">学士</option>
          <option value="硕士">硕士</option>
          <option value="博士">博士</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">院校层次</label>
        <select class="select-field f-tier">
          <option value="">请选择</option>
          <option value="985/211/双一流">985/211/双一流</option>
          <option value="省属重点本科">省属重点本科</option>
          <option value="普通本科">普通本科</option>
          <option value="专科">专科</option>
        </select>
      </div>

      <div class="form-item">
        <label class="form-label">开始时间</label>
        <div class="date-triple-row">
          <select class="select-field f-s-y"></select><span class="date-sep">年</span>
          <select class="select-field f-s-m"></select><span class="date-sep">月</span>
          <select class="select-field f-s-d"></select><span class="date-sep">日</span>
        </div>
      </div>

      <div class="form-item">
        <label class="form-label">结束时间</label>
        <div class="date-triple-row">
          <select class="select-field f-e-y"></select><span class="date-sep">年</span>
          <select class="select-field f-e-m"></select><span class="date-sep">月</span>
          <select class="select-field f-e-d"></select><span class="date-sep">日</span>
        </div>
      </div>

      <div class="form-item">
        <label class="form-label">GPA</label>
        <input type="text" class="input-field f-gpa" value="${item["GPA"] || ""}" placeholder="如：3.8/4.0">
      </div>
      <div class="form-item">
        <label class="form-label">海外院校</label>
        <select class="select-field f-overseas">
          <option value="否">否</option>
          <option value="是">是</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">学院名称</label>
        <input type="text" class="input-field f-college" value="${item["学院名称"] || ""}" placeholder="请输入学院名称">
      </div>
      <div class="form-item">
        <label class="form-label">研究方向</label>
        <input type="text" class="input-field f-research" value="${item["研究方向"] || ""}" placeholder="如：计算机应用 / 软件工程">
      </div>
      <div class="form-item">
        <label class="form-label">学校城市</label>
        <input type="text" class="input-field f-city" value="${item["学校城市"] || ""}" placeholder="如：北京 / 武汉 / 南京">
      </div>
      <div class="form-item">
        <label class="form-label">学生干部</label>
        <select class="select-field f-leader">
          <option value="否">否</option>
          <option value="是">是</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">毕业证号</label>
        <input type="text" class="input-field f-cert-no" value="${item["毕业证号"] || ""}" placeholder="如有请输入">
      </div>
      <div class="form-item">
        <label class="form-label">学位证号</label>
        <input type="text" class="input-field f-deg-no" value="${item["学位证号"] || ""}" placeholder="如有请输入">
      </div>
      <div class="form-item col-full">
        <label class="form-label">专业课程</label>
        <textarea class="textarea-field f-courses" rows="2" placeholder="请输入核心专业课程">${item["专业课程"] || ""}</textarea>
      </div>
    `;

    grid.querySelector(".f-degree-level").value = item["学历"] || "";
    grid.querySelector(".f-degree").value = item["学位"] || "";
    grid.querySelector(".f-tier").value = item["院校层次"] || "";
    grid.querySelector(".f-overseas").value = item["海外院校"] || "否";
    grid.querySelector(".f-leader").value = item["学生干部"] || "否";

    const sy = grid.querySelector(".f-s-y");
    const sm = grid.querySelector(".f-s-m");
    const sd = grid.querySelector(".f-s-d");
    populateDateSelects(sy, sm, sd);
    sy.value = sD.y; sm.value = sD.m; sd.value = sD.d;

    const ey = grid.querySelector(".f-e-y");
    const em = grid.querySelector(".f-e-m");
    const ed = grid.querySelector(".f-e-d");
    populateDateSelects(ey, em, ed);
    ey.value = eD.y; em.value = eD.m; ed.value = eD.d;

    const syncEdu = () => {
      item["学校"] = grid.querySelector(".f-school").value.trim();
      item["专业"] = grid.querySelector(".f-major").value.trim();
      item["学历"] = grid.querySelector(".f-degree-level").value;
      item["学位"] = grid.querySelector(".f-degree").value;
      item["院校层次"] = grid.querySelector(".f-tier").value;
      item["GPA"] = grid.querySelector(".f-gpa").value.trim();
      item["海外院校"] = grid.querySelector(".f-overseas").value;
      item["学院名称"] = grid.querySelector(".f-college").value.trim();
      item["研究方向"] = grid.querySelector(".f-research").value.trim();
      item["学校城市"] = grid.querySelector(".f-city").value.trim();
      item["学生干部"] = grid.querySelector(".f-leader").value;
      item["毕业证号"] = grid.querySelector(".f-cert-no").value.trim();
      item["学位证号"] = grid.querySelector(".f-deg-no").value.trim();
      item["专业课程"] = grid.querySelector(".f-courses").value.trim();
      item["开始时间"] = formatDateTriple(sy.value, sm.value, sd.value);
      item["结束时间"] = formatDateTriple(ey.value, em.value, ed.value);
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("change", syncEdu);
      el.addEventListener("input", syncEdu);
    });

    container.appendChild(card);
  });
}

// 3. 实习/工作经历
function renderWorkExperiences() {
  const container = document.getElementById("container-workExperiences");
  container.innerHTML = "";
  const list = currentResume["实习/工作经历"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`实习/工作经历 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderWorkExperiences();
      updateCompletionStats();
    });

    const sD = parseDateTriple(item["开始时间"]);
    const eD = parseDateTriple(item["结束时间"]);

    grid.innerHTML = `
      <div class="form-item">
        <label class="form-label">公司名称</label>
        <input type="text" class="input-field f-comp" value="${item["公司名称"] || ""}" placeholder="请输入公司名称">
      </div>
      <div class="form-item">
        <label class="form-label">职位</label>
        <input type="text" class="input-field f-role" value="${item["职位"] || ""}" placeholder="如：研发实习生 / 运营专员">
      </div>
      <div class="form-item">
        <label class="form-label">开始时间</label>
        <div class="date-triple-row">
          <select class="select-field f-s-y"></select><span class="date-sep">年</span>
          <select class="select-field f-s-m"></select><span class="date-sep">月</span>
          <select class="select-field f-s-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">结束时间</label>
        <div class="date-triple-row">
          <select class="select-field f-e-y"></select><span class="date-sep">年</span>
          <select class="select-field f-e-m"></select><span class="date-sep">月</span>
          <select class="select-field f-e-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">工作性质</label>
        <select class="select-field f-type">
          <option value="">请选择</option>
          <option value="实习">实习</option>
          <option value="全职">全职</option>
          <option value="兼职">兼职</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">所属行业</label>
        <input type="text" class="input-field f-industry" value="${item["所属行业"] || ""}" placeholder="如：互联网 / 金融科技">
      </div>
      <div class="form-item">
        <label class="form-label">工作地点</label>
        <input type="text" class="input-field f-loc" value="${item["工作地点"] || ""}" placeholder="如：北京 / 深圳">
      </div>
      <div class="form-item">
        <label class="form-label">薪资</label>
        <input type="text" class="input-field f-salary" value="${item["薪资"] || ""}" placeholder="如：8k/月">
      </div>
      <div class="form-item col-full">
        <label class="form-label">工作描述</label>
        <textarea class="textarea-field f-desc" rows="4" placeholder="详细工作职责与日常任务">${item["工作描述"] || ""}</textarea>
      </div>
      <div class="form-item col-full">
        <label class="form-label">工作成果</label>
        <textarea class="textarea-field f-achieve" rows="2" placeholder="关键业绩指标、成果产出">${item["工作成果"] || ""}</textarea>
      </div>
      <div class="form-item">
        <label class="form-label">所属部门</label>
        <input type="text" class="input-field f-dept" value="${item["所属部门"] || ""}" placeholder="如：技术部 / 业务部">
      </div>
      <div class="form-item">
        <label class="form-label">个人收获</label>
        <input type="text" class="input-field f-gain" value="${item["个人收获"] || ""}" placeholder="技能提升与收获">
      </div>
    `;

    grid.querySelector(".f-type").value = item["工作性质"] || "";

    const sy = grid.querySelector(".f-s-y");
    const sm = grid.querySelector(".f-s-m");
    const sd = grid.querySelector(".f-s-d");
    populateDateSelects(sy, sm, sd);
    sy.value = sD.y; sm.value = sD.m; sd.value = sD.d;

    const ey = grid.querySelector(".f-e-y");
    const em = grid.querySelector(".f-e-m");
    const ed = grid.querySelector(".f-e-d");
    populateDateSelects(ey, em, ed);
    ey.value = eD.y; em.value = eD.m; ed.value = eD.d;

    const syncWork = () => {
      item["公司名称"] = grid.querySelector(".f-comp").value.trim();
      item["职位"] = grid.querySelector(".f-role").value.trim();
      item["工作性质"] = grid.querySelector(".f-type").value;
      item["所属行业"] = grid.querySelector(".f-industry").value.trim();
      item["工作地点"] = grid.querySelector(".f-loc").value.trim();
      item["薪资"] = grid.querySelector(".f-salary").value.trim();
      item["工作描述"] = grid.querySelector(".f-desc").value.trim();
      item["工作成果"] = grid.querySelector(".f-achieve").value.trim();
      item["所属部门"] = grid.querySelector(".f-dept").value.trim();
      item["个人收获"] = grid.querySelector(".f-gain").value.trim();
      item["开始时间"] = formatDateTriple(sy.value, sm.value, sd.value);
      item["结束时间"] = formatDateTriple(ey.value, em.value, ed.value);
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("change", syncWork);
      el.addEventListener("input", syncWork);
    });

    container.appendChild(card);
  });
}

// 4. 项目经历
function renderProjectExperiences() {
  const container = document.getElementById("container-projectExperiences");
  container.innerHTML = "";
  const list = currentResume["项目经历"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`项目经历 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderProjectExperiences();
      updateCompletionStats();
    });

    const sD = parseDateTriple(item["项目开始时间"]);
    const eD = parseDateTriple(item["项目结束时间"]);

    grid.innerHTML = `
      <div class="form-item col-full">
        <label class="form-label">项目名称</label>
        <input type="text" class="input-field f-pname" value="${item["项目名称"] || ""}" placeholder="请输入项目名称">
      </div>
      <div class="form-item">
        <label class="form-label">担任角色</label>
        <input type="text" class="input-field f-prole" value="${item["担任角色"] || ""}" placeholder="如：核心开发者 / 项目组长">
      </div>
      <div class="form-item">
        <label class="form-label">项目链接</label>
        <input type="text" class="input-field f-plink" value="${item["项目链接"] || ""}" placeholder="如：GitHub / 在线演示网址">
      </div>
      <div class="form-item">
        <label class="form-label">项目开始时间</label>
        <div class="date-triple-row">
          <select class="select-field f-s-y"></select><span class="date-sep">年</span>
          <select class="select-field f-s-m"></select><span class="date-sep">月</span>
          <select class="select-field f-s-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">项目结束时间</label>
        <div class="date-triple-row">
          <select class="select-field f-e-y"></select><span class="date-sep">年</span>
          <select class="select-field f-e-m"></select><span class="date-sep">月</span>
          <select class="select-field f-e-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item col-full">
        <label class="form-label">核心技术</label>
        <input type="text" class="input-field f-ptech" value="${item["核心技术"] || ""}" placeholder="如：Python, Vue, MySQL, Git">
      </div>
      <div class="form-item col-full">
        <label class="form-label">项目描述</label>
        <textarea class="textarea-field f-pdesc" rows="3" placeholder="项目背景与业务架构">${item["项目描述"] || ""}</textarea>
      </div>
      <div class="form-item col-full">
        <label class="form-label">我的职责</label>
        <textarea class="textarea-field f-pduty" rows="4" placeholder="个人攻关内容与职责分工">${item["我的职责"] || ""}</textarea>
      </div>
      <div class="form-item col-full">
        <label class="form-label">项目成果</label>
        <textarea class="textarea-field f-pres" rows="2" placeholder="项目上线效果与业务效益">${item["项目成果"] || ""}</textarea>
      </div>
      <div class="form-item col-full">
        <label class="form-label">个人收获</label>
        <input type="text" class="input-field f-pgain" value="${item["个人收获"] || ""}" placeholder="技术总结与能力提升">
      </div>
    `;

    const sy = grid.querySelector(".f-s-y");
    const sm = grid.querySelector(".f-s-m");
    const sd = grid.querySelector(".f-s-d");
    populateDateSelects(sy, sm, sd);
    sy.value = sD.y; sm.value = sD.m; sd.value = sD.d;

    const ey = grid.querySelector(".f-e-y");
    const em = grid.querySelector(".f-e-m");
    const ed = grid.querySelector(".f-e-d");
    populateDateSelects(ey, em, ed);
    ey.value = eD.y; em.value = eD.m; ed.value = eD.d;

    const syncProj = () => {
      item["项目名称"] = grid.querySelector(".f-pname").value.trim();
      item["担任角色"] = grid.querySelector(".f-prole").value.trim();
      item["项目链接"] = grid.querySelector(".f-plink").value.trim();
      item["核心技术"] = grid.querySelector(".f-ptech").value.trim();
      item["项目描述"] = grid.querySelector(".f-pdesc").value.trim();
      item["我的职责"] = grid.querySelector(".f-pduty").value.trim();
      item["项目成果"] = grid.querySelector(".f-pres").value.trim();
      item["个人收获"] = grid.querySelector(".f-pgain").value.trim();
      item["项目开始时间"] = formatDateTriple(sy.value, sm.value, sd.value);
      item["项目结束时间"] = formatDateTriple(ey.value, em.value, ed.value);
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("change", syncProj);
      el.addEventListener("input", syncProj);
    });

    container.appendChild(card);
  });
}

// 5. 在校任职经历
function renderCampusRoles() {
  const container = document.getElementById("container-campusRoles");
  container.innerHTML = "";
  const list = currentResume["在校任职经历"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`在校任职经历 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderCampusRoles();
      updateCompletionStats();
    });

    const sD = parseDateTriple(item["开始时间"]);
    const eD = parseDateTriple(item["结束时间"]);

    grid.innerHTML = `
      <div class="form-item">
        <label class="form-label">组织名称</label>
        <input type="text" class="input-field f-org" value="${item["组织名称"] || ""}" placeholder="如：学生会 / 社团联合会">
      </div>
      <div class="form-item">
        <label class="form-label">担任职务</label>
        <input type="text" class="input-field f-post" value="${item["担任职务"] || ""}" placeholder="如：部长 / 骨干干事">
      </div>
      <div class="form-item">
        <label class="form-label">开始时间</label>
        <div class="date-triple-row">
          <select class="select-field f-s-y"></select><span class="date-sep">年</span>
          <select class="select-field f-s-m"></select><span class="date-sep">月</span>
          <select class="select-field f-s-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">结束时间</label>
        <div class="date-triple-row">
          <select class="select-field f-e-y"></select><span class="date-sep">年</span>
          <select class="select-field f-e-m"></select><span class="date-sep">月</span>
          <select class="select-field f-e-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item col-full">
        <label class="form-label">工作描述</label>
        <textarea class="textarea-field f-desc" rows="3" placeholder="活动统筹、部门职责等">${item["工作描述"] || ""}</textarea>
      </div>
    `;

    const sy = grid.querySelector(".f-s-y");
    const sm = grid.querySelector(".f-s-m");
    const sd = grid.querySelector(".f-s-d");
    populateDateSelects(sy, sm, sd);
    sy.value = sD.y; sm.value = sD.m; sd.value = sD.d;

    const ey = grid.querySelector(".f-e-y");
    const em = grid.querySelector(".f-e-m");
    const ed = grid.querySelector(".f-e-d");
    populateDateSelects(ey, em, ed);
    ey.value = eD.y; em.value = eD.m; ed.value = eD.d;

    const syncCampus = () => {
      item["组织名称"] = grid.querySelector(".f-org").value.trim();
      item["担任职务"] = grid.querySelector(".f-post").value.trim();
      item["工作描述"] = grid.querySelector(".f-desc").value.trim();
      item["开始时间"] = formatDateTriple(sy.value, sm.value, sd.value);
      item["结束时间"] = formatDateTriple(ey.value, em.value, ed.value);
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("change", syncCampus);
      el.addEventListener("input", syncCampus);
    });

    container.appendChild(card);
  });
}

// 6. 奖项
function renderAwards() {
  const container = document.getElementById("container-awards");
  container.innerHTML = "";
  const list = currentResume["奖项"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`奖项 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderAwards();
      updateCompletionStats();
    });

    const sD = parseDateTriple(item["获奖时间"]);

    grid.innerHTML = `
      <div class="form-item col-full">
        <label class="form-label">奖项名称</label>
        <input type="text" class="input-field f-aname" value="${item["奖项名称"] || ""}" placeholder="请输入奖项名称">
      </div>
      <div class="form-item">
        <label class="form-label">颁奖机构</label>
        <input type="text" class="input-field f-aorg" value="${item["颁奖机构"] || ""}" placeholder="如：教育部 / 主办单位">
      </div>
      <div class="form-item">
        <label class="form-label">奖项级别</label>
        <select class="select-field f-alevel">
          <option value="">请选择</option>
          <option value="国家级">国家级</option>
          <option value="省部级">省部级</option>
          <option value="市厅级">市厅级</option>
          <option value="校级">校级</option>
          <option value="院级">院级</option>
          <option value="其他">其他</option>
        </select>
      </div>
      <div class="form-item col-full">
        <label class="form-label">获奖时间</label>
        <div class="date-triple-row">
          <select class="select-field f-s-y"></select><span class="date-sep">年</span>
          <select class="select-field f-s-m"></select><span class="date-sep">月</span>
          <select class="select-field f-s-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item col-full">
        <label class="form-label">奖项描述</label>
        <textarea class="textarea-field f-adesc" rows="2" placeholder="竞赛名次与相关说明">${item["奖项描述"] || ""}</textarea>
      </div>
    `;

    grid.querySelector(".f-alevel").value = item["奖项级别"] || "";

    const sy = grid.querySelector(".f-s-y");
    const sm = grid.querySelector(".f-s-m");
    const sd = grid.querySelector(".f-s-d");
    populateDateSelects(sy, sm, sd);
    sy.value = sD.y; sm.value = sD.m; sd.value = sD.d;

    const syncAward = () => {
      item["奖项名称"] = grid.querySelector(".f-aname").value.trim();
      item["颁奖机构"] = grid.querySelector(".f-aorg").value.trim();
      item["奖项级别"] = grid.querySelector(".f-alevel").value;
      item["奖项描述"] = grid.querySelector(".f-adesc").value.trim();
      item["获奖时间"] = formatDateTriple(sy.value, sm.value, sd.value);
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("change", syncAward);
      el.addEventListener("input", syncAward);
    });

    container.appendChild(card);
  });
}

// 7. 论文
function renderPublications() {
  const container = document.getElementById("container-publications");
  container.innerHTML = "";
  const list = currentResume["论文"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`论文 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderPublications();
      updateCompletionStats();
    });

    const sD = parseDateTriple(item["发表时间"]);

    grid.innerHTML = `
      <div class="form-item col-full">
        <label class="form-label">论文题目</label>
        <input type="text" class="input-field f-title" value="${item["论文题目"] || ""}" placeholder="请输入论文题目">
      </div>
      <div class="form-item">
        <label class="form-label">作者排序</label>
        <select class="select-field f-author">
          <option value="">请选择</option>
          <option value="第一作者">第一作者</option>
          <option value="第二作者">第二作者</option>
          <option value="通讯作者">通讯作者</option>
          <option value="其他">其他</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">论文类型</label>
        <select class="select-field f-ptype">
          <option value="">请选择</option>
          <option value="学术期刊">学术期刊</option>
          <option value="国际会议">国际会议</option>
          <option value="学位论文">学位论文</option>
          <option value="其他">其他</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">发表载体</label>
        <input type="text" class="input-field f-pub" value="${item["发表载体"] || ""}" placeholder="如：期刊或学术会议名称">
      </div>
      <div class="form-item">
        <label class="form-label">发表时间</label>
        <div class="date-triple-row">
          <select class="select-field f-s-y"></select><span class="date-sep">年</span>
          <select class="select-field f-s-m"></select><span class="date-sep">月</span>
          <select class="select-field f-s-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item col-full">
        <label class="form-label">主要内容</label>
        <textarea class="textarea-field f-content" rows="3" placeholder="论文摘要与创新点">${item["主要内容"] || ""}</textarea>
      </div>
    `;

    grid.querySelector(".f-author").value = item["作者排序"] || "";
    grid.querySelector(".f-ptype").value = item["论文类型"] || "";

    const sy = grid.querySelector(".f-s-y");
    const sm = grid.querySelector(".f-s-m");
    const sd = grid.querySelector(".f-s-d");
    populateDateSelects(sy, sm, sd);
    sy.value = sD.y; sm.value = sD.m; sd.value = sD.d;

    const syncPub = () => {
      item["论文题目"] = grid.querySelector(".f-title").value.trim();
      item["作者排序"] = grid.querySelector(".f-author").value;
      item["论文类型"] = grid.querySelector(".f-ptype").value;
      item["发表载体"] = grid.querySelector(".f-pub").value.trim();
      item["主要内容"] = grid.querySelector(".f-content").value.trim();
      item["发表时间"] = formatDateTriple(sy.value, sm.value, sd.value);
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("change", syncPub);
      el.addEventListener("input", syncPub);
    });

    container.appendChild(card);
  });
}

// 8. 证书
function renderCertificates() {
  const container = document.getElementById("container-certificates");
  container.innerHTML = "";
  const list = currentResume["证书"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`证书 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderCertificates();
      updateCompletionStats();
    });

    const sD = parseDateTriple(item["获得日期"]);

    grid.innerHTML = `
      <div class="form-item col-full">
        <label class="form-label">证书名称</label>
        <input type="text" class="input-field f-cname" value="${item["证书名称"] || ""}" placeholder="如：英语四级 (CET-4) / 软考设计师">
      </div>
      <div class="form-item">
        <label class="form-label">证书编号</label>
        <input type="text" class="input-field f-cno" value="${item["证书编号"] || ""}" placeholder="如有请输入证书编号">
      </div>
      <div class="form-item">
        <label class="form-label">颁发机构</label>
        <input type="text" class="input-field f-corg" value="${item["颁发机构"] || ""}" placeholder="如：教育部考试中心 / 人社部">
      </div>
      <div class="form-item col-full">
        <label class="form-label">获得日期</label>
        <div class="date-triple-row">
          <select class="select-field f-s-y"></select><span class="date-sep">年</span>
          <select class="select-field f-s-m"></select><span class="date-sep">月</span>
          <select class="select-field f-s-d"></select><span class="date-sep">日</span>
        </div>
      </div>
      <div class="form-item col-full">
        <label class="form-label">证书描述</label>
        <textarea class="textarea-field f-cdesc" rows="2" placeholder="证书专业能力说明">${item["证书描述"] || ""}</textarea>
      </div>
    `;

    const sy = grid.querySelector(".f-s-y");
    const sm = grid.querySelector(".f-s-m");
    const sd = grid.querySelector(".f-s-d");
    populateDateSelects(sy, sm, sd);
    sy.value = sD.y; sm.value = sD.m; sd.value = sD.d;

    const syncCert = () => {
      item["证书名称"] = grid.querySelector(".f-cname").value.trim();
      item["证书编号"] = grid.querySelector(".f-cno").value.trim();
      item["颁发机构"] = grid.querySelector(".f-corg").value.trim();
      item["证书描述"] = grid.querySelector(".f-cdesc").value.trim();
      item["获得日期"] = formatDateTriple(sy.value, sm.value, sd.value);
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("change", syncCert);
      el.addEventListener("input", syncCert);
    });

    container.appendChild(card);
  });
}

// 9. 语言能力
function renderLanguages() {
  const container = document.getElementById("container-languages");
  container.innerHTML = "";
  const list = currentResume["语言能力"] || [];

  list.forEach((item, index) => {
    const { card, grid } = createSubCard(`语言能力 · ${index + 1}`, () => {
      list.splice(index, 1);
      renderLanguages();
      updateCompletionStats();
    });

    grid.innerHTML = `
      <div class="form-item">
        <label class="form-label">语言类型</label>
        <input type="text" class="input-field f-lang" value="${item["语言类型"] || ""}" placeholder="如：英语 / 日语">
      </div>
      <div class="form-item">
        <label class="form-label">证书名称</label>
        <input type="text" class="input-field f-cert" value="${item["证书名称"] || ""}" placeholder="如：CET-4 / CET-6 / 雅思">
      </div>
      <div class="form-item">
        <label class="form-label">分数</label>
        <input type="text" class="input-field f-score" value="${item["分数"] || ""}" placeholder="如：520">
      </div>
      <div class="form-item">
        <label class="form-label">掌握程度</label>
        <select class="select-field f-level">
          <option value="">请选择</option>
          <option value="母语">母语</option>
          <option value="精通">精通</option>
          <option value="熟练">熟练</option>
          <option value="良好">良好</option>
          <option value="一般">一般</option>
        </select>
      </div>
    `;

    grid.querySelector(".f-level").value = item["掌握程度"] || "";

    const syncLang = () => {
      item["语言类型"] = grid.querySelector(".f-lang").value.trim();
      item["证书名称"] = grid.querySelector(".f-cert").value.trim();
      item["分数"] = grid.querySelector(".f-score").value.trim();
      item["掌握程度"] = grid.querySelector(".f-level").value;
      updateCompletionStats();
    };

    grid.querySelectorAll("input, select").forEach(el => {
      el.addEventListener("change", syncLang);
      el.addEventListener("input", syncLang);
    });

    container.appendChild(card);
  });
}

// 10. 技能标签
function renderSkills() {
  const container = document.getElementById("container-skills");
  container.innerHTML = "";
  const list = currentResume["技能标签"] || [];

  list.forEach((tag, idx) => {
    const pill = document.createElement("span");
    pill.className = "skill-tag-pill";
    pill.innerHTML = `
      <span>${tag}</span>
      <span class="skill-tag-remove" title="删除">×</span>
    `;
    pill.querySelector(".skill-tag-remove").onclick = () => {
      list.splice(idx, 1);
      renderSkills();
      updateCompletionStats();
    };
    container.appendChild(pill);
  });
}

function addSkillTag(text) {
  if (!text) return;
  const list = currentResume["技能标签"] || (currentResume["技能标签"] = []);
  const parts = text.split(/[,，、\s]+/).filter(Boolean);
  parts.forEach(p => {
    if (!list.includes(p)) list.push(p);
  });
  renderSkills();
  updateCompletionStats();
}

// 11. 自我评价
function renderSelfEvaluation() {
  const se = currentResume["自我评价"] || {};
  document.getElementById("self-eval-text").value = se["个人评价"] || "";
}

function collectSelfEvaluation() {
  currentResume["自我评价"] = {
    "个人评价": document.getElementById("self-eval-text").value.trim()
  };
}

// 12. 其他扩展字段
function renderCustomFields() {
  const container = document.getElementById("container-customFields");
  container.innerHTML = "";
  const others = currentResume["其他"] || {};

  // 更新快捷推荐药丸的已添加状态
  document.querySelectorAll("#pill-quick-list .pill-item").forEach(pill => {
    const fieldName = pill.getAttribute("data-field");
    if (fieldName in others) {
      pill.classList.add("added");
    } else {
      pill.classList.remove("added");
    }
  });

  Object.entries(others).forEach(([key, val]) => {
    const item = document.createElement("div");
    item.className = "form-item";
    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <label class="form-label" style="margin-bottom: 0;">${key}</label>
        <button type="button" class="sub-card-delete-btn btn-del-custom" style="padding: 0 4px;">删除</button>
      </div>
      <input type="text" class="input-field f-custom-val" value="${val || ""}" placeholder="请输入${key}">
    `;

    const input = item.querySelector(".f-custom-val");
    input.addEventListener("input", () => {
      others[key] = input.value.trim();
      updateCompletionStats();
    });

    item.querySelector(".btn-del-custom").addEventListener("click", () => {
      delete others[key];
      renderCustomFields();
      updateCompletionStats();
    });

    container.appendChild(item);
  });
}

// 13. API 设置与快捷服务商
function renderApiSettings() {
  document.getElementById("api-key").value = currentApiConfig.apiKey || "";
  document.getElementById("api-base-url").value = currentApiConfig.baseUrl || "";
  document.getElementById("api-model").value = currentApiConfig.model || "";

  document.querySelectorAll(".api-preset-chip").forEach(chip => {
    const pName = chip.getAttribute("data-preset");
    if (PRESET_APIS[pName] && PRESET_APIS[pName].baseUrl === currentApiConfig.baseUrl) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
}

function collectApiSettings() {
  currentApiConfig = {
    apiKey: document.getElementById("api-key").value.trim(),
    baseUrl: document.getElementById("api-base-url").value.trim(),
    model: document.getElementById("api-model").value.trim()
  };
}

// 14. 字段完成度与侧边栏指示器更新
function updateCompletionStats() {
  collectBasicInfo();
  collectSelfEvaluation();

  const b = currentResume["基本信息"] || {};
  const bFilled = Object.values(b).filter(v => v !== null && String(v).trim().length > 0).length;
  updateSectionStatus("basicInfo", bFilled, 11);

  const ji = currentResume["求职意向"] || [];
  let jiFilled = 0;
  ji.forEach(item => {
    if (item["意向岗位"]) jiFilled++;
    if (item["期望城市"]) jiFilled++;
    if (item["期望薪资"]) jiFilled++;
  });
  updateSectionStatus("jobIntentions", jiFilled, Math.max(3, ji.length * 3));

  const edu = currentResume["教育背景"] || [];
  let eduFilled = 0;
  edu.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) eduFilled++;
    });
  });
  updateSectionStatus("educations", eduFilled, Math.max(16, edu.length * 16));

  const work = currentResume["实习/工作经历"] || [];
  let workFilled = 0;
  work.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) workFilled++;
    });
  });
  updateSectionStatus("workExperiences", workFilled, Math.max(12, work.length * 12));

  const proj = currentResume["项目经历"] || [];
  let projFilled = 0;
  proj.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) projFilled++;
    });
  });
  updateSectionStatus("projectExperiences", projFilled, Math.max(9, proj.length * 9));

  const camp = currentResume["在校任职经历"] || [];
  let campFilled = 0;
  camp.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) campFilled++;
    });
  });
  updateSectionStatus("campusRoles", campFilled, Math.max(5, camp.length * 5));

  const aw = currentResume["奖项"] || [];
  let awFilled = 0;
  aw.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) awFilled++;
    });
  });
  updateSectionStatus("awards", awFilled, Math.max(5, aw.length * 5));

  const pb = currentResume["论文"] || [];
  let pbFilled = 0;
  pb.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) pbFilled++;
    });
  });
  updateSectionStatus("publications", pbFilled, Math.max(6, pb.length * 6));

  const cf = currentResume["证书"] || [];
  let cfFilled = 0;
  cf.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) cfFilled++;
    });
  });
  updateSectionStatus("certificates", cfFilled, Math.max(5, cf.length * 5));

  const lg = currentResume["语言能力"] || [];
  let lgFilled = 0;
  lg.forEach(item => {
    Object.values(item).forEach(v => {
      if (v && String(v).trim()) lgFilled++;
    });
  });
  updateSectionStatus("languages", lgFilled, Math.max(4, lg.length * 4));

  const sk = currentResume["技能标签"] || [];
  updateSectionStatus("skills", sk.length > 0 ? 1 : 0, 1);

  const se = currentResume["自我评价"] || {};
  const seVal = se["个人评价"] || "";
  updateSectionStatus("selfEvaluation", seVal.trim().length > 0 ? 1 : 0, 1);

  const ot = currentResume["其他"] || {};
  const otFilled = Object.values(ot).filter(v => v !== null && String(v).trim().length > 0).length;
  const otTotal = Math.max(12, Object.keys(ot).length);
  updateSectionStatus("customFields", otFilled, otTotal);

  // 计算总统计
  const totalFilled = bFilled + jiFilled + eduFilled + workFilled + projFilled + campFilled + awFilled + pbFilled + cfFilled + lgFilled + (sk.length > 0 ? 1 : 0) + (seVal ? 1 : 0) + otFilled;
  const totalFields = 11 + Math.max(3, ji.length * 3) + Math.max(16, edu.length * 16) + Math.max(12, work.length * 12) + Math.max(9, proj.length * 9) + Math.max(5, camp.length * 5) + Math.max(5, aw.length * 5) + Math.max(6, pb.length * 6) + Math.max(5, cf.length * 5) + Math.max(4, lg.length * 4) + 1 + 1 + otTotal;

  document.getElementById("stats-desc").textContent = `已填写 ${totalFilled} / 可填 ${totalFields} 个字段`;
  const pct = Math.min(100, Math.round((totalFilled / totalFields) * 100));
  document.getElementById("stats-progress-bar").style.width = `${pct}%`;

  // 格式化 JSON 显示
  const jsonArea = document.getElementById("json-editor-area");
  if (jsonArea && document.activeElement !== jsonArea) {
    jsonArea.value = JSON.stringify(currentResume, null, 2);
  }
}

function updateSectionStatus(modKey, filled, total) {
  const dot = document.getElementById(`dot-${modKey}`);
  const secDot = document.getElementById(`sec-dot-${modKey}`);
  const count = document.getElementById(`count-${modKey}`);

  if (count) count.textContent = `${filled}/${total}`;

  let cls = "red";
  if (filled >= total && total > 0) cls = "green";
  else if (filled > 0) cls = "yellow";

  if (dot) {
    dot.className = `sidebar-item-dot ${cls}`;
  }
  if (secDot) {
    secDot.className = `section-dot ${cls}`;
  }
}

// 统一数据重新渲染
function renderAll() {
  document.getElementById("resume-title-input").value = currentResumeTitle;
  renderBasicInfo();
  renderJobIntentions();
  renderEducations();
  renderWorkExperiences();
  renderProjectExperiences();
  renderCampusRoles();
  renderAwards();
  renderPublications();
  renderCertificates();
  renderLanguages();
  renderSkills();
  renderSelfEvaluation();
  renderCustomFields();
  renderApiSettings();
  updateCompletionStats();
}

// 弹出 Toast 提示
function showToast(msg) {
  const t = document.getElementById("toast-notice");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => {
    t.classList.remove("show");
  }, 2400);
}

// 本地数据加载与持久化
async function loadSavedData() {
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    renderAll();
    checkUrlHash();
    return;
  }

  try {
    const data = await chrome.storage.local.get([
      "nextoffer_resumes",
      "nextoffer_selected_resume_id",
      "resumeData",
      "apiKey",
      "baseUrl",
      "model",
      "llm_config"
    ]);

    // 加载 3 份简历列表
    if (data.nextoffer_resumes && Array.isArray(data.nextoffer_resumes) && data.nextoffer_resumes.length > 0) {
      for (let i = 0; i < 3; i++) {
        const idStr = String(i + 1);
        const existing = data.nextoffer_resumes.find(r => String(r.id) === idStr);
        if (existing) {
          resumesList[i] = {
            id: idStr,
            name: existing.name || ("简历" + (i === 0 ? "一" : i === 1 ? "二" : "三")),
            resume: existing.resume || JSON.parse(JSON.stringify(DEFAULT_RESUME)),
            updatedAt: existing.updatedAt || new Date().toISOString()
          };
        } else if (i === 0 && data.resumeData) {
          resumesList[0] = {
            id: "1",
            name: data.nextoffer_resumes[0]?.name || "简历一",
            resume: data.resumeData,
            updatedAt: new Date().toISOString()
          };
        }
      }
    } else if (data.resumeData) {
      resumesList[0].resume = data.resumeData;
      if (data.resumeData["基本信息"]?.["姓名"]) {
        resumesList[0].name = `${data.resumeData["基本信息"]["姓名"]}的简历`;
      }
    }

    // 选中当前激活的简历
    if (data.nextoffer_selected_resume_id && ["1", "2", "3"].includes(String(data.nextoffer_selected_resume_id))) {
      activeResumeId = String(data.nextoffer_selected_resume_id);
    }
    const target = resumesList.find(r => String(r.id) === String(activeResumeId)) || resumesList[0];
    currentResume = JSON.parse(JSON.stringify(target.resume));
    currentResumeTitle = target.name || "简历一";

    // 同步顶部 3 个标签标题与高亮
    for (let i = 0; i < 3; i++) {
      const tEl = document.getElementById(`tab-nav-title-${i + 1}`);
      if (tEl) tEl.textContent = resumesList[i].name;
    }
    document.querySelectorAll(".resume-tab-btn").forEach(btn => {
      if (btn.getAttribute("data-tab-id") === activeResumeId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (data.llm_config) {
      currentApiConfig = {
        apiKey: data.llm_config.apiKey || "",
        baseUrl: data.llm_config.baseUrl || "https://api.deepseek.com",
        model: data.llm_config.model || "deepseek-chat"
      };
    } else if (data.apiKey || data.baseUrl || data.model) {
      currentApiConfig = {
        apiKey: data.apiKey || "",
        baseUrl: data.baseUrl || "https://api.deepseek.com",
        model: data.model || "deepseek-chat"
      };
    }
  } catch (err) {
    console.warn("加载本地配置失败:", err);
  }

  renderAll();
  checkUrlHash();
}

async function saveAllData() {
  collectBasicInfo();
  collectSelfEvaluation();
  collectApiSettings();

  currentResumeTitle = document.getElementById("resume-title-input")?.value?.trim() || ("简历" + activeResumeId);

  // 同步更新当前简历对象到 resumesList
  const currentIdx = resumesList.findIndex(r => String(r.id) === String(activeResumeId));
  if (currentIdx !== -1) {
    resumesList[currentIdx].name = currentResumeTitle;
    resumesList[currentIdx].resume = JSON.parse(JSON.stringify(currentResume));
    resumesList[currentIdx].updatedAt = new Date().toISOString();
  }

  // 同步更新标签标题
  const activeTabTitle = document.getElementById(`tab-nav-title-${activeResumeId}`);
  if (activeTabTitle) activeTabTitle.textContent = currentResumeTitle;

  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    try {
      await chrome.storage.local.set({
        "nextoffer_resumes": resumesList,
        "nextoffer_selected_resume_id": activeResumeId,
        "resumeData": currentResume,
        "apiKey": currentApiConfig.apiKey,
        "baseUrl": currentApiConfig.baseUrl,
        "model": currentApiConfig.model,
        "llm_config": currentApiConfig
      });

      // 广播给 content-scripts
      chrome.tabs?.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { type: "NEXTOFFER_RESUMES_CHANGED" }).catch(() => {});
        });
      });

      const statusEl = document.getElementById("save-status");
      statusEl.textContent = "✅ 已成功保存并同步！";
      statusEl.style.color = "#2d7d4f";
      setTimeout(() => {
        statusEl.textContent = "● 数据已就绪";
        statusEl.style.color = "var(--text-dim)";
      }, 3000);

      showToast("🎉 简历与大模型配置已成功保存至本地！");
    } catch (err) {
      showToast("❌ 保存失败: " + err.message);
    }
  } else {
    showToast("⚠️ 当前环境无 chrome.storage，仅在页面内存生效");
  }

  updateCompletionStats();
}

// 增量合并 PDF 解析结果：更新已提取字段，未提及的不动
function mergeResumeFromPdf(parsed) {
  if (!parsed || typeof parsed !== "object") return;

  // 1. 基本信息增量合并
  if (parsed["基本信息"] && typeof parsed["基本信息"] === "object") {
    if (!currentResume["基本信息"]) currentResume["基本信息"] = {};
    Object.entries(parsed["基本信息"]).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim().length > 0) {
        currentResume["基本信息"][k] = String(v).trim();
      }
    });

    if (currentResume["基本信息"]["姓名"]) {
      currentResumeTitle = `${currentResume["基本信息"]["姓名"]}的简历`;
    }
  }

  // 2. 数组模块增量覆盖（仅当 PDF 中确实解析出了非空条目才覆盖）
  const arrayModules = [
    "求职意向", "教育背景", "实习/工作经历", "项目经历",
    "在校任职经历", "奖项", "论文", "证书", "语言能力"
  ];

  arrayModules.forEach(mod => {
    if (Array.isArray(parsed[mod]) && parsed[mod].length > 0) {
      const validItems = parsed[mod].filter(item => {
        if (!item || typeof item !== "object") return false;
        return Object.values(item).some(val => val !== undefined && val !== null && String(val).trim().length > 0);
      });
      if (validItems.length > 0) {
        currentResume[mod] = validItems;
      }
    }
  });

  // 3. 技能标签去重追加
  if (Array.isArray(parsed["技能标签"]) && parsed["技能标签"].length > 0) {
    if (!Array.isArray(currentResume["技能标签"])) currentResume["技能标签"] = [];
    parsed["技能标签"].forEach(tag => {
      const cleanTag = String(tag).trim();
      if (cleanTag && !currentResume["技能标签"].includes(cleanTag)) {
        currentResume["技能标签"].push(cleanTag);
      }
    });
  }

  // 4. 自我评价增量更新
  if (parsed["自我评价"]?.["个人评价"] && String(parsed["自我评价"]["个人评价"]).trim()) {
    if (!currentResume["自我评价"]) currentResume["自我评价"] = {};
    currentResume["自我评价"]["个人评价"] = String(parsed["自我评价"]["个人评价"]).trim();
  }

  // 5. 其他扩展字段增量合并
  if (parsed["其他"] && typeof parsed["其他"] === "object") {
    if (!currentResume["其他"]) currentResume["其他"] = {};
    Object.entries(parsed["其他"]).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim().length > 0) {
        currentResume["其他"][k] = String(v).trim();
      }
    });
  }
}

// 处理 PDF 简历上传解析
async function handlePdfUpload(file) {
  if (!file) return;

  collectApiSettings();
  if (!currentApiConfig.baseUrl || !currentApiConfig.apiKey) {
    showToast("⚠️ 请先在底部「大模型 API 设置」中填写 API Key 和 Base URL！");
    const apiSec = document.getElementById("mod-apiSettings");
    const scrollCard = document.getElementById("form-scroll-card");
    if (scrollCard && apiSec) {
      scrollCard.scrollTo({ top: apiSec.offsetTop, behavior: "smooth" });
    }
    return;
  }

  const uploadBtn = document.getElementById("btn-upload-pdf");
  const origBtnHtml = uploadBtn.innerHTML;

  try {
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = `⏳ 正在读取 PDF...`;

    // 检查本地 PDF.js 库
    if (typeof pdfjsLib === "undefined") {
      throw new Error("PDF.js 依赖库尚未就绪，请刷新重试");
    }
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("lib/pdf.worker.min.js");
    } catch {
      // 容错处理
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;

    let fullText = "";
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageStr = textContent.items.map(it => it.str).join(" ");
      fullText += `--- 第 ${i} 页 ---\n` + pageStr + "\n";
    }

    if (!fullText.trim() || fullText.trim().length < 20) {
      throw new Error("从 PDF 中未能读取到文字内容（若为纯扫描图片 PDF，请先通过 OCR 识别转为文本）");
    }

    uploadBtn.innerHTML = `⏳ 大模型解析中...`;

    const systemPrompt = `你是一个专业的简历结构化解析专家。请从给定的简历文本中提取所有个人信息与经历，并严格按照以下 JSON Schema 输出。
注意规则：
1. 只输出合法标准的 JSON 格式，包裹在 \`\`\`json ... \`\`\` 代码块中，不要输出多余解释或前言后语。
2. 简历中未提及或未包含的字段，必须设为空字符串 "" 或空数组 []，严禁编造虚假信息！
3. 日期格式请统一规范为 YYYY-MM-DD，若只有年月则为 YYYY-MM-01。
4. 字段规范如下：
{
  "基本信息": {
    "姓名": "",
    "性别": "",
    "出生日期": "YYYY-MM-DD",
    "出生年": "YYYY",
    "出生月": "MM",
    "出生日": "DD",
    "手机号": "",
    "邮箱": "",
    "英文名": "",
    "民族": "",
    "微信号": "",
    "籍贯": "",
    "政治面貌": "",
    "婚姻状况": "",
    "QQ号": "",
    "现居城市": "",
    "作品主页/在线简历": ""
  },
  "求职意向": [
    { "意向岗位": "", "期望城市": "", "期望薪资": "" }
  ],
  "教育背景": [
    {
      "学校": "",
      "专业": "",
      "学历": "大专/本科/硕士研究生/博士研究生",
      "学位": "学士/硕士/博士/无",
      "开始时间": "YYYY-MM-DD",
      "结束时间": "YYYY-MM-DD",
      "院校层次": "985/211/双一流/普通本科/专科",
      "GPA": "",
      "海外院校": "否",
      "毕业证号": "",
      "学位证号": "",
      "学院名称": "",
      "研究方向": "",
      "学校城市": "",
      "专业课程": "",
      "学生干部": "否"
    }
  ],
  "实习/工作经历": [
    {
      "公司名称": "",
      "职位": "",
      "开始时间": "YYYY-MM-DD",
      "结束时间": "YYYY-MM-DD",
      "工作描述": "",
      "工作性质": "实习/全职/兼职",
      "所属行业": "",
      "工作地点": "",
      "薪资": "",
      "工作成果": "",
      "所属部门": "",
      "个人收获": ""
    }
  ],
  "项目经历": [
    {
      "项目名称": "",
      "担任角色": "",
      "项目开始时间": "YYYY-MM-DD",
      "项目结束时间": "YYYY-MM-DD",
      "核心技术": "",
      "项目描述": "",
      "我的职责": "",
      "项目成果": "",
      "项目链接": "",
      "个人收获": ""
    }
  ],
  "在校任职经历": [
    {
      "组织名称": "",
      "担任职务": "",
      "开始时间": "YYYY-MM-DD",
      "结束时间": "YYYY-MM-DD",
      "工作描述": ""
    }
  ],
  "奖项": [
    {
      "获奖时间": "YYYY-MM-DD",
      "奖项名称": "",
      "颁奖机构": "",
      "奖项级别": "国家级/省部级/市厅级/校级/院级",
      "奖项描述": ""
    }
  ],
  "论文": [
    {
      "论文题目": "",
      "作者排序": "第一作者/第二作者/通讯作者",
      "论文类型": "学术期刊/国际会议/学位论文",
      "发表载体": "",
      "发表时间": "YYYY-MM-DD",
      "主要内容": ""
    }
  ],
  "证书": [
    {
      "获得日期": "YYYY-MM-DD",
      "证书名称": "",
      "证书编号": "",
      "颁发机构": "",
      "证书描述": ""
    }
  ],
  "语言能力": [
    {
      "语言类型": "",
      "证书名称": "",
      "分数": "",
      "掌握程度": "母语/精通/熟练/良好/一般"
    }
  ],
  "技能标签": ["技能1", "技能2"],
  "自我评价": {
    "个人评价": ""
  },
  "其他": {
    "生源地": "",
    "户口所在地": "",
    "现居住地址": "",
    "身份证号": "",
    "护照号": "",
    "驾照类型": "",
    "兵役情况": "",
    "健康状况": "",
    "身高": "",
    "兴趣爱好": "",
    "紧急联系人": "",
    "紧急联系人电话": ""
  }
}`;

    let endpoint = currentApiConfig.baseUrl.replace(/\/+$/, "");
    if (!endpoint.endsWith("/chat/completions")) {
      endpoint += "/chat/completions";
    }

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentApiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: currentApiConfig.model || "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `请解析以下简历文本并提取所有可用信息：\n\n${fullText}` }
        ],
        temperature: 0.1
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`大模型 API 响应失败 (HTTP ${resp.status}): ${errText.slice(0, 150)}`);
    }

    const resJson = await resp.json();
    const content = resJson.choices?.[0]?.message?.content || "";

    let jsonStr = content;
    const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      jsonStr = match[1];
    }

    const parsed = JSON.parse(jsonStr.trim());

    // 增量合并字段
    mergeResumeFromPdf(parsed);

    // 重新渲染表单并保存
    renderAll();
    await saveAllData();
    showToast("🎉 PDF 简历解析完成！已成功更新已有字段，未提及字段保持原样。");
  } catch (err) {
    console.error("PDF 解析失败:", err);
    alert("PDF 简历解析失败: " + err.message);
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.innerHTML = origBtnHtml;
    document.getElementById("pdf-file-input").value = "";
  }
}

// 绑定全局事件
function initEvents() {
  // 保存简历按钮
  document.getElementById("btn-save-all").addEventListener("click", saveAllData);

  // 3份简历快捷切换标签监听
  document.querySelectorAll(".resume-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab-id");
      if (tabId) switchResumeTab(tabId);
    });
  });

  // 简历名称输入框与顶部标签实时同步
  document.getElementById("resume-title-input")?.addEventListener("input", (e) => {
    const val = e.target.value.trim() || ("简历" + activeResumeId);
    const tabTitleEl = document.getElementById(`tab-nav-title-${activeResumeId}`);
    if (tabTitleEl) tabTitleEl.textContent = val;
  });

  // 恢复模版按钮 (清空数据)
  document.getElementById("btn-reset-default").addEventListener("click", () => {
    if (confirm("确定要清空并重置为初始空白模版吗？")) {
      currentResume = JSON.parse(JSON.stringify(DEFAULT_RESUME));
      currentResumeTitle = "我的简历";
      renderAll();
      showToast("已重置为空白模版");
    }
  });

  // 上传 PDF 简历交互
  const uploadBtn = document.getElementById("btn-upload-pdf");
  const fileInput = document.getElementById("pdf-file-input");

  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePdfUpload(file);
    }
  });

  // 侧边栏菜单跳转 (严格基于内部滚动容器，杜绝外层窗口滚动导致左侧空白)
  document.querySelectorAll("#sidebar-menu .sidebar-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll("#sidebar-menu .sidebar-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const targetId = item.getAttribute("data-target");
      const targetSec = document.getElementById(targetId);
      const scrollCard = document.getElementById("form-scroll-card");

      if (scrollCard && targetSec) {
        // 使用针对容器的 scrollTop，绝对不调用 window.scroll 或 scrollIntoView
        const targetOffset = targetSec.offsetTop;
        scrollCard.scrollTo({
          top: targetOffset,
          behavior: "smooth"
        });
      }
    });
  });

  // 滚动监听（Scroll Spy）：右侧表单滚动时，自动同步高亮左侧菜单
  const scrollCard = document.getElementById("form-scroll-card");
  if (scrollCard) {
    scrollCard.addEventListener("scroll", () => {
      const scrollPos = scrollCard.scrollTop + 60;
      const sections = document.querySelectorAll(".resume-section");
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          const modId = sec.id;
          document.querySelectorAll("#sidebar-menu .sidebar-item").forEach(item => {
            if (item.getAttribute("data-target") === modId) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      });
    }, { passive: true });
  }

  // 快捷药丸点击直接添加扩展字段
  document.querySelectorAll("#pill-quick-list .pill-item").forEach(pill => {
    pill.addEventListener("click", () => {
      const fieldName = pill.getAttribute("data-field");
      if (!currentResume["其他"]) currentResume["其他"] = {};
      if (!(fieldName in currentResume["其他"])) {
        currentResume["其他"][fieldName] = "";
        renderCustomFields();
        updateCompletionStats();
        showToast(`已添加字段: ${fieldName}`);
      }
    });
  });

  // 添加自定义字段
  document.getElementById("btn-add-customField").addEventListener("click", () => {
    const key = prompt("请输入要添加的自定义字段名称（如：生源地、政治面貌细分等）：");
    if (!key || !key.trim()) return;
    const cleanKey = key.trim();
    if (!currentResume["其他"]) currentResume["其他"] = {};
    if (cleanKey in currentResume["其他"]) {
      alert("该字段已存在！");
      return;
    }
    currentResume["其他"][cleanKey] = "";
    renderCustomFields();
    updateCompletionStats();
  });

  // 添加动态列表项
  document.getElementById("btn-add-jobIntention").addEventListener("click", () => {
    if (!currentResume["求职意向"]) currentResume["求职意向"] = [];
    currentResume["求职意向"].push({ "意向岗位": "", "期望城市": "", "期望薪资": "" });
    renderJobIntentions();
    updateCompletionStats();
  });

  document.getElementById("btn-add-education").addEventListener("click", () => {
    if (!currentResume["教育背景"]) currentResume["教育背景"] = [];
    currentResume["教育背景"].push({
      "学校": "", "专业": "", "学历": "本科", "学位": "学士",
      "开始时间": "", "结束时间": "", "院校层次": "普通本科", "GPA": "",
      "海外院校": "否", "毕业证号": "", "学位证号": "", "学院名称": "",
      "研究方向": "", "学校城市": "", "专业课程": "", "学生干部": "否"
    });
    renderEducations();
    updateCompletionStats();
  });

  document.getElementById("btn-add-workExperience").addEventListener("click", () => {
    if (!currentResume["实习/工作经历"]) currentResume["实习/工作经历"] = [];
    currentResume["实习/工作经历"].push({
      "公司名称": "", "职位": "", "开始时间": "", "结束时间": "",
      "工作描述": "", "工作性质": "实习", "所属行业": "", "工作地点": "",
      "薪资": "", "工作成果": "", "所属部门": "", "个人收获": ""
    });
    renderWorkExperiences();
    updateCompletionStats();
  });

  document.getElementById("btn-add-projectExperience").addEventListener("click", () => {
    if (!currentResume["项目经历"]) currentResume["项目经历"] = [];
    currentResume["项目经历"].push({
      "项目名称": "", "担任角色": "", "项目开始时间": "", "项目结束时间": "",
      "核心技术": "", "项目描述": "", "我的职责": "", "项目成果": "",
      "项目链接": "", "个人收获": ""
    });
    renderProjectExperiences();
    updateCompletionStats();
  });

  document.getElementById("btn-add-campusRole").addEventListener("click", () => {
    if (!currentResume["在校任职经历"]) currentResume["在校任职经历"] = [];
    currentResume["在校任职经历"].push({
      "组织名称": "", "担任职务": "", "开始时间": "", "结束时间": "", "工作描述": ""
    });
    renderCampusRoles();
    updateCompletionStats();
  });

  document.getElementById("btn-add-award").addEventListener("click", () => {
    if (!currentResume["奖项"]) currentResume["奖项"] = [];
    currentResume["奖项"].push({
      "获奖时间": "", "奖项名称": "", "颁奖机构": "", "奖项级别": "省部级", "奖项描述": ""
    });
    renderAwards();
    updateCompletionStats();
  });

  document.getElementById("btn-add-publication").addEventListener("click", () => {
    if (!currentResume["论文"]) currentResume["论文"] = [];
    currentResume["论文"].push({
      "论文题目": "", "作者排序": "第一作者", "论文类型": "学术期刊", "发表载体": "", "发表时间": "", "主要内容": ""
    });
    renderPublications();
    updateCompletionStats();
  });

  document.getElementById("btn-add-certificate").addEventListener("click", () => {
    if (!currentResume["证书"]) currentResume["证书"] = [];
    currentResume["证书"].push({
      "获得日期": "", "证书名称": "", "证书编号": "", "颁发机构": "", "证书描述": ""
    });
    renderCertificates();
    updateCompletionStats();
  });

  document.getElementById("btn-add-language").addEventListener("click", () => {
    if (!currentResume["语言能力"]) currentResume["语言能力"] = [];
    currentResume["语言能力"].push({
      "语言类型": "英语", "证书名称": "CET-4", "分数": "", "掌握程度": "熟练"
    });
    renderLanguages();
    updateCompletionStats();
  });

  // 技能标签添加
  const skillInp = document.getElementById("input-skill-text");
  document.getElementById("btn-add-skill-text").addEventListener("click", () => {
    addSkillTag(skillInp.value.trim());
    skillInp.value = "";
  });
  skillInp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkillTag(skillInp.value.trim());
      skillInp.value = "";
    }
  });

  // API 密码显示切换
  const apiKeyInp = document.getElementById("api-key");
  const toggleKeyBtn = document.getElementById("btn-toggle-apikey");
  toggleKeyBtn.addEventListener("click", () => {
    if (apiKeyInp.type === "password") {
      apiKeyInp.type = "text";
      toggleKeyBtn.textContent = "隐藏";
    } else {
      apiKeyInp.type = "password";
      toggleKeyBtn.textContent = "显示";
    }
  });

  // 快捷服务商点击
  document.querySelectorAll(".api-preset-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const pName = chip.getAttribute("data-preset");
      const preset = PRESET_APIS[pName];
      if (preset) {
        document.getElementById("api-base-url").value = preset.baseUrl;
        document.getElementById("api-model").value = preset.model;
        document.querySelectorAll(".api-preset-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        showToast(`已应用 ${chip.textContent.trim()} 预设参数`);
      }
    });
  });

  // API 连通性测试
  document.getElementById("btn-test-api").addEventListener("click", async () => {
    collectApiSettings();
    const resultEl = document.getElementById("test-api-result");
    resultEl.textContent = "⏳ 正在测试连通性...";
    resultEl.style.color = "var(--text-secondary)";

    if (!currentApiConfig.baseUrl) {
      resultEl.textContent = "❌ 请先填写 API Base URL";
      resultEl.style.color = "#c94335";
      return;
    }

    const t0 = Date.now();
    try {
      let endpoint = currentApiConfig.baseUrl.replace(/\/+$/, "");
      if (!endpoint.endsWith("/chat/completions")) {
        endpoint += "/chat/completions";
      }

      const headers = { "Content-Type": "application/json" };
      if (currentApiConfig.apiKey) {
        headers["Authorization"] = `Bearer ${currentApiConfig.apiKey}`;
      }

      const resp = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: currentApiConfig.model || "deepseek-chat",
          messages: [{ role: "user", content: "Hi" }],
          max_tokens: 5
        })
      });

      const latency = Date.now() - t0;
      if (resp.ok) {
        resultEl.textContent = `✅ 连接成功！延迟 ${latency}ms，模型响应正常`;
        resultEl.style.color = "#2d7d4f";
      } else {
        const errText = await resp.text();
        let errMsg = `HTTP ${resp.status}`;
        try {
          const j = JSON.parse(errText);
          if (j.error?.message) errMsg += `: ${j.error.message}`;
          else if (j.message) errMsg += `: ${j.message}`;
        } catch {
          errMsg += `: ${errText.slice(0, 100)}`;
        }
        resultEl.textContent = `❌ ${errMsg}`;
        resultEl.style.color = "#c94335";
      }
    } catch (err) {
      resultEl.textContent = `❌ 请求异常: ${err.message}`;
      resultEl.style.color = "#c94335";
    }
  });

  // JSON 编辑器格式化与应用（增加二次确认弹窗）
  document.getElementById("btn-format-json").addEventListener("click", async () => {
    const area = document.getElementById("json-editor-area");
    try {
      const parsed = JSON.parse(area.value);
      const ok = await showConfirmDialog("格式化 JSON 确认", "是否确认对当前 JSON 文本重新进行标准缩进排版？", "确定格式化");
      if (!ok) return;
      area.value = JSON.stringify(parsed, null, 2);
      showToast("JSON 格式化成功");
    } catch (e) {
      alert("JSON 语法有误: " + e.message);
    }
  });

  document.getElementById("btn-apply-json").addEventListener("click", async () => {
    const area = document.getElementById("json-editor-area");
    try {
      const parsed = JSON.parse(area.value);
      const ok = await showConfirmDialog("从 JSON 覆盖表单确认", "将使用下方 JSON 完整覆盖当前简历的所有表单字段，是否继续？", "确定覆盖并同步");
      if (!ok) return;
      currentResume = parsed;
      renderAll();
      saveAllData();
      showToast("已成功从 JSON 同步并保存全部数据！");
    } catch (e) {
      alert("无法应用 JSON，请检查语法格式: " + e.message);
    }
  });

  // 顶部导航：大模型配置直达按钮
  document.getElementById("btn-header-model")?.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToApiSettings();
  });
}

// 直达大模型配置区并高亮聚焦
function scrollToApiSettings() {
  const targetSec = document.getElementById("mod-apiSettings");
  const scrollCard = document.getElementById("form-scroll-card");
  if (scrollCard && targetSec) {
    const topPos = targetSec.getBoundingClientRect().top - scrollCard.getBoundingClientRect().top + scrollCard.scrollTop;
    scrollCard.scrollTo({
      top: Math.max(0, topPos - 20),
      behavior: "smooth"
    });
  }
  document.querySelectorAll("#sidebar-menu .sidebar-item").forEach(item => {
    if (item.getAttribute("data-target") === "mod-apiSettings") {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  const keyInput = document.getElementById("api-key");
  if (keyInput) {
    setTimeout(() => {
      keyInput.focus();
      keyInput.style.transition = "box-shadow 0.25s ease, border-color 0.25s ease";
      keyInput.style.borderColor = "var(--accent)";
      keyInput.style.boxShadow = "0 0 0 3px rgba(201, 100, 66, 0.25)";
      setTimeout(() => { keyInput.style.boxShadow = ""; }, 2500);
    }, 250);
  }
}

// 页面加载启动与 Hash 锚点响应
function checkUrlHash() {
  const hash = window.location.hash;
  if (hash) {
    const targetId = hash.replace(/^#/, "");
    if (targetId === "mod-apiSettings" || targetId === "apiSettings") {
      setTimeout(scrollToApiSettings, 150);
      return;
    }
    const targetSec = document.getElementById(targetId);
    const scrollCard = document.getElementById("form-scroll-card");
    if (scrollCard && targetSec) {
      setTimeout(() => {
        const topPos = targetSec.getBoundingClientRect().top - scrollCard.getBoundingClientRect().top + scrollCard.scrollTop;
        scrollCard.scrollTo({
          top: Math.max(0, topPos - 20),
          behavior: "smooth"
        });
        document.querySelectorAll("#sidebar-menu .sidebar-item").forEach(item => {
          if (item.getAttribute("data-target") === targetId) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }, 150);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initEvents();
  loadSavedData();
  checkUrlHash();
  window.addEventListener("hashchange", checkUrlHash);
});
