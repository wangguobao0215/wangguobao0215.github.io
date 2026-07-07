function calcAssess() {
  var dims = [
    { name: '诊', label: '看清起点', color: 'var(--blue-500)', qs: ['q1','q2'] },
    { name: '定', label: '找准方向', color: '#2d6a4f', qs: ['q3','q4'] },
    { name: '绘', label: '画出蓝图', color: '#7b2cbf', qs: ['q5','q6'] },
    { name: '执', label: '落地执行', color: '#c9a84c', qs: ['q7','q8'] }
  ];

  var scores = {};
  var total = 0;
  var allAnswered = true;

  dims.forEach(function(d) {
    var sum = 0;
    d.qs.forEach(function(q) {
      var sel = document.querySelector('input[name="' + q + '"]:checked');
      if (sel) { sum += parseInt(sel.value); }
      else { allAnswered = false; }
    });
    scores[d.name] = sum;
    total += sum;
  });

  if (!allAnswered) {
    alert('请回答所有8个问题后再查看结果。');
    return;
  }

  // Find weakest dimension
  var weakest = dims[0];
  dims.forEach(function(d) {
    if (scores[d.name] < scores[weakest.name]) weakest = d;
  });

  // Overall level
  var level, levelDesc, levelColor;
  if (total <= 12) {
    level = 'L1 · 启蒙期'; levelDesc = '你的企业AI转型还处于早期阶段。最重要的不是急着上项目，而是先建立认知共识。'; levelColor = '#e53e3e';
  } else if (total <= 20) {
    level = 'L2 · 探索期'; levelDesc = '已有初步认知和一些尝试，但缺少系统性的方法论和路径规划。'; levelColor = '#d69e2e';
  } else if (total <= 27) {
    level = 'L3 · 体系期'; levelDesc = '有较好的基础和框架，但在某些维度还有明显的短板需要补齐。'; levelColor = '#4a8db7';
  } else {
    level = 'L4 · 引领期'; levelDesc = '你的企业已经走在AI转型的前列。接下来的挑战是如何持续迭代和规模化。'; levelColor = '#38a169';
  }

  var phaseAdvice = {
    '诊': { title: '从「诊」开始', rec: '建议先做一次系统性的AI成熟度诊断，看清起点再出发。', action: '了解AI-FACTORY · 诊阶段', methodId: 'ai-factory' },
    '定': { title: '先「定」再动', rec: '方向比速度重要。建议先与高管团队对齐AI战略共识。', action: '了解AI-FACTORY · 定阶段', methodId: 'ai-factory' },
    '绘': { title: '把蓝图画实', rec: '战略有了，但缺落地路径。建议用深智工坊四步法把规划变成可执行的项目。', action: '了解深智工坊 · 流程重构', methodId: 'process-reconstructor' },
    '执': { title: '让执行不跑偏', rec: '蓝图不错，但执行容易走样。建议引入变革罗盘做风险诊断和执行校准。', action: '了解变革罗盘', methodId: 'change-compass' }
  };

  var advice = phaseAdvice[weakest.name];

  var html = '';
  html += '<div style="text-align:center;margin-bottom:36px;">';
  html += '<div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">你的AI转型成熟度</div>';
  html += '<div style="font-size:36px;font-weight:800;color:' + levelColor + ';margin-bottom:4px;">' + level + '</div>';
  html += '<div style="font-size:14px;color:var(--text-muted);">' + levelDesc + '</div>';
  html += '<div style="font-size:13px;color:var(--text-faint);margin-top:8px;">总分 ' + total + '/32</div>';
  html += '</div>';

  // Score bars
  html += '<div style="margin-bottom:36px;">';
  dims.forEach(function(d) {
    var pct = Math.round(scores[d.name] / 8 * 100);
    var isWeakest = d.name === weakest.name;
    html += '<div style="margin-bottom:16px;">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">';
    html += '<span style="font-size:13px;font-weight:700;color:' + (isWeakest ? levelColor : 'var(--blue-700)') + ';">' + d.name + ' · ' + d.label + (isWeakest ? ' ⚠️ 最短板' : '') + '</span>';
    html += '<span style="font-size:12px;color:var(--text-muted);">' + scores[d.name] + '/8</span>';
    html += '</div>';
    html += '<div style="height:8px;background:var(--bg);border-radius:4px;overflow:hidden;">';
    html += '<div style="height:100%;width:' + pct + '%;background:' + d.color + ';border-radius:4px;transition:width 0.8s ease;"></div>';
    html += '</div></div>';
  });
  html += '</div>';

  // Recommendation
  html += '<div style="padding:24px;background:var(--blue-50);border-radius:12px;border-left:4px solid ' + weakest.color + ';margin-bottom:32px;">';
  html += '<h4 style="font-size:15px;font-weight:700;color:var(--blue-700);margin-bottom:8px;">💡 ' + advice.title + '</h4>';
  html += '<p style="font-size:13px;color:var(--text-muted);line-height:1.8;margin-bottom:12px;">' + advice.rec + '</p>';
  html += '<button class="btn btn-outline" onclick="showMethodDetail(\'' + advice.methodId + '\')" style="border-color:var(--blue-300);color:var(--blue-500);padding:8px 20px;font-size:12px;">' + advice.action + ' →</button>';
  html += '</div>';

  // CTA
  html += '<div style="text-align:center;padding:32px;background:var(--white);border:1px solid var(--border-light);border-radius:16px;">';
  html += '<h4 style="font-size:15px;font-weight:700;color:var(--blue-700);margin-bottom:8px;">想要更精准的诊断？</h4>';
  html += '<p style="font-size:13px;color:var(--text-muted);line-height:1.7;margin-bottom:16px;">这个自测只是起点。如果你想要一份针对你企业的详细诊断报告，<br>可以预约一次免费的1对1咨询——用AI-FACTORY框架做一次深度诊断。</p>';
  html += '<a href="mailto:wangguobao007@outlook.com?subject=预约AI转型免费诊断" class="btn btn-primary" style="font-size:13px;padding:10px 28px;">预约免费诊断 →</a>';
  html += '<div style="margin-top:16px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">';
  html += '<button class="btn btn-outline" onclick="shareAssessResult()" style="border-color:var(--border-light);color:var(--text-muted);padding:8px 20px;font-size:12px;">📋 复制结果分享</button>';
  html += '<button class="btn btn-outline" onclick="resetAssess()" style="border-color:var(--border-light);color:var(--text-muted);padding:8px 20px;font-size:12px;">重新测试</button>';
  html += '</div></div>';

  document.getElementById('assessForm').style.display = 'none';
  document.getElementById('assessResult').style.display = 'block';
  document.getElementById('resultContent').innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetAssess() {
  document.getElementById('assessForm').style.display = 'block';
  document.getElementById('assessResult').style.display = 'none';
  document.querySelectorAll('#assessForm input[type="radio"]').forEach(function(r) { r.checked = false; });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareAssessResult() {
  // Re-calculate to get current scores
  var dims = [
    { name: '诊', label: '看清起点', qs: ['q1','q2'] },
    { name: '定', label: '找准方向', qs: ['q3','q4'] },
    { name: '绘', label: '画出蓝图', qs: ['q5','q6'] },
    { name: '执', label: '落地执行', qs: ['q7','q8'] }
  ];
  var scores = {}; var total = 0;
  dims.forEach(function(d) {
    var sum = 0;
    d.qs.forEach(function(q) {
      var sel = document.querySelector('input[name="' + q + '"]:checked');
      if (sel) sum += parseInt(sel.value);
    });
    scores[d.name] = sum; total += sum;
  });
  var level = total <= 12 ? 'L1·启蒙期' : total <= 20 ? 'L2·探索期' : total <= 27 ? 'L3·体系期' : 'L4·引领期';
  var text = '🤖 我的AI转型成熟度自测结果\n\n';
  text += '📊 总体等级：' + level + '（' + total + '/32分）\n\n';
  dims.forEach(function(d) {
    var bar = '█'.repeat(scores[d.name]) + '░'.repeat(8 - scores[d.name]);
    text += d.name + '·' + d.label + ' ' + bar + ' ' + scores[d.name] + '/8\n';
  });
  text += '\n来测测你的企业站在哪 👉 https://wangguobao0215.github.io';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      alert('结果已复制到剪贴板，可以分享给同事了！');
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
    alert('结果已复制到剪贴板，可以分享给同事了！');
  }
}

// ===== Main Application =====
// ===== PAGE SYSTEM =====
function switchPage(name) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('active'); });
  // Sub-page → parent nav highlight mapping
  var parentMap = { 'books':'resources', 'reports':'resources', 'assess':'resources', 'topics':'resources', 'method-detail':'methodology' };
  var navName = parentMap[name] || name;
  var activeLink = document.querySelector('.nav-links a[data-page="' + navName + '"]');
  if (activeLink) activeLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Umami SPA pageview tracking
  if (window.umami) { umami.track('pageview', { url: '/' + name }); }
  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  // Re-init reveals
  setTimeout(initReveal, 120);
}

function switchSched(id, el) {
  document.querySelectorAll('.tr-sched-tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.tr-sched-panel').forEach(function(p) { p.classList.remove('show'); });
  document.getElementById(id).classList.add('show');
}
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== METHODOLOGY DATA =====
const methods = [
  {
    id: 'ai-factory',
    badge: '核心方法论',
    isFeatured: true,
    name: 'AI-FACTORY 四阶飞轮',
    sub: '企业AI转型方法论',
    visualization: 'ai-factory.png',
    desc: '从认知到执行的渐进式路径——诊（Readiness）、定（StratNav）、绘（Blueprint）、执（WarRoom）。四阶段不是线性阶梯，而是循环飞轮：执行中发现的问题回去调战略，战略调整又影响蓝图，越转越快。',
    fit: '适合：企业老板 · CIO · 转型负责人',
    detail: {
      // Featured AI-FACTORY detail
      stats: [
        { num: '4', label: '阶段飞轮' },
        { num: '5', label: 'Agent Skill' },
        { num: '20min', label: '快诊定位' },
        { num: '6', label: '张蓝图' }
      ],
      stages: [
        {
          phase: 'PHASE 1',
          icon: '🔍',
          title: '诊 —— 看清起点',
          desc: '20分钟对话式诊断，完成四维定位（数据、人才、技术、文化），照出你的真实位置。不是问卷，是深度对话。',
          items: ['四维雷达图 · 数据/人才/技术/文化', '8大行业基准对比', 'AI就绪度评分', '差距分析报告']
        },
        {
          phase: 'PHASE 2',
          icon: '🎯',
          title: '定 —— 统一语言',
          desc: '让CEO从"我觉得AI很重要"变成"我知道我要用AI换什么"。这是整个陪跑项目的"宪法制定"阶段。',
          items: ['AI战略意图声明', '高管共识工作坊', '业务优先级排序', '诊断报告与基线']
        },
        {
          phase: 'PHASE 3',
          icon: '📋',
          title: '绘 —— 六张蓝图',
          desc: '六张可执行的转型设计图——组织变革、场景识别、流程优化、数据架构、应用架构、技术底座。每一张都能直接指导项目立项。',
          items: ['组织变革设计图', '场景识别与价值矩阵', '流程优化与AI嵌入点', '数据架构与应用架构', '技术底座选型指南', '六张蓝图整合交付']
        },
        {
          phase: 'PHASE 4',
          icon: '⚡',
          title: '执 —— WarRoom',
          desc: '把蓝图变成项目、预算、时间表、责任人。包含政治风险管理——部门冲突、否决权陷阱、权力地图。',
          items: ['TOP10风险管控清单', '投资路线图与预算', '权力地图与否决权分析', '项目启动与里程碑']
        }
      ],
      compare: [
        { aspect: '起点', traditional: '技术驱动，先选平台', fact: '组织诊断，先看清起点' },
        { aspect: '战略', traditional: 'CTO/CIO拍板', fact: 'CEO主导，高管共识' },
        { aspect: '蓝图', traditional: 'PPT规划，无法执行', fact: '六张设计图，直接立项' },
        { aspect: '风险', traditional: '技术风险为主', fact: '政治风险+组织阻力' },
        { aspect: '循环', traditional: '一次性项目', fact: '循环飞轮，越转越快' }
      ],
      audience: [
        { icon: '👔', name: '企业老板/CEO', desc: '需要统一高管语言，明确AI战略意图，知道钱该花在哪' },
        { icon: '💻', name: 'CIO/CTO', desc: '需要六张蓝图指导技术选型和架构设计，避免踩坑' },
        { icon: '📊', name: '转型负责人', desc: '需要WarRoom级别的执行框架，管理项目、预算、风险' },
        { icon: '🏭', name: '制造业高管', desc: '需要理解AI如何重构制造核心竞争力，而非仅仅自动化' }
      ]
    }
  },
  {
    id: 'process-reconstructor',
    badge: '方法论',
    name: '深智工坊·AI流程重构',
    sub: '企业流程AI化改造方法论',
    visualization: 'ai-factory.png',
    desc: '在企业已看清起点（四阶飞轮·诊）之后，需要把「诊断结果」转化为「具体的流程改造方案」。深智工坊提供四步法——需求萃取、设计蓝图、构造交付、运营迭代——让每一个AI改造项目都有章可循。',
    fit: '适合：CIO · 流程负责人 · 技术团队 · 转型推动者',
    detail: {
      paragraphs: [
        '「诊完了、看清了，然后呢？」——这是四阶飞轮做完诊断后最常听到的问题。深智工坊·AI流程重构就是那个「然后」。它回答一个具体的业务问题：诊断报告里的那些发现，怎么变成一条条真正能跑的AI流程？',
        '不是从零开始教你怎么写代码。是从你现有的业务流出发——你的审批流、你的对账流程、你的客户跟进SOP——帮你看清楚哪些环节该AI做、哪些该人做、哪些需要系统配合。然后给你一套标准化的四步法，把改造方案做出来。'
      ],
      deliverables: [
        'As-Is vs To-Be 流程对比图（可交付）',
        '人机分工矩阵（谁做什么）',
        'AI嵌入点评估报告',
        '改造优先级排序与ROI预估',
        'Agent Skill设计方案',
        '实施路线图（三阶段）'
      ],
      stats: [
        { num: '4', label: '步方法' },
        { num: '10+', label: '可交付Skill' },
        { num: '2天', label: '实战营产出' },
        { num: '3', label: '种改造模式' }
      ],
      stages: [
        {
          phase: 'STEP 1',
          icon: '🔍',
          title: '需求萃取',
          desc: '用变革罗盘+四阶飞轮的诊断结论，定位最优先改造的业务流程。不是拍脑袋选，是数据驱动决策。',
          items: ['流程审计与瓶颈识别', 'AI嵌入点评估', 'ROI预估与优先级排序', '干系人分析']
        },
        {
          phase: 'STEP 2',
          icon: '📋',
          title: '设计蓝图',
          desc: '画出To-Be流程——人做什么、AI做什么、系统怎么串。每一处改动都有业务逻辑支撑。',
          items: ['As-Is vs To-Be对比图', '人机分工矩阵', '系统集成方案', '数据流设计']
        },
        {
          phase: 'STEP 3',
          icon: '🛠️',
          title: '构造交付',
          desc: '用Agent Skill四步法（需求→设计→构造→运营）把蓝图变成可运行的AI工具。每个Skill都是独立可交付的智能体。',
          items: ['Skill工程四步法', 'Agent串联编排', '测试与验收标准', '部署与权限配置']
        },
        {
          phase: 'STEP 4',
          icon: '🔄',
          title: '运营迭代',
          desc: 'AI不是一次交付就结束的。建立效果跟踪、反馈回路和持续优化的机制，让流程越跑越聪明。',
          items: ['效果看板与KPI', '反馈回路设计', '版本迭代机制', '知识沉淀与复用']
        }
      ],
      audience: [
        { icon: '💻', name: 'CIO/技术负责人', desc: '需要一套标准化的AI流程改造方法论，让团队有章可循' },
        { icon: '📋', name: '流程/运营总监', desc: '需要把诊断结果转化为可执行的项目方案' },
        { icon: '🔧', name: '技术团队', desc: '需要四步法指导从需求到交付的完整开发流程' },
        { icon: '🏢', name: '转型推动者', desc: '需要可复用的改造模式，在不同业务线快速复制' }
      ]
    }
  },
  {
    id: 'climb',
    badge: '方法论',
    name: 'CLIMB模型',
    sub: '数字成长阶梯',
    desc: '告别"项目思维"，拥抱"攀登思维"。五层能力阶梯（C数字底座→L业务场景→I组织能力→M管理价值→B企业成长）构成价值创造完整链条，规划飞轮（B→M→I→L→C）确保力出一孔，反馈飞轮（C→L→I→M→B）实现敏捷进化。双飞轮驱动，让数字化投资真正产生增长回报。',
    fit: '适合：CIO · 数字化决策者',
    visualization: 'staircase',
    steps: [
      { num: 'C', label: '数字底座', en: 'Core Digital Foundation', desc: '统一治理、互联互通、弹性可扩展的核心技术生态。包含云计算、大数据、AI、物联网等技术要素，封装为可被业务重复调用的平台化服务。', color: 'var(--blue-500)' },
      { num: 'L', label: '业务场景', en: 'Leveraged Business Scenarios', desc: '从端到端业务流程中精心挑选的高价值环节——一旦注入数字化能力，便能撬动显著价值回报。转化为可验证的灯塔项目。', color: 'var(--accent)' },
      { num: 'I', label: '组织能力', en: 'Integrated Enterprise Capabilities', desc: '当灯塔项目的成功实践转变为组织可持续、可复用、可组合的本领时，真正的数字化能力就诞生了。从"做了项目"进化为"拥有了能力"。', color: 'var(--blue-600)' },
      { num: 'M', label: '管理价值', en: 'Measured Business Outcomes', desc: '为每一项能力定义直接关联的、可量化的业务成果指标。迫使管理从关注"技术上线"转向关注"价值兑现"。', color: 'var(--blue-700)' },
      { num: 'B', label: '企业成长', en: 'Business Growth & Strategic Value', desc: '所有数字化投入的终极指向——可持续的财务增长、战略卡位或模式创新。模型的起点与终点。', color: 'var(--gold)' }
    ],
    flywheels: [
      { name: '规划飞轮', path: 'B → M → I → L → C', desc: '战略解码与传导——从成长目标逐层解码到技术建设，确保力出一孔。' },
      { name: '反馈飞轮', path: 'C → L → I → M → B', desc: '数据反馈与学习——新底座能力催生新场景，数据分析揭示新机会并反哺战略。' }
    ],
    detail: {
      paragraphs: [
        '太多企业"系统上了效果没来"——缺的不是工具，是从技术到价值的转换器。CLIMB模型（数字成长阶梯）回答一个核心问题：怎样让数字化投入不只是上线，而是真正转化为组织能力、管理价值和可持续增长。',
        'CLIMB模型的底层逻辑是"攀登思维"：数字化转型不是一个个孤立的技术项目，而是一场以可持续增长为终极目标的战略能力进化。你不能从大本营直接飞抵顶峰——能力的构建具有严格的阶梯性和不可跳跃的依赖性。',
        '<strong>C - 数字底座（Core Digital Foundation）：</strong>统一治理、互联互通、弹性可扩展的核心技术生态。不是散落的工具箱，而是赋能生态——包含云计算、大数据、AI、物联网等技术要素，更关键的是将这些要素封装为可被业务重复调用的平台化服务（信息系统平台、数据分析平台、物联网平台等）。一个稳固的数字底座，决定了企业数字化攀登的下限与敏捷性。',
        '<strong>L - 业务场景（Leveraged Business Scenarios）：</strong>从端到端业务流程中精心挑选的高价值环节——一旦注入数字化能力，便能撬动显著价值回报（如"智能订单履约"、"预测性维护"）。将选定场景转化为具体、可验证的灯塔项目，实现从规划到实证的跨越。',
        '<strong>I - 组织能力（Integrated Enterprise Capabilities）：</strong>当灯塔项目的成功实践通过流程固化、知识沉淀和技能培训，转变为组织可持续、可复用、可组合的本领时，真正的数字化能力就诞生了（如"实时需求感知能力"、"韧性供应链协同能力"）。这标志着企业从"做了项目"进化为"拥有了能力"。',
        '<strong>M - 管理价值（Measured Business Outcomes）：</strong>为每一项能力定义直接关联的、可量化的业务成果指标（如"因需求感知能力提升而降低的库存成本"）。迫使管理从关注"技术上线"转向关注"价值兑现"，是科学决策和资源调配的依据。',
        '<strong>B - 企业成长（Business Growth & Strategic Value）：</strong>所有数字化投入的终极指向——可持续的财务增长（营收、利润）、战略卡位（市场份额、生态地位）或模式创新（服务化收入、订阅模式）。模型的起点与终点，确保转型始终服务于核心战略。',
        '双飞轮机制：<strong>规划飞轮（B→M→I→L→C）</strong>确保力出一孔——从战略目标逐层解码到技术建设；<strong>反馈飞轮（C→L→I→M→B）</strong>实现敏捷进化——新底座能力催生新场景，新能力带来的绩效变化被精准捕捉，数据分析揭示新机会并反哺战略。"组织能力（I）"是双飞轮啮合的变速齿轮。'
      ],
      deliverables: ['CLIMB五层评估表', '规划飞轮战略解码图', '反馈飞轮数据指标体系', '能力进阶路径图', '灯塔项目选择矩阵']
    }
  },
  {
    id: '4l12d',
    badge: '方法论',
    name: '四层十二维',
    sub: '制造业AI本体论',
    desc: '制造业正经历市场端（小批量多品种）、成本端（利润两头压缩）、竞争端（AI跨界打劫）的三重挤压。四层十二维框架用"本体论"统一业务方言——战略层重塑世界观、运营层智能体落地、组织层心智进化、数字化层映射力构建，让通用大模型真正懂"你们的世界"。',
    fit: '适合：制造业CIO · 高管',
    visualization: 'stack',
    layers: [
      {
        name: '战略层',
        en: 'STRATEGY · 世界观重塑',
        title: '重塑世界观——统一业务方言',
        class: 'layer-strategy',
        dimensions: [
          { name: '业务本体重构', desc: '统一核心概念定义，指定每个概念的"最终解释人"，让全公司说同一种业务方言。' },
          { name: '价值逻辑重构', desc: '从规模效应转向规模化的个性化，让AI理解定制规则，快速评估定制订单。' },
          { name: '竞争壁垒重构', desc: '把"对世界的理解深度"作为新护城河，业务知识系统化管理成为核心资产。' }
        ]
      },
      {
        name: '运营层',
        en: 'OPERATIONS · 智能体落地',
        title: '智能体落地——物理世界按新世界观运行',
        class: 'layer-ops',
        dimensions: [
          { name: '资产智能体化', desc: '让设备拥有自我认知，从被动报警到主动汇报，设备成为有感知能力的智能体。' },
          { name: '流程语义化贯通', desc: '让研发、生产、售后说同一种语言，消灭翻译损耗，端到端流程基于统一本体驱动。' },
          { name: '决策协同化进化', desc: '从人找数据到数据找人，实现人机协同决策，AI在关键时刻主动推送洞察。' }
        ]
      },
      {
        name: '组织层',
        en: 'ORGANIZATION · 心智进化',
        title: '心智进化——人的思维跟上新世界',
        class: 'layer-org',
        dimensions: [
          { name: '人才新物种', desc: '培养知识建模师和AI教练，让老师傅的经验得以传承，不再随人员流失而消散。' },
          { name: '文化新基因', desc: '从崇拜老师傅手感到崇尚可共享的逻辑，建立知识贡献的正向激励机制。' },
          { name: '治理新机制', desc: '建立红队、本体评审、过期制，防止本体茧房，确保定义随业务进化。' }
        ]
      },
      {
        name: '数字化层',
        en: 'DIGITAL · 映射力构建',
        title: '映射力构建——连接物理与智能世界',
        class: 'layer-digital',
        dimensions: [
          { name: '数据语义化', desc: '给数据贴标签，让数据从原油变成知识，实现语义检索和智能推荐。' },
          { name: '架构解耦化', desc: '把业务流程从代码里解放出来，让业务人员能自己配置规则，不再依赖IT开发。' },
          { name: '治理资产化', desc: '让数据治理从成本中心变成价值中心，让业务为数据质量负责。' }
        ]
      }
    ],
    detail: {
      paragraphs: [
        '过去十年，制造企业在数字化上投入了天量资金。设备联网了，系统上线了，数据中台建了。但当企业真正想让这些数据"干活"的时候，却发现一个尴尬的现实：数据是通了，但"语义"没通。同一个"客户"，CRM、ERP、售后系统里各有不同定义。AI就懵了："你们说的\'客户\'，到底是谁？"这就是数字化转型的"最后一公里"陷阱。',
        '通用大模型懂的是"世界"，但它不懂"你们的"世界。要让AI真正为你们所用，第一步不是"喂数据"，而是"教世界观"。这套"世界观"有一个古老而正在复兴的名字：本体论——给企业的核心业务概念建立统一的、无歧义的定义。四层十二维框架正是基于这一核心理念，帮助制造企业系统性重塑自己的"工业世界观"。',
        '<strong>战略层：世界观的重塑</strong>——①业务本体重构：统一核心概念的定义，让全公司说同一种"业务方言"，指定每个概念的"最终解释人"。②价值逻辑重构：从"规模效应"转向"规模化的个性化"，让AI理解定制规则，快速评估定制订单的可行性和成本。③竞争壁垒重构：把"对世界的理解深度"作为新的护城河，让本体成为核心资产，业务知识（工艺诀窍、客户经验、故障库）系统化管理。',
        '<strong>运营层：智能体的落地</strong>——④资产智能体化：让设备拥有"自我认知"，从被动报警到主动汇报。⑤流程语义化贯通：让研发、生产、售后说同一种语言，消灭"翻译"损耗，端到端流程基于统一本体驱动。⑥决策协同化进化：从"人找数据"到"数据找人"，实现人机协同决策。',
        '<strong>组织层：心智的进化</strong>——⑦人才新物种：培养"知识建模师"和"AI教练"，让老师傅的经验得以传承，不再随人员流失而消散。⑧文化新基因：从崇拜"老师傅手感"到崇尚"可共享的逻辑"，建立知识贡献的正向激励。⑨治理新机制：建立红队、本体评审、过期制，防止"本体茧房"，确保定义随业务进化。',
        '<strong>数字化层：映射力的构建</strong>——⑩数据语义化：给数据贴标签，让数据从"原油"变成"知识"，实现语义检索和智能推荐。⑪架构解耦化：把业务流程从代码里解放出来，让业务人员能自己配置规则，业务变化不再依赖IT开发。⑫治理资产化：让数据治理从"成本中心"变成"价值中心"，让业务为数据质量负责。'
      ],
      deliverables: ['四层十二维自评雷达图', '业务本体定义手册', '12维度健康度评估报告', 'AI嵌入点设计图', '知识建模师培养路径']
    }
  },
  {
    id: 'core',
    badge: '方法论',
    name: 'CORE引擎',
    sub: '智造重构引擎',
    visualization: 'core.png',
    desc: '连接层解耦（C）→运营层智能（O）→业务层重构（R）→生态层涌现（E）。四层动力结构构成驱动制造业系统性重生的动态引擎，不是静态路线图，而是相互啮合、循环增强的增强回路飞轮。',
    fit: '适合：制造业老板 · 高管',
    detail: {
      paragraphs: [
        'CORE引擎（智造重构引擎）是"脱耦：AI重铸中国制造"专题的核心理论。它回答一个根本问题：如何将一个为确定性、稳定性、控制性而设计的传统制造系统，重构为一个能适应不确定性、动态性、自主性的AI原生系统？',
        '它的答案是：通过四个层次的"脱耦-重耦"过程，逐层解绑旧范式的刚性约束，注入新范式的智能与灵活性，最终实现系统的整体质变。这不是局部优化，而是从"机械范式"跃迁至"生物范式"。',
        '<strong>C - 连接层解耦（Connection-layer Decoupling）：</strong>将物理现实与数字表达从镜像式紧耦合转变为数字可主导的松耦合。构建"数字原生基础设施"——数字模型是主，物理实体是从。协议统一、模型资产化、数字主线贯穿。目标状态："可计算的制造现场"。',
        '<strong>O - 运营层智能（Operational-layer Intelligence）：</strong>将运营管理从基于固定规则的"自动化"升级为基于实时数据和算法的"自主化"。部署自适应智能体网络——将生产调度、质量管控等封装为智能体，基于全局目标进行多目标实时博弈与协同优化。目标状态："自适应智能系统"。',
        '<strong>R - 业务层重构（Business-layer Reconstruction）：</strong>将价值创造逻辑从"销售产品"的一次性交易转变为"交付持续价值"的深度服务关系。价值交付与物理产品脱耦——从卖机器到卖产能，从卖软件到卖业务成果。设计XaaS模式，构建复合型价值包。目标状态："价值即服务型企业"。',
        '<strong>E - 生态层涌现（Ecosystem-layer Emergence）：</strong>从链式竞争转变为生态共演。组织边界与价值活动脱耦——在开放网络中与客户、供应商、互补者进行能力协作。生态位选择、开放接口治理、协同规则创新。目标状态："网状价值共同体"。',
        '四层构成增强回路飞轮：C→O（数据是智能的氧气）→R（运营能力是服务化的保障）→E（开放能力是生态的磁石）→C&O（生态需求倒逼下层进化）。任何一层的突破都可能成为启动引擎的初始火花。'
      ],
      deliverables: ['CORE四层架构战略地图', '数字原生基础设施蓝图', '自适应智能体网络设计', '价值即服务商业模式方案', '生态位选择与平台治理策略']
    }
  },
  {
    id: '3c4q',
    badge: '方法论',
    name: '三才四象',
    sub: '组织知识进化框架',
    desc: '智能时代ToB企业的核心困境：装备了最先进的"AI引擎"，却调不出至关重要的洞察；积累了海量数据文档，却每个项目近乎从零开始。三才四象框架用中国古典哲学的整体观重构知识管理——三才境界（地才·筑基→人才·贯通→天才·化境）+ 四象支撑（技术/流程/人才/文化），让组织的集体智慧转化为AI时代最可靠的智能增长引擎。',
    fit: '适合：CEO · 知识管理负责人 · ToB企业高管',
    visualization: 'circles',
    realms: [
      { name: '地才', en: '地才·筑基', sub: '结构化', desc: '将隐性、杂乱的知识通过领域本体、标准规范进行有序编码，形成稳固的、机器可理解的知识基石。解决"失序"之症。', class: 'realm-earth' },
      { name: '人才', en: '人才·贯通', sub: '网络化', desc: '知识突破单点与部门的束缚，基于业务逻辑被主动连接、关联与贯通。让知识如气血般在组织体周身顺畅运行。解决"断裂"之疾。', class: 'realm-human' },
      { name: '天才', en: '天才·化境', sub: '自增强', desc: '借助AI等技术实现自主的感知、学习、推理与进化。知识不再是管理对象，而是反哺组织、驱动创新的智慧源泉。扭转"枯竭"之势。', class: 'realm-heaven' }
    ],
    symbols: [
      { name: '少阳', en: '技术', icon: '🔧', desc: '知识图谱、大模型、智能搜索等使能器，让三才从理念变为可能。如初春阳气，破土而出的新生力量。', class: 'symbol-shao-yang' },
      { name: '太阳', en: '流程', icon: '⚙️', desc: '将知识活动嵌入业务价值链的制度与规范，确保沉淀与复用是业务动作的自然结果。如盛夏阳光，规范万物生长。', class: 'symbol-tai-yang' },
      { name: '少阴', en: '人才', icon: '👥', desc: '知识架构师、领域专家、社区运营者等角色网络，是知识的最终载体、诠释者与创新源。如秋日之金，收敛沉淀。', class: 'symbol-shao-yin' },
      { name: '太阴', en: '文化', icon: '🌱', desc: '鼓励开放、信任、试错与长期主义的信念与价值观，是最深层的支撑。如冬日涵藏，滋养一切。', class: 'symbol-tai-yin' }
    ],
    detail: {
      paragraphs: [
        '在智能浪潮中，企业手中握有的数据从未如此丰富，算法工具从未如此强大，却陷入一种"数字繁荣下的知识贫困"：研发与市场脱节，销售承诺与交付能力错位，宝贵的客户反馈无法回流驱动产品进化。每个项目都像一次昂贵的"探险"，工程师反复解决本质上相同的问题，顶尖专家的决策逻辑随离职而永久流失。这不是技术故障，而是系统性的"知识失调症"。',
        '传统的知识管理范式——建立在文档仓库、静态Wiki和层级汇报体系之上——在应对AI时代ToB业务的动态性、场景化与复杂性时已然失效。知识被当作静态的"结果"来归档，而非作为动态的"资本"来运营。三才四象框架根植于中国古老智慧，经过现代管理科学与AI技术重构，提出了一条从认知到实践的范式革命。',
        '<strong>地才·筑基（结构化）：</strong>大地厚德载物，是一切生发的基础。将隐性、杂乱的知识（专家经验、零散数据、会议纪要）通过领域本体、标准规范进行有序的"编码"与"承载"，形成稳固的、机器可理解的知识基石。解决"失序"之症，为万物生长提供沃土。核心动作：建立统一的知识分类体系、领域本体模型、标准文档模板。',
        '<strong>人才·贯通（网络化）：</strong>人居天地之间，贵在"参赞化育"——理解、连接并催发万物。知识突破单点与部门的束缚，基于业务逻辑（客户旅程、产品价值链）被主动连接、关联与贯通。销售洞察能触发产品优化，交付经验能赋能市场宣传，知识在流动中碰撞出新价值。解决"断裂"之疾，让知识如气血般在组织体周身顺畅运行。',
        '<strong>天才·化境（自增强）：</strong>天道运行，周行不殆。知识体系借助AI等技术，实现自主的感知、学习、推理与进化。能从新的业务数据中自动发现模式、更新关系、预警风险，甚至主动生成策略建议。知识不再是被管理的对象，而是能够反哺组织、驱动创新的智慧源泉。彻底扭转"枯竭"之势，使知识资本进入复合增长的良性循环。',
        '<strong>四象支撑体系：</strong>①少阳（技术）：知识图谱、大模型、智能搜索等使能器，让三才从理念变为可能。②太阳（流程）：将知识活动嵌入业务价值链的制度与规范，确保沉淀与复用是每个关键业务动作的自然结果，而非额外负担。③少阴（人才）：知识架构师、领域专家、社区运营者等角色网络，是知识的最终载体、诠释者与创新源。④太阴（文化）：鼓励开放、信任、试错与长期主义的信念与价值观，是最深层的支撑，决定一切能否真正生根发芽。',
        '黄金法则：知识的价值，必须在其产生的具体业务场景中被定义，并通过跨场景、跨角色的高效复用来兑现。脱离场景的知识是无效的，无法复用的积累是浪费。'
      ],
      deliverables: ['三才四象成熟度评估', '知识失序诊断报告', '领域本体建模指南', '知识嵌入业务流程设计方案', '四象支撑体系建设路线图']
    }
  },
  {
    id: 'compass',
    badge: '方法论',
    name: '企业AI变革罗盘',
    sub: '转型推动导航框架',
    desc: '战略和执行之间缺一个导航仪。六维AI冲击评估（战略/组织/流程/IT/文化/ROI）+ 四大去化原则（去中介化/去中心化/去经验化/去边界化）+ 三种诊断模式（快扫15min/标准1hr/深度半天），已产品化为Sloth-ChangeCompass-Eido智能体。',
    fit: '适合：转型推动者 · 变革负责人',
    visualization: 'compass',
    dimensions: [
      { num: 1, name: '战略维度', desc: 'AI是否改变了竞争壁垒？商业模式是否需要重构？评估AI对核心战略的影响。' },
      { num: 2, name: '组织维度', desc: '现有架构能否支撑AI-native协作？决策链条是否过长？评估组织就绪度。' },
      { num: 3, name: '流程维度', desc: '哪些流程可被AI去经验化？哪些必须保留人的判断？识别流程重构点。' },
      { num: 4, name: 'IT维度', desc: '现有架构是AI赋能器还是绊脚石？数据治理是否到位？评估技术底座。' },
      { num: 5, name: '文化维度', desc: '组织对AI是恐惧还是兴奋？知识即权力文化是否阻碍共享？评估文化阻力。' },
      { num: 6, name: 'ROI维度', desc: 'AI投资回报周期多长？如何定义成功的衡量标准？建立价值度量体系。' }
    ],
    principles: [
      { name: '去中介化', icon: '🔓', desc: 'AI让信息透明，中间层传话筒价值被消解，重新定义管理者角色。' },
      { name: '去中心化', icon: '🌐', desc: '决策权从高层向一线下沉，AI让一线拥有过去只有高层才有的信息和判断力。' },
      { name: '去经验化', icon: '🤖', desc: '依赖老师傅手感的工作被AI标准化，从经验驱动转向数据+算法驱动。' },
      { name: '去边界化', icon: '🔄', desc: '部门墙被AI打破，跨职能协作成为常态，从职能型转向场景型组织。' }
    ],
    modes: [
      { time: '15min', name: '快速扫描', desc: '六维雷达图快速定位短板，回答"我在哪"。适合初步了解自身位置。' },
      { time: '1hr', name: '标准诊断', desc: '深入分析每个维度现状与目标差距，输出优先级行动清单，回答"怎么去"。' },
      { time: '半天', name: '深度尽调', desc: '全面评估变革健康度，识别政治风险与否决权陷阱，回答"走得稳不稳"。' }
    ],
    detail: {
      paragraphs: [
        '企业AI转型失败，很少是因为技术不行。更多时候，是战略和执行之间缺一个导航仪——高层知道"要变"，但不知道"从哪变、怎么变、变了没有"。变革罗盘就是这个导航仪，它将多年企业服务经验沉淀为可复用的诊断框架，并已产品化为Sloth-ChangeCompass-Eido智能体。',
        '<strong>六维AI冲击评估：</strong>从六个维度全面扫描AI转型对企业的影响——①战略维度：AI是否改变了你的竞争壁垒？商业模式是否需要重构？②组织维度：现有架构能否支撑AI-native的协作方式？决策链条是否过长？③流程维度：哪些流程是AI可以"去经验化"的？哪些必须保留人的判断？④IT维度：现有架构是AI的赋能器还是绊脚石？数据治理是否到位？⑤文化维度：组织对AI是恐惧还是兴奋？"知识即权力"的文化是否阻碍了共享？⑥ROI维度：AI投资的回报周期多长？如何定义"成功"的衡量标准？',
        '<strong>四大去化原则：</strong>AI时代组织变革的底层逻辑——①去中介化：AI让信息透明，中间层的"传话筒"价值被消解，组织需要重新定义管理者的角色。②去中心化：决策权从高层向一线下沉，因为AI让一线拥有了过去只有高层才有的信息和判断力。③去经验化：大量依赖"老师傅手感"的工作被AI标准化，组织需要从"经验驱动"转向"数据+算法驱动"。④去边界化：部门墙被AI打破，跨职能协作成为常态，组织需要从"职能型"转向"场景型"。',
        '<strong>三种诊断模式：</strong>根据企业不同阶段和需求，提供不同深度的诊断——①快速扫描（15分钟）：适合初步了解自身位置，六维雷达图快速定位短板，回答"我在哪"。②标准诊断（1小时）：适合转型启动前，深入分析每个维度的现状与目标差距，输出优先级行动清单，回答"怎么去"。③深度尽调（半天）：适合转型关键节点，全面评估变革健康度，识别政治风险与否决权陷阱，设计变革治理机制，回答"走得稳不稳"。',
        '变革罗盘不是线性的——企业可能在不同阶段之间来回移动，关键是知道自己在哪、下一步该去哪。对话式交互让诊断不是填问卷，而是AI引导式深度对话，让评估更准确、更深入。诊断完成后自动生成专业报告，包含风险点、改进建议、行动优先级。'
      ],
      deliverables: ['六维AI冲击评估雷达图', '四大去化原则成熟度评估', '变革阶段定位图', '关键动作优先级清单', '政治风险与否决权分析', '变革健康度诊断报告']
    }
  }
];

// ===== SKILLS DATA =====
const skills = [
  // 战略规划类
  { id: 'stratalign', name: '深略·战略对齐', category: '战略规划', desc: '愿景→BSC分解→AI潜力三维评分→投资路线图。8大行业Playbook。', method: ['AI-FACTORY', '四层十二维'], links: [{ text: '🖼️ 海报', url: 'skills/poster-stratalign.html' }, { text: '🎬 演示', url: 'https://weixin.qq.com/sph/ADQSKQANT' }, { text: '📊 PPT', url: 'skills/stratalign-deck.html' }] },
  { id: 'aifactory', name: '深智工坊·AI转型规划', category: '战略规划', desc: 'AI转型全景诊断与规划系统，帮助企业系统性地制定AI转型战略。', method: ['AI-FACTORY'], links: [{ text: '🖼️ 海报', url: 'skills/aifactory-eido.html' }, { text: '📊 PPT', url: 'skills/aifactory-deck.html' }] },
  { id: 'growthdigital', name: '深适·成长适配诊断', category: '战略规划', desc: '企业成长阶段×数字化就绪度双轴诊断，7大场景三级指标体系，对话+问卷双模式。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/poster-growthdigital.html' }, { text: '📊 PPT', url: 'skills/growthdigital-eido-intro.pptx' }] },

  // 营销增长类
  { id: 'mgo', name: '深拓·市场增长', category: '营销增长', desc: '市场洞察、竞品分析、增长策略一体化智能体。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-mgo.html' }, { text: '📊 PPT', url: 'skills/mgo-deck.html' }] },
  { id: 'sales', name: '深耕·销售管理', category: '营销增长', desc: '25+能力覆盖完整销售周期，从线索挖掘到成单复盘全链路智能驱动。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-sales-eido.html' }, { text: '🎬 演示', url: 'https://weixin.qq.com/sph/A2kjExhTx' }, { text: '📊 PPT', url: 'skills/sales-deck.html' }] },
  { id: 'cpq', name: '深算·报价管理', category: '营销增长', desc: '六步完成完整报价流程，智能配置、定价、报价单生成。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-cpq.html' }, { text: '🎬 演示', url: 'https://weixin.qq.com/sph/ACutJK6Xf' }, { text: '📊 PPT', url: 'skills/cpq-deck.html' }] },
  { id: 'psc', name: '深谋·售前咨询', category: '营销增长', desc: '十二大模块覆盖售前全链路：会议纪要→竞对攻防→方案骨架→报价谈判。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-psc.html' }, { text: '🎬 演示', url: 'https://weixin.qq.com/sph/AmJyA2p8y' }, { text: '📊 PPT', url: 'skills/psc-deck.html' }] },
  { id: 'mfgconsult', name: '深策·制造咨询', category: '营销增长', desc: '诊断→设计→落地，七步诊断+九步设计+五大运营模式。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-mfgconsult.html' }, { text: '📊 PPT', url: 'skills/mfgconsult-deck.html' }] },
  { id: 'deliverymatrix', name: '深达·交付管理', category: '营销增长', desc: '9原子能力×3角色，YAML三层状态管理，集成飞书/钉钉/企微。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-deliverymatrix.html' }, { text: '📊 PPT', url: 'skills/deliverymatrix-deck.html' }] },
  { id: 'skyhub', name: '深信·客户成功', category: '营销增长', desc: '客户生命周期管理、健康度评分、流失预警与干预策略。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-skyhub.html' }, { text: '📊 PPT', url: 'skills/skyhub-deck.html' }] },
  { id: 'smm', name: '深声·内容运营', category: '营销增长', desc: '三种创作模式，五大平台自动适配，热点追踪到内容发布全链路。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-smm.html' }, { text: '🎬 演示', url: 'https://weixin.qq.com/sph/Are1nTlDq' }, { text: '📊 PPT', url: 'skills/smm-deck.html' }] },
  { id: 'posterden', name: '深绘·海报生成', category: '营销增长', desc: '11种视觉风格一键生成个人品牌海报，参数化定制，HTML自包含+可选PNG输出。', method: [], links: [{ text: '🖼️ 极简留白', url: 'skills/poster-preview-minimal.html' }, { text: '🖼️ 赛博科技', url: 'skills/poster-preview-cyber.html' }, { text: '🖼️ 新中式', url: 'skills/poster-preview-chinese.html' }, { text: '🖼️ 编辑杂志', url: 'skills/poster-preview-editorial.html' }] },

  // 制造运营类
  { id: 'mfgsuite', name: '深驭·制造运营套件', category: '制造运营', desc: '决策大脑+分析透镜，5大实时决策+5大分析维度。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-mfgsuite.html' }, { text: '📊 PPT', url: 'skills/mfgsuite-deck.html' }] },
  { id: 'prodsync', name: '深筹·产销协同', category: '制造运营', desc: '十一项约束引擎+DAG级联，插单影响全链路评估。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-prodsync.html' }, { text: '🎬 演示', url: 'https://weixin.qq.com/sph/AYTPRpLLo' }, { text: '📊 PPT', url: 'skills/prodsync-deck.html' }] },

  // 组织变革类
  { id: 'changecompass', name: '深熵·变革罗盘', category: '组织变革', desc: '六维AI冲击评估（战略/组织/流程/IT/文化/ROI），对话式交互，一键出诊断报告。', method: ['AI-FACTORY', '变革罗盘'], links: [{ text: '🖼️ 海报', url: 'skills/poster-changecompass.html' }, { text: '📊 PPT', url: 'skills/changecompass-deck.html' }] },
  { id: 'hybriddev', name: '深构·研发协同', category: '组织变革', desc: '4子Agent编排混合研发流程，从需求到交付全链路协同。', method: ['CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/poster-hybriddev.html' }, { text: '📊 PPT', url: 'skills/hybriddev-deck.html' }] },
  { id: 'knowledgehub', name: '深知·知识中枢', category: '组织变革', desc: '组织知识管理、智能检索、经验沉淀与传承。', method: ['三才四象'], links: [{ text: '🖼️ 海报', url: 'skills/poster-knowledgehub.html' }, { text: '📊 PPT', url: 'skills/knowledgehub-deck.html' }] },
  { id: 'leadrole', name: '深知智行·岗位智囊', category: '组织变革', desc: '岗位能力建模、智能辅导、绩效提升一体化。', method: ['三才四象'], links: [{ text: '🖼️ 海报', url: 'skills/leadrole-eido.html' }, { text: '📊 PPT', url: 'skills/leadrole-deck.html' }] },
  { id: 'processreconstructor', name: '流程重构器', category: '组织变革', desc: '业务流程挖掘、瓶颈识别、重构方案设计。', method: ['深智工坊·AI流程重构', 'CLIMB', '四层十二维', 'CORE引擎'], links: [{ text: '🖼️ 海报', url: 'skills/processreconstructor-eido.html' }, { text: '📊 PPT', url: 'skills/processreconstructor-deck.html' }] },
  { id: 'ainativerole', name: '深原·AI原生岗位', category: '组织变革', desc: 'AI原生岗位设计与能力模型构建，帮助企业重新定义人机协作岗位。', method: ['AI-FACTORY'], links: [{ text: '🖼️ 海报', url: 'skills/ainativerole-eido.html' }, { text: '📊 PPT', url: 'skills/ainativerole-deck.html' }] },

  // 内容工具类
  { id: 'booksmith', name: '匠书·出版排版', category: '内容工具', desc: '专业级出版排版引擎，支持复杂图文混排与学术格式。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/booksmith-eido.html' }] },
  { id: 'slidesmith', name: '匠演·演示文稿', category: '内容工具', desc: 'AI驱动的专业PPT生成与排版优化。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/slidesmith-eido.html' }] },
  { id: 'chalkcast', name: '深绘·白板手绘', category: '内容工具', desc: '白板手绘短视频引擎，知识讲解可视化。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/chalkcast-eido.html' }, { text: '📊 PPT', url: 'skills/chalkcast-deck.html' }] },
  { id: 'doodlecast', name: '漫绘·知识手绘', category: '内容工具', desc: '知识手绘短视频引擎，让复杂概念生动易懂。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/doodlecast-eido.html' }, { text: '📊 PPT', url: 'skills/doodlecast-deck.html' }] },
  { id: 'demovideo', name: '深录·演示视频', category: '内容工具', desc: '技能演示视频自动生成器。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/demovideo-eido.html' }, { text: '📊 PPT', url: 'skills/demovideo-deck.html' }] },
  { id: 'fundpilot', name: '深驭·基金全周期', category: '内容工具', desc: '基金投资全周期决策支持系统。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/fundpilot-eido.html' }, { text: '📊 PPT', url: 'skills/fundpilot-deck.html' }] },
  { id: 'deckbuilder', name: '演示文稿构建器', category: '内容工具', desc: '专业PPT结构化构建与自动化生成。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/deckbuilder-eido.html' }, { text: '📊 PPT', url: 'skills/deckbuilder-deck.html' }] },

  // 新增技能
  { id: 'flowdoctor', name: '深智工坊·AI流程重构', category: '组织变革', desc: '5个入口×10步诊断×双轨优化，AI驱动的业务流程诊断与重构系统。', method: ['AI-FACTORY'], links: [{ text: '🖼️ 海报', url: 'skills/flowdoctor-eido.html' }, { text: '📊 PPT', url: 'skills/flowdoctor-deck.html' }] },
  { id: 'ideagram', name: '深图·概念可视化引擎', category: '内容工具', desc: '4种输出模式×6种视觉风格，让复杂概念一目了然。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/ideagram-eido.html' }, { text: '📊 PPT', url: 'skills/ideagram-den.html' }] },
  { id: 'authlicense', name: '认证机制与License管理', category: '组织变革', desc: 'PAT Bearer vs SSO，4维度评估，零运维自动化License治理。', method: [], links: [{ text: '🖼️ 海报', url: 'skills/auth-license-eido.html' }, { text: '📊 PPT', url: 'skills/auth-license-deck.html' }] }
];

// ===== SOLUTIONS DATA =====
const solutions = [
  {
    id: 'knowledge-platform',
    name: '企业AI知识管理平台',
    subtitle: '基于价值链的知识复用、增值和反哺',
    desc: '双树架构+Obsidian Vault+SQLite索引，九大Skill知识资产统一沉淀，研发→市场→销售→售前→交付→客户成功全链路闭环。',
    fit: '适合：CEO · CTO · 知识管理负责人 · ToB企业',
    skills: ['knowledgehub', 'leadrole', 'ainativerole'],
    stats: [{ num: '9+', label: 'Skill接入' }, { num: '13', label: '场景节点' }, { num: '8', label: '知识生命周期' }],
    poster: 'skills/poster-knowledgehub.html',
    color: '#2d6a4a'
  },
  {
    id: 'cpq',
    name: '装备制造智能报价方案',
    subtitle: '正向/反向双模式报价引擎',
    desc: '成本穿透、交期验证、审批路由与利润预测，覆盖装备制造等四大行业的端到端AI报价。',
    fit: '适合：装备/汽车/电子制造企业 · 销售总监 · 报价经理',
    skills: ['cpq'],
    stats: [{ num: '10', label: '步工作流' }, { num: '4', label: '大行业' }, { num: '24', label: '项回归测试' }],
    poster: 'skills/poster-cpq.html',
    color: '#2d4a7c'
  },
  {
    id: 'prodsync',
    name: '产销平衡解决方案',
    subtitle: '十一项约束引擎+DAG级联传导',
    desc: '快消品产销协同智能副驾，插单影响全链路评估，What-if情景推演辅助决策。',
    fit: '适合：快消/食品/日化企业 · 运营总监 · 计划经理',
    skills: ['prodsync'],
    stats: [{ num: '11', label: '项约束' }, { num: '370+', label: '可配参数' }, { num: '3', label: '种战略模式' }],
    poster: 'skills/poster-prodsync.html',
    color: '#8a6a3a'
  },
  {
    id: 'mfg-ops',
    name: '制造运营解决方案',
    subtitle: 'Brain决策大脑+Lens分析透镜',
    desc: 'HMLV制造企业一站式AI助手，十大模式覆盖接单决策、排程优化、交期速算、成本真相、产能透视、趋势预警全链路。',
    fit: '适合：制造业CEO · 厂长 · 生产/运营总监',
    skills: ['mfgsuite', 'mfgconsult', 'deliverymatrix'],
    stats: [{ num: '10', label: '种运营模式' }, { num: '2', label: '大核心模块' }, { num: '3', label: '级数据接入' }],
    poster: 'skills/poster-mfgsuite.html',
    color: '#5a3a7a'
  },
  {
    id: 'growthdigital',
    name: '深适·成长适配诊断',
    subtitle: '企业成长阶段×数字化就绪度双轴诊断',
    desc: '格雷纳成长五阶段×数字化就绪度三级模型，7大场景覆盖售前诊断、项目升级、M&A整合、新CIO上任、年度体检、指标看板、选型前置。对话模式+问卷模式双入口，诊断结果自动匹配Obsidian方案库。',
    fit: '适合：CEO · CIO · 转型负责人 · 投资/并购团队',
    skills: ['growthdigital'],
    stats: [{ num: '7', label: '大诊断场景' }, { num: '3', label: '级指标体系' }, { num: '2', label: '种交互模式' }],
    poster: 'skills/poster-growthdigital.html',
    color: '#1e3b52',
    repo: 'https://github.com/wangguobao0215/Sloth-GrowthDigital-Eido'
  }
];

// Methodology-Skill mapping
const methodSkillMap = {
  'climb': ['hybriddev', 'mgo', 'smm', 'prodsync', 'mfgsuite', 'sales', 'cpq', 'stratalign', 'psc', 'mfgconsult', 'deliverymatrix', 'skyhub', 'processreconstructor'],
  '4l12d': ['hybriddev', 'mgo', 'smm', 'prodsync', 'mfgsuite', 'sales', 'cpq', 'stratalign', 'psc', 'mfgconsult', 'deliverymatrix', 'skyhub', 'processreconstructor'],
  'core': ['hybriddev', 'mgo', 'smm', 'prodsync', 'mfgsuite', 'sales', 'cpq', 'stratalign', 'psc', 'mfgconsult', 'deliverymatrix', 'skyhub', 'processreconstructor'],
  '3c4q': ['ainativerole', 'leadrole', 'knowledgehub'],
  'ai-factory': ['aifactory', 'ainativerole', 'leadrole', 'changecompass', 'stratalign', 'flowdoctor'],
  'compass': ['changecompass'],
  'process-reconstructor': ['processreconstructor'],
};

// ===== TOPICS DATA (30个专题系列) =====
const topics = [
  // 一、核心认知
  { id: 'agent-revolution', name: '智能体革命：重构企业流程的底层逻辑', category: '核心认知', count: 20, desc: 'Agent如何重塑BPM', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4298296039049904137#wechat_redirect' },
  { id: 'value-reconstruct', name: '价值重构：AI原生的增长逻辑', category: '核心认知', count: 20, desc: '从价值原子定义增长', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4328267473251581976#wechat_redirect' },
  { id: 'paradox-approach', name: '趋近的悖论', category: '核心认知', count: 12, desc: '当AI成为我们的镜子，我们在镜中看见什么', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4454933457294704641#wechat_redirect' },
  { id: 'ai-ultimate', name: 'AI的终极追问', category: '核心认知', count: 10, desc: '我们是在升维，还是在降维？', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4455001100496257028#wechat_redirect' },
  { id: 'above-fault', name: '断层之上', category: '核心认知', count: 8, desc: 'AI时代的决策者认知重构', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4461755093671067650#wechat_redirect' },

  // 二、产业变革
  { id: 'decoupling', name: '脱藕：AI重铸中国制造', category: '产业变革', count: 12, desc: '产业链重构与AI的解耦效应', method: '四层十二维', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4326776036446027782#wechat_redirect' },
  { id: 'industrial-worldview', name: '重塑工业世界观', category: '产业变革', count: 20, desc: '制造业AI原生的"四层十二维"变革路径', method: '四层十二维', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4415371163065909256#wechat_redirect' },
  { id: 'ai-native-path', name: '制造企业AI原生之路', category: '产业变革', count: 20, desc: '五大本体逐层拆解', method: '四层十二维', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4427520314641743876#wechat_redirect' },
  { id: 'saas-ai', name: 'SaaS转型AI原生', category: '产业变革', count: 14, desc: '软件企业AI转型实战', method: 'CORE引擎', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4499591036012445698#wechat_redirect' },
  { id: 'ai-digital-team', name: 'AI数字团队设计实战', category: '产业变革', count: 16, desc: '企业AI团队构建方法论', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4499584696137400323#wechat_redirect' },
  { id: 'ai-practice-map', name: '企业AI转型实战地图', category: '产业变革', count: 10, desc: '从诊断到落地的全路径实战指南', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4551978037474607117#wechat_redirect' },

  // 三、组织与战略
  { id: '3c4q', name: '三才四象', category: '组织与战略', count: 16, desc: 'AI时代组织认知升级之路', method: '三才四象', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4332739109564563483#wechat_redirect' },
  { id: 'climb', name: 'CLIMB模型', category: '组织与战略', count: 18, desc: '数字成长阶梯', method: 'CLIMB', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4311180684431048705#wechat_redirect' },
  { id: 'ai-strategy', name: 'AI战略内参', category: '组织与战略', count: 16, desc: '写给制造业老板的备忘录', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4380405060275388426#wechat_redirect' },
  { id: 'ai-insight', name: 'AI商业洞察', category: '组织与战略', count: 10, desc: 'AI商业趋势与深度洞察', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4548654354282692612#wechat_redirect' },

  // 四、技术与产品
  { id: 'knowledge-infra', name: '知识新基建', category: '技术与产品', count: 14, desc: 'AI时代TO B企业的场景智能革命', method: '三才四象', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4343207432618098718#wechat_redirect' },
  { id: 'ontology-fog', name: '本体迷雾', category: '技术与产品', count: 10, desc: 'Ontology会颠覆ERP吗？', method: '四层十二维', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4400747438668365826#wechat_redirect' },
  { id: 'ai-native-software', name: 'AI原生重构软件公司', category: '技术与产品', count: 12, desc: 'ToB软件底层革新', method: 'CORE引擎', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4415258602425286668#wechat_redirect' },

  // 五、思维工具
  { id: 'thinking-models', name: '思维模型工具箱', category: '思维工具', count: 20, desc: 'McKinsey/BCG经典框架应用', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4349052543134449677#wechat_redirect' },
  { id: 'growth-engine', name: '打造增长引擎', category: '思维工具', count: 16, desc: '进阶专题A：企业增长方法论', method: 'CLIMB', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4358873457967611913#wechat_redirect' },
  { id: 'strategic-analyst', name: '战略分析师', category: '思维工具', count: 14, desc: '掌握顶尖咨询公司的战略分析框架', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4360276437606449152#wechat_redirect' },
  { id: 'org-change', name: '驾驭组织与变革', category: '思维工具', count: 18, desc: '进阶专题C：变革管理实战', method: '变革罗盘', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4360570797636042767#wechat_redirect' },
  { id: 'ai-tool', name: 'AI工具人养成记', category: '思维工具', count: 20, desc: '手把手用AI干活', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4412358901493252097#wechat_redirect' },
  { id: 'lobster-guide', name: '养龙虾指南', category: '思维工具', count: 20, desc: '人机协作内容创作', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4424351762162122758#wechat_redirect' },
  { id: 'agent-skill', name: 'Agent Skill实战', category: '思维工具', count: 12, desc: '智能体应用实战', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4499453521309843463#wechat_redirect' },
  { id: 'workplace-evolution', name: 'AI时代职场进化论', category: '思维工具', count: 10, desc: '职场人的AI时代生存指南', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4464965786306199556#wechat_redirect' },
  { id: 'ai-era-thinking', name: 'AI时代思维模型工具箱', category: '思维工具', count: 18, desc: 'AI时代的决策思维升级', method: 'AI-FACTORY', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4430233717172862982#wechat_redirect' },

  // 六、其他专题
  { id: 'slow-classics', name: '慢读经典', category: '其他', count: 8, desc: '中西经典对读', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4502561891516530693#wechat_redirect' },
  { id: 'horse-diary', name: '养马日记', category: '其他', count: 6, desc: '创业与成长记录', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4499586128106340353#wechat_redirect' },
  { id: 'workplace-cognition', name: '职场认知', category: '其他', count: 10, desc: '职场认知升级', method: '', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4481087617945681928#wechat_redirect' },

  // 主题歌
  { id: 'theme-song', name: '《慢一点，深一度》', category: '主题歌', count: 1, desc: 'Slow Down, Dig Deep', method: '', url: '' }
];

// ===== RENDER METHOD LIST =====
function renderMethodList() {
  var container = document.getElementById('methodList');
  if (!container) return;
  var html = '';
  methods.forEach(function(m) {
    var cardStyle = m.isFeatured ? ' style="border:2px solid var(--blue-400);background:linear-gradient(135deg,var(--blue-50),var(--white));position:relative;overflow:hidden;"' : '';
    var badgeStyle = m.isFeatured ? ' style="background:linear-gradient(135deg,var(--blue-500),var(--accent));color:#fff;"' : '';
    var crown = m.isFeatured ? '<div style="position:absolute;top:12px;right:12px;font-size:20px;">👑</div>' : '';
    var cta = m.isFeatured ? '<span class="m-link" style="display:inline-flex;align-items:center;gap:4px;margin-top:14px;font-size:12px;font-weight:700;color:var(--blue-500);">🔥 主推方法论 · 了解详情 →</span>' : '<span class="m-link" style="display:inline-flex;align-items:center;gap:4px;margin-top:14px;font-size:12px;font-weight:600;color:var(--blue-400);">了解详情 →</span>';
    html += '<div class="m-list-card" onclick="showMethodDetail(\'' + m.id + '\')"' + cardStyle + '>' +
      crown +
      '<span class="m-badge"' + badgeStyle + '>' + m.badge + '</span>' +
      '<h3>' + m.name + '</h3>' +
      '<div class="m-sub">' + m.sub + '</div>' +
      '<p>' + m.desc + '</p>' +
      '<div style="font-size:11px;color:var(--text-faint);margin-top:10px;">' + m.fit + '</div>' +
      cta +
      '</div>';
  });
  container.innerHTML = html;
}



// ===== RENDER TOPICS PAGE =====
function renderTopics() {
  var container = document.getElementById('topicsContainer');
  if (!container) return;

  var categories = [
    { id: '核心认知', icon: '💡', color: '#1e3b52' },
    { id: '产业变革', icon: '🏭', color: '#2d6a4f' },
    { id: '组织与战略', icon: '🎯', color: '#7b2cbf' },
    { id: '技术与产品', icon: '💻', color: '#c9a84c' },
    { id: '思维工具', icon: '🛠️', color: '#4a8db7' },
    { id: '其他', icon: '📖', color: '#6b8498' },
    { id: '主题歌', icon: '🎵', color: '#e53e3e' }
  ];

  var topicIcons = {
    'agent-revolution': '🤖', 'value-reconstruct': '📈', 'paradox-approach': '🔄',
    'ai-ultimate': '❓', 'above-fault': '🌉', 'decoupling': '🔗',
    'industrial-worldview': '🏗️', 'ai-native-path': '🚀', 'boss-anxiety': '😰',
    'real-economy': '🌍', '3c4q': '☯️', 'climb': '🪜', 'ai-strategy': '📋',
    'knowledge-infra': '📚', 'ontology-fog': '🌫️', 'ai-native-software': '💾',
    'thinking-models': '🧠', 'growth-engine': '⚡', 'strategic-analyst': '🔍',
    'org-change': '🔄', 'ai-tool': '🔧', 'lobster-guide': '🦞', 'theme-song': '🎵',
    'ai-era-thinking': '🧩', 'agent-skill': '🤖', 'workplace-evolution': '📈',
    'slow-classics': '📜', 'horse-diary': '🐴', 'workplace-cognition': '🎯',
    'saas-ai': '☁️', 'ai-digital-team': '👥',
    'ai-practice-map': '🗺️', 'ai-insight': '💡'
  };

  var html = '<p style="font-size:14px;color:var(--text-muted);line-height:1.8;margin-bottom:32px;">';
  html += '从实战中磨出来的内容矩阵。不是理论推演，是28年企业服务的经验蒸馏。';
  html += '</p>';

  // Summary
  var totalCount = topics.reduce(function(sum, t) { return sum + t.count; }, 0);
  html += '<div class="topic-summary">';
  html += '<div class="total-num">' + totalCount + '+</div>';
  html += '<div class="total-label">篇深度原创内容，覆盖30个专题系列</div>';
  html += '</div>';

  categories.forEach(function(cat) {
    var catTopics = topics.filter(function(t) { return t.category === cat.id; });
    if (catTopics.length === 0) return;

    var totalArticles = catTopics.reduce(function(sum, t) { return sum + t.count; }, 0);

    html += '<div class="topic-category">';
    html += '<div class="topic-cat-header" onclick="toggleTopicCategory(this)" style="border-color:' + cat.color + ';">';
    html += '<span class="topic-cat-icon">' + cat.icon + '</span>';
    html += '<h3 class="topic-cat-title" style="color:' + cat.color + ';">' + cat.id + '</h3>';
    html += '<span class="topic-cat-count">' + catTopics.length + '个专题 · ' + totalArticles + '篇</span>';
    html += '<span class="topic-cat-toggle">▾</span>';
    html += '</div>';

    html += '<div class="topic-grid">';
    catTopics.forEach(function(t) {
      var icon = topicIcons[t.id] || '📄';
      var hasLink = t.url && t.url !== '';
      html += '<div class="topic-item"' + (hasLink ? ' onclick="window.open(\'' + t.url + '\',\'_blank\')"' : '') + '>';
      html += '<div class="topic-icon">' + icon + '</div>';
      html += '<h4>' + t.name + '</h4>';
      html += '<div class="topic-meta">' + t.count + '篇</div>';
      html += '<div class="topic-desc">' + t.desc + '</div>';
      if (t.method) {
        html += '<span class="topic-method">' + t.method + '</span>';
      }
      html += '</div>';
    });
    html += '</div></div>';
  });

  html += '<div style="text-align:center;margin-top:40px;">';
  html += '<a href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNjMwODc3MA==&action=getalbum&album_id=4298296039049904137#wechat_redirect" target="_blank" class="btn btn-primary" style="font-size:14px;padding:14px 32px;">前往公众号查看全部文章</a>';
  html += '</div>';

  container.innerHTML = html;
}

function toggleTopicCategory(header) {
  var grid = header.nextElementSibling;
  var toggle = header.querySelector('.topic-cat-toggle');
  grid.classList.toggle('collapsed');
  toggle.classList.toggle('collapsed');
}

// ===== RENDER SKILLS LIST =====
var currentSkillsView = 'solution';

function switchSkillsView(mode) {
  currentSkillsView = mode;
  renderSkillsList();
}

function renderSkillsList() {
  var tabContainer = document.getElementById('skillsViewTabs');
  var container = document.getElementById('skillsList');
  if (!container) return;

  // Render tabs
  if (tabContainer) {
    var tabStyleBase = 'padding:8px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.3s;border:none;';
    var tabActive = 'background:var(--blue-500);color:#fff;box-shadow:0 4px 12px rgba(74,141,183,0.3);';
    var tabInactive = 'background:var(--bg);color:var(--text-muted);';
    tabContainer.innerHTML =
      '<button onclick="switchSkillsView(\'solution\')" style="' + tabStyleBase + (currentSkillsView === 'solution' ? tabActive : tabInactive) + '">📦 按解决方案看</button>' +
      '<button onclick="switchSkillsView(\'category\')" style="' + tabStyleBase + (currentSkillsView === 'category' ? tabActive : tabInactive) + '">📂 按业务领域看</button>';
  }

  if (currentSkillsView === 'solution') {
    renderSolutionView(container);
  } else {
    renderCategoryView(container);
  }
}

function renderSolutionView(container) {
  var html = '';
  solutions.forEach(function(sol) {
    var solSkills = skills.filter(function(s) { return sol.skills.indexOf(s.id) !== -1; });
    var placeholderStyle = sol.isPlaceholder ? 'opacity:0.65;' : '';
    var posterLink;
    if (sol.poster) {
      posterLink = '<a href="' + sol.poster + '" target="_blank" style="display:inline-flex;align-items:center;gap:4px;padding:6px 14px;background:' + sol.color + ';color:#fff;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;">🖼️ 查看海报</a>';
    } else if (sol.repo) {
      posterLink = '<a href="' + sol.repo + '" target="_blank" style="display:inline-flex;align-items:center;gap:4px;padding:6px 14px;background:' + sol.color + ';color:#fff;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;">📋 查看仓库</a>';
    } else {
      posterLink = '<span style="display:inline-flex;align-items:center;gap:4px;padding:6px 14px;background:var(--border-light);color:var(--text-faint);border-radius:6px;font-size:12px;font-weight:600;">🔒 即将发布</span>';
    }

    var statsHtml = sol.stats.map(function(st) {
      return '<div style="text-align:center;padding:10px 14px;background:var(--bg);border-radius:8px;"><div style="font-size:22px;font-weight:800;color:' + sol.color + ';line-height:1;">' + st.num + '</div><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">' + st.label + '</div></div>';
    }).join('');

    html += '<div style="margin-bottom:40px;padding:28px;background:var(--white);border:1px solid var(--border-light);border-radius:var(--radius);' + placeholderStyle + 'border-left:4px solid ' + sol.color + ';">';

    // Header
    html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;">';
    html += '<div>';
    html += '<h3 style="font-size:20px;font-weight:700;color:var(--blue-700);margin:0 0 4px;">' + sol.name + '</h3>';
    html += '<p style="font-size:13px;color:' + sol.color + ';font-weight:600;margin:0 0 8px;">' + sol.subtitle + '</p>';
    html += '<p style="font-size:13px;color:var(--text-muted);line-height:1.7;max-width:640px;margin:0;">' + sol.desc + '</p>';
    if (sol.fit) { html += '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:10px;"><span style="font-size:11px;color:var(--text-faint);font-weight:500;">' + sol.fit + '</span></div>'; }
    html += '</div>';
    html += '<div style="flex-shrink:0;">' + posterLink + '</div>';
    html += '</div>';

    // Stats
    if (statsHtml) {
      html += '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">' + statsHtml + '</div>';
    }

    // Skills grid
    if (solSkills.length > 0) {
      html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;">';
      solSkills.forEach(function(s) {
        var linksHtml = s.links.map(function(l) {
          return '<a href="' + l.url + '" target="_blank" style="display:inline-block;padding:4px 10px;background:var(--blue-50);color:var(--blue-500);border-radius:6px;font-size:11px;font-weight:600;text-decoration:none;transition:all 0.2s;">' + l.text + '</a>';
        }).join(' ');

        var methodTags = s.method.map(function(m) {
          return '<span style="display:inline-block;padding:2px 8px;background:#f0f4f8;color:var(--text-muted);border-radius:4px;font-size:10px;">' + m + '</span>';
        }).join(' ');

        html += '<div style="padding:16px;background:var(--bg);border:1px solid var(--border-light);border-radius:var(--radius-sm);">';
        html += '<h4 style="font-size:14px;font-weight:700;color:var(--blue-700);margin:0 0 8px;">' + s.name + '</h4>';
        html += '<p style="font-size:12px;color:var(--text-muted);line-height:1.6;margin-bottom:10px;">' + s.desc + '</p>';
        if (methodTags) {
          html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">' + methodTags + '</div>';
        }
        html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + linksHtml + '</div>';
        html += '</div>';
      });
      html += '</div>';
    } else if (sol.isPlaceholder) {
      html += '<div style="padding:24px;background:var(--bg);border-radius:var(--radius-sm);text-align:center;">';
      html += '<p style="font-size:14px;color:var(--text-muted);margin:0;">该方案正在打磨中，敬请期待。</p>';
      html += '</div>';
    }

    html += '</div>';
  });

  // Summary
  html += '<div style="margin-top:48px;padding:24px;background:var(--blue-50);border-radius:var(--radius);text-align:center;">';
  html += '<p style="font-size:14px;color:var(--blue-600);font-weight:600;margin-bottom:8px;">5大重点解决方案，覆盖企业AI转型核心场景</p>';
  html += '<p style="font-size:12px;color:var(--text-muted);">每个方案都是方法论+多个Skill的组合——不是单点工具，是系统化的落地能力</p>';
  html += '</div>';

  container.innerHTML = html;
}

function renderCategoryView(container) {
  // Category definitions
  var categories = [
    { id: 'strategy', name: '战略规划', icon: '🧭', color: '#1e3b52' },
    { id: 'marketing', name: '营销增长', icon: '📈', color: '#2d6a4f' },
    { id: 'mfg', name: '制造运营', icon: '🏭', color: '#7b2cbf' },
    { id: 'org', name: '组织变革', icon: '🔄', color: '#c9a84c' },
    { id: 'tools', name: '内容工具', icon: '🛠️', color: '#4a8db7' }
  ];

  var categoryMap = { '战略规划': 'strategy', '营销增长': 'marketing', '制造运营': 'mfg', '组织变革': 'org', '内容工具': 'tools' };

  var html = '';
  categories.forEach(function(cat) {
    var catSkills = skills.filter(function(s) { return categoryMap[s.category] === cat.id; });
    if (catSkills.length === 0) return;

    html += '<div style="margin-bottom:40px;">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid ' + cat.color + ';">';
    html += '<span style="font-size:22px;">' + cat.icon + '</span>';
    html += '<h3 style="font-size:18px;font-weight:700;color:' + cat.color + ';margin:0;">' + cat.name + '</h3>';
    html += '<span style="font-size:12px;color:var(--text-faint);margin-left:8px;">(' + catSkills.length + '个技能)</span>';
    html += '</div>';

    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">';
    catSkills.forEach(function(s) {
      var linksHtml = s.links.map(function(l) {
        return '<a href="' + l.url + '" target="_blank" style="display:inline-block;padding:4px 10px;background:var(--blue-50);color:var(--blue-500);border-radius:6px;font-size:11px;font-weight:600;text-decoration:none;transition:all 0.2s;">' + l.text + '</a>';
      }).join(' ');

      var methodTags = s.method.map(function(m) {
        return '<span style="display:inline-block;padding:2px 8px;background:#f0f4f8;color:var(--text-muted);border-radius:4px;font-size:10px;">' + m + '</span>';
      }).join(' ');

      html += '<div style="padding:20px;background:var(--white);border:1px solid var(--border-light);border-radius:var(--radius);transition:all 0.3s var(--ease);">';
      html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">';
      html += '<h4 style="font-size:15px;font-weight:700;color:var(--blue-700);margin:0;">' + s.name + '</h4>';
      html += '</div>';
      html += '<p style="font-size:12px;color:var(--text-muted);line-height:1.65;margin-bottom:12px;">' + s.desc + '</p>';
      if (methodTags) {
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">' + methodTags + '</div>';
      }
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + linksHtml + '</div>';
      html += '</div>';
    });
    html += '</div></div>';
  });

  // Summary
  html += '<div style="margin-top:48px;padding:24px;background:var(--blue-50);border-radius:var(--radius);text-align:center;">';
  html += '<p style="font-size:14px;color:var(--blue-600);font-weight:600;margin-bottom:8px;">共 ' + skills.length + ' 个智能体Skill，覆盖5大业务领域</p>';
  html += '<p style="font-size:12px;color:var(--text-muted);">每个智能体都是方法论的数字化产品——不是聊天机器人，是能执行诊断、设计、输出报告的专业工具</p>';
  html += '</div>';

  container.innerHTML = html;
}

// ===== SHOW METHOD DETAIL =====
function showMethodDetail(id) {
  var m = methods.find(function(x) { return x.id === id; });
  if (!m) return;
  document.getElementById('md-title').textContent = m.name;
  document.getElementById('md-sub').textContent = m.sub;
  var content = document.getElementById('md-content');
  var html = '';

  if (m.isFeatured) {
    // AI-FACTORY featured rendering
    html += '<div class="m-detail-header">';
    html += '<span class="m-badge-lg" style="background:linear-gradient(135deg,var(--blue-500),var(--accent));color:#fff;">' + m.badge + '</span>';
    html += '<h2>' + m.name + '</h2>';
    html += '<div class="m-detail-sub">' + m.sub + '</div>';
    html += '</div>';

    // Featured image
    if (m.visualization) {
      html += '<div style="text-align:center;margin:40px 0;">';
      html += '<img src="assets/' + m.visualization + '" alt="' + m.name + '" style="max-width:100%;width:900px;border-radius:var(--radius);box-shadow:0 16px 48px rgba(0,0,0,0.12);" onerror="this.style.display=\'none\'">';
      html += '</div>';
    }

    // Stats
    html += '<div class="af-stats">';
    m.detail.stats.forEach(function(s) {
      html += '<div class="af-stat"><div class="num">' + s.num + '</div><div class="label">' + s.label + '</div></div>';
    });
    html += '</div>';

    // Intro paragraph
    html += '<p style="font-size:14px;color:var(--text-muted);line-height:1.9;margin:32px 0;">' +
      '大多数企业谈AI转型，第一步就错了——还没看清自己站在哪，就开始画蓝图。AI-FACTORY四阶飞轮是一面镜子加一套导航系统。四阶段不是线性阶梯，而是循环飞轮：执行中发现的问题回去调战略，战略调整又影响蓝图，越转越快。</p>';

    // Stages
    html += '<div class="af-stages">';
    m.detail.stages.forEach(function(s) {
      html += '<div class="af-stage">';
      html += '<div class="af-stage-icon">' + s.icon + '</div>';
      html += '<div class="af-stage-body">';
      html += '<div class="phase">' + s.phase + '</div>';
      html += '<h3>' + s.title + '</h3>';
      html += '<p>' + s.desc + '</p>';
      html += '<ul>';
      s.items.forEach(function(item) {
        html += '<li>' + item + '</li>';
      });
      html += '</ul></div></div>';
    });
    html += '</div>';

    // Comparison table
    html += '<h3 style="font-size:18px;font-weight:700;color:var(--blue-700);margin:40px 0 16px;">传统咨询 vs AI-FACTORY</h3>';
    html += '<table class="compare-table"><thead><tr><th>维度</th><th>传统咨询</th><th>AI-FACTORY</th></tr></thead><tbody>';
    m.detail.compare.forEach(function(r) {
      html += '<tr><td><strong>' + r.aspect + '</strong></td>';
      html += '<td class="bad">' + r.traditional + '</td>';
      html += '<td class="good">' + r.fact + '</td></tr>';
    });
    html += '</tbody></table>';

    // Audience
    html += '<h3 style="font-size:18px;font-weight:700;color:var(--blue-700);margin:40px 0 16px;">适合谁</h3>';
    html += '<div class="audience-grid">';
    m.detail.audience.forEach(function(a) {
      html += '<div class="audience-card">';
      html += '<div class="icon">' + a.icon + '</div>';
      html += '<h4>' + a.name + '</h4>';
      html += '<p>' + a.desc + '</p>';
      html += '</div>';
    });
    html += '</div>';

  } else {
    // Standard method rendering with PNG visualization
    html += '<div class="m-detail-header">';
    html += '<span class="m-badge-lg">' + m.badge + '</span>';
    html += '<h2>' + m.name + '</h2>';
    html += '<div class="m-detail-sub">' + m.sub + '</div>';
    html += '</div>';

    // Render PNG visualization
    if (m.visualization) {
      var imgMap = {
        'climb': 'climb.png',
        '4l12d': '4layer12d.png',
        '3c4q': '3c4q.png',
        'compass': 'compass.png',
        'core': 'core.png'
      };
      var imgName = imgMap[m.id];
      if (imgName) {
        html += '<div style="text-align:center;margin:40px 0;">';
        html += '<img src="assets/' + imgName + '" alt="' + m.name + '" style="max-width:100%;width:900px;border-radius:var(--radius);box-shadow:0 16px 48px rgba(0,0,0,0.12);" onerror="this.style.display=\'none\'">';
        html += '</div>';
      }
    }

    // Paragraphs
    m.detail.paragraphs.forEach(function(p) {
      html += '<p style="font-size:14px;color:var(--text-muted);line-height:1.9;margin-bottom:14px;">' + p + '</p>';
    });

    // Deliverables
    html += '<div style="padding:24px;background:var(--bg);border-radius:var(--radius);border:1px solid var(--border-light);margin-top:32px;">';
    html += '<h4 style="font-size:14px;font-weight:700;color:var(--blue-700);margin-bottom:14px;">核心交付物</h4>';
    html += '<ul style="list-style:none;">';
    m.detail.deliverables.forEach(function(d) {
      html += '<li style="padding:8px 0;font-size:13px;color:var(--text-body);display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border-light);">' +
        '<span style="width:6px;height:6px;border-radius:50%;background:var(--blue-400);flex-shrink:0;"></span>' + d + '</li>';
    });
    html += '</ul></div>';
  }

  // Related Skills Section
  var relatedSkillIds = methodSkillMap[m.id] || [];
  if (relatedSkillIds.length > 0) {
    var relatedSkills = relatedSkillIds.map(function(id) {
      return skills.find(function(s) { return s.id === id; });
    }).filter(function(s) { return s !== undefined; });

    if (relatedSkills.length > 0) {
      html += '<div style="margin-top:48px;padding-top:32px;border-top:2px solid var(--border-light);">';
      html += '<h3 style="font-size:18px;font-weight:700;color:var(--blue-700);margin-bottom:6px;">🤖 相关智能体Skill</h3>';
      html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">此方法论对应的数字化产品——能执行诊断、设计、输出报告的专业工具</p>';
      html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;">';
      relatedSkills.forEach(function(s) {
        var linksHtml = s.links.map(function(l) {
          return '<a href="' + l.url + '" target="_blank" style="display:inline-block;padding:3px 8px;background:var(--blue-50);color:var(--blue-500);border-radius:4px;font-size:10px;font-weight:600;text-decoration:none;">' + l.text + '</a>';
        }).join(' ');
        html += '<div style="padding:16px;background:var(--white);border:1px solid var(--border-light);border-radius:var(--radius-sm);transition:all 0.3s var(--ease);">';
        html += '<h4 style="font-size:14px;font-weight:700;color:var(--blue-700);margin:0 0 8px;">' + s.name + '</h4>';
        html += '<p style="font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:10px;">' + s.desc + '</p>';
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">' + linksHtml + '</div>';
        html += '</div>';
      });
      html += '</div></div>';
    }
  }

  html += '<div style="margin-top:24px;padding:16px 24px;background:var(--blue-50);border-radius:var(--radius-sm);text-align:center;">';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">' + m.fit + '</p>';
  html += '<a href="mailto:wangguobao007@outlook.com?subject=咨询：' + encodeURIComponent(m.name) + '" class="btn btn-primary" style="font-size:13px;padding:12px 28px;">咨询此方法论</a>';
  html += '</div>';

  content.innerHTML = html;
  switchPage('method-detail');
}

// ===== RESOURCE CENTER =====
var rcFilter = 'all';
var rcData = [
  // Books (13)
  { type:'book', title:'碎单时代的生存法则', desc:'从"资源集合体"到"承诺响应系统"', meta:'2026', cover:'assets/books/fragmented-order-survival.jpg', actions:[{label:'PDF下载',url:'books/fragmented-order-survival/%E7%A2%8E%E5%8D%95%E6%97%B6%E4%BB%A3%E7%9A%84%E7%94%9F%E5%AD%98%E6%B3%95%E5%88%99.pdf',ext:true},{label:'在线阅读',url:'books/fragmented-order-survival/',ext:true}] },
  { type:'book', title:'AI原生制造', desc:'当机器开始重写组织规则', meta:'2026', cover:'assets/books/ai-native-manufacturing.jpg', actions:[{label:'PDF下载',url:'books/ai-native-manufacturing/AI%E5%8E%9F%E7%94%9F%E5%88%B6%E9%80%A0%EF%BC%9A%E5%BD%93%E6%9C%BA%E5%99%A8%E5%BC%80%E5%A7%8B%E9%87%8D%E5%86%99%E7%BB%84%E7%BB%87%E8%A7%84%E5%88%99.pdf',ext:true},{label:'在线阅读',url:'books/ai-native-manufacturing/',ext:true}] },
  { type:'book', title:'价值重构', desc:'AI原生的增长新逻辑', meta:'2026', cover:'assets/books/value-reconstruction.jpg', actions:[{label:'PDF下载',url:'books/value-reconstruction/%E4%BB%B7%E5%80%BC%E9%87%8D%E6%9E%84%EF%BC%9AAI%E5%8E%9F%E7%94%9F%E7%9A%84%E5%A2%9E%E9%95%BF%E6%96%B0%E9%80%BB%E8%BE%91.pdf',ext:true},{label:'在线阅读',url:'books/value-reconstruction/',ext:true}] },
  { type:'book', title:'哈萨比斯', desc:'谷歌AI之脑', meta:'2026', cover:'assets/books/hassabis-biography.jpg', actions:[{label:'PDF下载',url:'books/hassabis-biography/%E5%93%88%E8%90%A8%E6%AF%94%E6%96%AF.pdf',ext:true},{label:'在线阅读',url:'books/hassabis-biography/',ext:true}] },
  { type:'book', title:'AI领导者之路', desc:'从执行到决策', meta:'2026', cover:'assets/books/ai-leader-path.jpg', actions:[{label:'PDF下载',url:'books/ai-leader-path/AI%E9%A2%86%E5%AF%BC%E8%80%85%E4%B9%8B%E8%B7%AF%EF%BC%9A%E4%BB%8E%E6%89%A7%E8%A1%8C%E5%88%B0%E5%86%B3%E7%AD%96.pdf',ext:true},{label:'在线阅读',url:'books/ai-leader-path/',ext:true}] },
  { type:'book', title:'AI智能体', desc:'高管的第一本决策书', meta:'2026', cover:'assets/books/executive-agent.jpg', actions:[{label:'PDF下载',url:'books/executive-agent-book/AI%E6%99%BA%E8%83%BD%E4%BD%93-%E9%AB%98%E7%AE%A1%E7%9A%84%E7%AC%AC%E4%B8%80%E6%9C%AC%E5%86%B3%E7%AD%96%E4%B9%A6.pdf',ext:true},{label:'在线阅读',url:'books/executive-agent-book/',ext:true}] },
  { type:'book', title:'Skill工程实战', desc:'从想法到第一个AI助手', meta:'2026', cover:'assets/books/skill-engineering.jpg', actions:[{label:'PDF下载',url:'books/skill-engineering/Skill%E5%B7%A5%E7%A8%8B%E5%AE%9E%E6%88%98%EF%BC%9A%E4%BB%8E%E6%83%B3%E6%B3%95%E5%88%B0%E7%AC%AC%E4%B8%80%E4%B8%AAAI%E5%8A%A9%E6%89%8B.pdf',ext:true},{label:'在线阅读',url:'books/skill-engineering/',ext:true}] },
  { type:'book', title:'Claude Code工程实战', desc:'从工具到平台', meta:'2026', cover:'assets/books/claude-code-book.jpg', actions:[{label:'PDF下载',url:'books/claude-code-book/Claude-Code%E5%B7%A5%E7%A8%8B%E5%AE%9E%E6%88%98.pdf',ext:true},{label:'在线阅读',url:'books/claude-code-book/',ext:true}] },
  { type:'book', title:'流程智能', desc:'AI重构制造业核心业务链', meta:'2026', cover:'assets/books/flow-intelligence.jpg', actions:[{label:'PDF下载',url:'books/flow-intelligence/%E6%B5%81%E7%A8%8B%E6%99%BA%E8%83%BD.pdf',ext:true},{label:'在线阅读',url:'books/flow-intelligence/',ext:true}] },
  { type:'book', title:'医药批发企业AI转型实战', desc:'从传统批发到智慧供应链', meta:'2026', cover:'assets/books/medicine-wholesale-ai.jpg', actions:[{label:'PDF下载',url:'books/medicine-wholesale-ai/%E5%8C%BB%E8%8D%AF%E6%89%B9%E5%8F%91%E4%BC%81%E4%B8%9AAI%E8%BD%AC%E5%9E%8B%E5%AE%9E%E6%88%98.pdf',ext:true},{label:'在线阅读',url:'books/medicine-wholesale-ai/',ext:true}] },
  { type:'book', title:'本体之上', desc:'AI时代的数据管理与智能决策', meta:'2026', cover:'assets/books/ontology-above.jpg', actions:[{label:'PDF下载',url:'books/ontology-above/%E6%9C%AC%E4%BD%93%E4%B9%8B%E4%B8%8A.pdf',ext:true},{label:'在线阅读',url:'books/ontology-above/',ext:true}] },
  { type:'book', title:'本体驱动', desc:'制造业主数据语义化实战', meta:'2026', cover:'assets/books/ontology-driven.jpg', actions:[{label:'PDF下载',url:'books/ontology-driven/%E6%9C%AC%E4%BD%93%E9%A9%B1%E5%8A%A8.pdf',ext:true},{label:'在线阅读',url:'books/ontology-driven/',ext:true}] },
  { type:'book', title:'Token账本', desc:'AI转型，文化是最后的ROI', meta:'2026', cover:'assets/books/token-ledger.jpg', actions:[{label:'PDF下载',url:'books/token-ledger/Token%E8%B4%A6%E6%9C%AC.pdf',ext:true},{label:'在线阅读',url:'books/token-ledger/',ext:true}] },
  // Reports (12)
  { type:'report', title:'Accenture: Impact to Advantage', desc:'从AI影响力到竞争优势的转化路径', meta:'Accenture · 2026-04', actions:[{label:'原文PDF',url:'reports/originals/2026-04_Accenture_Impact-to-Advantage.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-04_Accenture/master.html',ext:true,gated:true}] },
  { type:'report', title:'International AI Safety Report 2026', desc:'全球AI安全现状与治理框架', meta:'多国联合 · 2026-05', actions:[{label:'原文PDF',url:'reports/originals/International-AI-Safety-Report-2026.pdf',ext:true},{label:'中文翻译',url:'reports/translated/International-AI-Safety-Report-2026_CN.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-05-28-international-ai-safety/master.html',ext:true,gated:true}] },
  { type:'report', title:'Stanford HAI: AI Index 2026', desc:'全球AI发展年度指数报告', meta:'Stanford HAI · 2026-05', actions:[{label:'原文PDF',url:'reports/originals/2026-05-28-StanfordHAI-AI-Index-2026.pdf',ext:true},{label:'中文翻译',url:'reports/translated/2026-05-28-StanfordHAI-AI-Index-2026_CN.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-05-28-stanford-hai-ai-index-2026/master.html',ext:true,gated:true}] },
  { type:'report', title:'Anthropic: State of AI Agents 2026', desc:'AI智能体现状与发展趋势', meta:'Anthropic · 2026-05', actions:[{label:'原文PDF',url:'reports/originals/2026-05-29_Anthropic_State-of-AI-Agents-2026.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-05-29_Anthropic/master.html',ext:true,gated:true}] },
  { type:'report', title:'BCG AI Radar 2026', desc:'全球AI技术雷达与投资趋势', meta:'BCG · 2026-05', actions:[{label:'原文PDF',url:'reports/originals/BCG-AI-Radar-2026.pdf',ext:true},{label:'中文翻译',url:'reports/translated/2026-05-29-BCG-AI-Radar-2026_CN.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-05-29-BCG/master.html',ext:true,gated:true}] },
  { type:'report', title:'WEF: AI组织变革 2026', desc:'AI驱动的组织转型路径', meta:'WEF · 2026-05', actions:[{label:'原文PDF',url:'reports/originals/2026-05-31-WEF-Organizational-Transformation-AI-2026.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-05-31-WEF-Organizational-Transformation/master.html',ext:true,gated:true}] },
  { type:'report', title:'Deloitte: Tech Trends 2026', desc:'2026年十大技术趋势深度解读', meta:'Deloitte · 2026-05', actions:[{label:'原文PDF',url:'reports/originals/2026-05-31-Deloitte-Tech-Trends-2026.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-05-31-Deloitte-Tech-Trends-2026/master.html',ext:true,gated:true}] },
  { type:'report', title:'BCG: AI劳动力转型', desc:'AI时代的企业workforce转型策略', meta:'BCG · 2026-06', actions:[{label:'原文PDF',url:'reports/originals/2026-06-03_BCG_AI-Workforce-Transformation.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-06_BCG/master.html',ext:true,gated:true}] },
  { type:'report', title:'Deloitte: State of AI 2026', desc:'全球AI应用现状与企业采纳趋势', meta:'Deloitte · 2026-06', actions:[{label:'原文PDF',url:'reports/originals/2026-06_Deloitte_State-of-AI-2026.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-06_Deloitte/master.html',ext:true,gated:true}] },
  { type:'report', title:'Salesforce: State of Sales', desc:'AI驱动的销售变革趋势', meta:'Salesforce · 2026-06', actions:[{label:'原文PDF',url:'reports/originals/2026-06_Salesforce_State-of-Sales.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-06_Salesforce/master.html',ext:true,gated:true}] },
  { type:'report', title:'KPMG: 工业制造技术报告', desc:'工业制造行业AI与数字化技术趋势', meta:'KPMG · 2026-04', actions:[{label:'原文PDF',url:'reports/originals/2026-04_KPMG_Global-Tech-Report_Industrial-Manufacturing.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-04_KPMG_Global-Tech-Report/master.html',ext:true,gated:true}] },
  { type:'report', title:'PwC: AI原生企业', desc:'AI原生企业的构建路径与实践', meta:'PwC · 2026-05', actions:[{label:'原文PDF',url:'reports/originals/2026-05-30_PwC-AI-native-enterprise.pdf',ext:true},{label:'深度解读',url:'reports/insights/2026-05-30_PwC-AI-native-enterprise/master.html',ext:true,gated:true}] }
];
// Add topics from the topics array
topics.forEach(function(t) {
  if (t.id === 'theme-song') return;
  rcData.push({ type:'topic', title:t.name, desc:t.desc, meta:t.count+'篇 · '+t.category, actions:[{label:'查看专题',url:t.url,ext:true}] });
});
// Add podcast
rcData.push({ type:'podcast', title:'树懒老K王的个人播客', desc:'慢一点，深一度。用28年的企业服务经验，聊AI转型中的真问题、真方法、真案例。', meta:'小宇宙播客', actions:[{label:'收听播客',url:'https://www.xiaoyuzhoufm.com/podcast/6a1a73ad8809e0ae03691fc1',ext:true}] });

function setRcFilter(f, el) {
  rcFilter = f;
  document.querySelectorAll('.rc-tag').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  filterResources();
}

function filterResources() {
  var q = (document.getElementById('rcSearch').value || '').toLowerCase().trim();
  var grid = document.getElementById('rcGrid');
  var filtered = rcData.filter(function(r) {
    if (rcFilter !== 'all' && r.type !== rcFilter) return false;
    if (q && (r.title + ' ' + r.desc + ' ' + r.meta).toLowerCase().indexOf(q) === -1) return false;
    return true;
  });
  var typeLabels = { book:'书籍', report:'研报', topic:'专题', podcast:'播客' };
  var typeClasses = { book:'rc-type-book', report:'rc-type-report', topic:'rc-type-topic', podcast:'rc-type-podcast' };
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="rc-empty">没有找到匹配的内容，试试其他关键词？</div>';
  } else {
    var html = '';
    var typeIcons = { book:'📖', report:'📊', topic:'📂', podcast:'🎙️' };
    filtered.forEach(function(r) {
      html += '<div class="rc-card rc-card-' + r.type + '">';
      // Cover image for books
      if (r.cover) {
        html += '<div class="rc-cover"><img src="' + r.cover + '" alt="' + r.title + '" loading="lazy"></div>';
      } else {
        html += '<div class="rc-icon">' + typeIcons[r.type] + '</div>';
      }
      html += '<div class="rc-body">';
      html += '<span class="rc-type ' + typeClasses[r.type] + '">' + typeLabels[r.type] + '</span>';
      html += '<h4>' + r.title + '</h4>';
      html += '<div class="rc-desc">' + r.desc + '</div>';
      html += '<div class="rc-meta">' + r.meta + '</div>';
      html += '<div class="rc-actions">';
      r.actions.forEach(function(a) {
        if (a.gated) {
          html += '<button class="rc-btn rc-btn-gate" onclick="event.stopPropagation();gateContent(\'' + a.url + '\')">' + a.label + ' 🔒</button>';
        } else if (a.ext) {
          var btnClass = (a.label.indexOf('PDF')>=0||a.label.indexOf('翻译')>=0) ? 'rc-btn rc-btn-primary' : 'rc-btn rc-btn-outline';
          html += '<a class="' + btnClass + '" href="' + a.url + '" target="_blank" onclick="event.stopPropagation()">' + a.label + '</a>';
        }
      });
      html += '</div></div></div>';
    });
    grid.innerHTML = html;
  }
  document.getElementById('rcCount').textContent = '显示 ' + filtered.length + ' / ' + rcData.length + ' 项资源';
}

// ===== GATE MODAL =====
var gatedUrl = '';
function gateContent(url) {
  gatedUrl = url;
  document.getElementById('gateModal').classList.add('open');
}
function closeGateAndOpen() {
  document.getElementById('gateModal').classList.remove('open');
  if (gatedUrl) { window.open(gatedUrl, '_blank'); }
  gatedUrl = '';
}
function closeGate() {
  document.getElementById('gateModal').classList.remove('open');
  gatedUrl = '';
}

// Init resource center on page show
function initResourceCenter() { filterResources(); }

// Auto-gate report insight links on the reports page
document.addEventListener('click', function(e) {
  var link = e.target.closest('.r-btn-insight');
  if (link) {
    var url = link.getAttribute('data-gate-url') || link.getAttribute('href');
    if (url && url !== '#') {
      e.preventDefault();
      link.setAttribute('data-gate-url', url);
      gateContent(url);
    }
  }
});

// ===== NAV SCROLL =====
window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
});

// ===== REVEAL =====
function initReveal() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
}
initReveal();

// ===== INIT =====
renderMethodList();
renderSkillsList();
renderTopics();
initResourceCenter();
