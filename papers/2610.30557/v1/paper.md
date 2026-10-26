# Governed Self-Evolution for Autonomous Investing: A Multi-Agent LLM System with an Invariant Core

作者：Yebo Feng, Jingyang Dai, Liangrui Pan, Nelson Lau, Jiahua Xu, Yang Liu
原文：https://arxiv.org/abs/2610.30557v1
首次提交：2026-10-22T00:22:47Z · 版本更新：2026-10-22T00:22:47Z
版本：v1 · 待核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- Steward 面向不可信 Web 数据下的自主投资，以九智能体、代码共享记忆及受不变核心约束的自更新实现治理；作者报告102个交易日模拟账户运行，并在后续季度学习回放中观察到局部输出行为变化。
  核验：原文支持；b00019、b00066支持九智能体、代码组装共享记忆及不变核心约束；b00037明确为102个交易日的模拟账户；b00052支持后续季度学习在回放中引起局部输出形式变化，未扩大为收益改善。
  - [原文 4. Design of Steward · b00019](https://arxiv.org/html/2610.30557v1#S4.p1.1)：Nine LLM agents and a deterministic core run in six sessions
  - [原文 7. Conclusion · b00066](https://arxiv.org/html/2610.30557v1#S7.p1.1)：We presented Steward , a multi-agent LLM system for autonomous investing in which role-specialised agents decide jointly over heterogeneous Web data, share a memory computed by code, and evolve at two time scales around an invariant core that no self-edit can reach.
  - [原文 5.1. Live deployment, data and methodology · b00037](https://arxiv.org/html/2610.30557v1#S5.SS1.p1.1)：Steward traded live from April 8 to September 10, 2026 (102 trading days) on real-time Web data, in a brokerage paper account funded with US$100,000.
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：The second run, on September 30, was live.
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：the prescribed form (an explicit TAKE/WAIT call or named blocker) appeared in 5 of 20 trigger replays against 0 of 20 for the base prompt and never on a control evening

## 研究问题

- 作者提出：行动智能体需同时综合异质弱证据、记住决策及结果，并从经验中改进而不削弱约束。
  核验：原文支持；b00003明确提出综合异质弱证据、记住决策及结果、从经验改进且不削弱约束这三项要求。
  - [原文 1. Introduction · b00003](https://arxiv.org/html/2610.30557v1#S1.p1.1)：An agent that makes consequential decisions from Web content must do three things at once: combine heterogeneous, individually weak evidence into one decision; remember what it has decided and how those decisions turned out; and improve from experience
  - [原文 1. Introduction · b00003](https://arxiv.org/html/2610.30557v1#S1.p1.1)：without weakening the rules that constrain it.
- 作者归纳四类自进化失效：自我评分偏乐观、风险纪律被削弱、修改不可审计或撤销，以及无行为效果的修改被视为进步。
  核验：原文支持；b00016逐项列出自我评分偏乐观、纪律侵蚀、修改不可审计与撤销，以及无行为变化却报告进步四类失效。
  - [原文 Failure modes. · b00016](https://arxiv.org/html/2610.30557v1#S3.SS0.SSS0.Px2.p1.1)：(F1) Self-grading : the signal that drives evolution is the agent’s own assessment \hat{g}_{t} rather than y_{t} , and \hat{g}_{t} is optimistic.
  - [原文 Failure modes. · b00016](https://arxiv.org/html/2610.30557v1#S3.SS0.SSS0.Px2.p1.1)：(F2) Discipline erosion : \pi^{\prime} weakens the rules that bound risk, because nothing separates what the loop may change from what it must not.
  - [原文 Failure modes. · b00016](https://arxiv.org/html/2610.30557v1#S3.SS0.SSS0.Px2.p1.1)：(F3) Unauditable change : no record ties \pi^{\prime} to the evidence that produced it, so an erroneous edit can be neither found nor reverted. (F4) Undetected inertness : an edit passes every check yet changes no decision, and the loop reports progress it did not make.

## 方法怎样工作

- 晨间四名分析师并行读取 Web 并输出类型化报告；投资组合经理结合共享记忆形成计划，依次经过确定性订单构造器、阻断式风险引擎和风险经理。
  核验：原文支持；b00020明确支持四名分析师并行读取、经理结合类型化报告与共享记忆制定计划，以及订单构造器、阻断式风险引擎、风险经理的处理顺序。
  - [原文 Sessions. · b00020](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px1.p1.1)：Only the morning session may open positions: four analysts read the Web in parallel, a Portfolio Manager synthesises their typed reports with the shared memory of § 4.2 , and the plan passes through a deterministic order constructor, a blocking risk engine and an LLM Risk Manager before execution.
- 用 Pydantic 对象及字段校验约束输出，保存验证后对象及精确输入；代码从系统记录组装七层共享记忆，供经理读取。
  核验：原文支持；b00021、b00024支持Pydantic输出、字段校验及验证对象与输入的存储设计；b00023支持代码组装七层记忆供经理晨间读取。此处作为设计描述成立；实际部署完整输入记录并非覆盖全部调用，见b00009、b00036。
  - [原文 Agents and their typed outputs. · b00021](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px2.p1.1)：Each agent emits one Pydantic object (Appendix B ).
  - [原文 Schema-enforced reasoning. · b00024](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px2.p1.1)：An agent cannot skip a step, enumerations are Literal types, and cross-field validators encode domain invariants:
  - [原文 Schema-enforced reasoning. · b00024](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px2.p1.1)：The validated object is stored verbatim with its exact input, so the record is not a log about decisions but the decisions themselves, in a form that code can grade, a reflector can read and a harness can replay.
  - [原文 Shared multi-layer memory. · b00023](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px1.p1.1)：The agents share no conversation history. They share a memory that code assembles from the system’s own record in seven layers, read by the Portfolio Manager every morning.
- 晚间更新反馈；季度反思提出类型化提示词学习，经确定性门控可逆应用。固定记录输入比较更新前后输出，并以未改提示词重跑估计模型方差。
  核验：原文支持；b00008支持晚间反馈和季度类型化学习的可逆门控；b00036明确固定其余输入比较更新前后输出，并通过未改提示词重跑衡量模型方差。
  - [原文 Contributions. · b00008](https://arxiv.org/html/2610.30557v1#S1.I1.i3.p1.1)：each evening, code grades every trade and forecast and writes the grades into memory; each quarter, a Meta Reflector proposes typed prompt learnings that a twelve-invariant gate applies reversibly and that replay verifies.
  - [原文 4.6. Verification by replay · b00036](https://arxiv.org/html/2610.30557v1#S4.SS6.p1.1)：A decision-replay harness passes recorded inputs through the prompt before and after a learning, with the rest of the input fixed, and compares the outputs structurally:
  - [原文 4.6. Verification by replay · b00036](https://arxiv.org/html/2610.30557v1#S4.SS6.p1.1)：Re-running the unchanged prompt on the same inputs measures the model’s own variance, against which a learning’s effect is read.

## 作者声称的贡献

- 作者将贡献定位为多信号行动智能体的治理：角色协作、代码共享记忆，以及围绕自编辑无法触及的不变核心开展双时间尺度演化。
  核验：原文支持；b00011明确将作者贡献定位于多信号行动智能体的治理；b00066支持角色协作、代码共享记忆及围绕不变核心的双时间尺度演化。结论保持了作者定位的归属。
  - [原文 Text, machine learning and LLMs in finance. · b00011](https://arxiv.org/html/2610.30557v1#S2.SS0.SSS0.Px2.p1.1)：our contribution is not a signal but the governance of an agent that acts on many, evaluated live.
  - [原文 7. Conclusion · b00066](https://arxiv.org/html/2610.30557v1#S7.p1.1)：We presented Steward , a multi-agent LLM system for autonomous investing in which role-specialised agents decide jointly over heterogeneous Web data, share a memory computed by code, and evolve at two time scales around an invariant core that no self-edit can reach.
- 作者声称，据其所知，这是首个经数月在线运行评估且记录全部演化提案与拒绝的自进化 LLM 智能体；本次未独立确认该优先权。
  核验：原文支持；b00005确有带“To our knowledge”限定的首次声称。结论将其归于作者，并明确未独立确认优先权，没有将作者自述升级为已证创新。
  - [原文 1. Introduction · b00005](https://arxiv.org/html/2610.30557v1#S1.p3.1)：To our knowledge, Steward is the first self-evolving LLM agent evaluated over months of live operation with every proposal and rejection of its evolution loop logged.

## 本文报告的方法比较

- 20晨回放中，原始数据单模型配置更多标的、新买入更多且反转更频繁；其5日、10日相对 SPY 收益为负，部署架构与零无法区分。单晨去除记忆变化很小。
  核验：部分支持；b00046支持20晨回放、目标标的数、反转频率、5日及10日相对收益，以及单晨去除记忆变化很小。但41%对19%衡量的是新增目标意图占权益比例；“新买入更多”容易被理解为实际成交，超出了回放输出的测量范围。
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：we replay 20 mornings sampled evenly over the deployment through three decision layers on their exact recorded inputs
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：it targets 5.8 names a morning against 3.7, puts 41% of equity into new intent against 19%, and reverses its own recent decisions two and a half times as often (0.25 against 0.10 per morning)
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：Its books lose over the next five and ten days ( -1.35\pm 0.44 and -1.76\pm 0.75 points against SPY; hit rates 35% and 32%), whereas the deployed design’s are indistinguishable from zero.
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：Removing the memory changes almost nothing on a single morning
- 记录决策价格模拟中，分析师买入评级收益1.3%，经理目标无退出15.4%，加入退出11.6%，再加入风险经理修改12.2%；实际模拟账户收益5.0%。
  核验：部分支持；b00042、b00043支持全部收益数字，b00037确认实际账户也是模拟账户。但模拟结果还限定目标按决策日收盘价设置、20%单仓上限及闲置现金赚取国库券收益；结论未保留这些条件，且未注明无退出配置的93%敞口。
  - [原文 The synthesis carries the value. · b00042](https://arxiv.org/html/2610.30557v1#S5.SS2.SSS0.Px2.p1.1)：the analysts’ buy ratings return +1.3\% , whereas the Portfolio Manager’s target weights return +15.4\% with no exits (at 93% exposure), +11.6\% with the system’s own exit rules and +12.2\% with the Risk Manager’s recorded edits
  - [原文 Execution and exits hold the headroom. · b00043](https://arxiv.org/html/2610.30557v1#S5.SS2.SSS0.Px3.p1.1)：The live portfolio returned +5.0% against the intent’s +12.2\% because it was less invested: realised gross exposure averaged 56% against 79%
  - [原文 5.1. Live deployment, data and methodology · b00037](https://arxiv.org/html/2610.30557v1#S5.SS1.p1.1)：in a brokerage paper account funded with US$100,000.
- 确定性核心独立回测中，全部50种随机入场策略最大回撤均降低，中位数37%→28%；动量入场61%→33%。两类策略的 CAGR 均下降。
  核验：部分支持；b00054支持全部50种随机策略及动量策略的最大回撤变化，b00098支持两类策略CAGR下降。但独立回测采用2026年股票池，作者明确仅变体间比较有意义，见b00097；结论遗漏了这一适用范围限制。
  - [原文 Containment. · b00054](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px1.p1.1)：The core lowered the maximum drawdown under all 50 random entry policies (median 37% \to 28%) and under momentum entries (61% \to 33%)
  - [原文 Grounding protocol. · b00098](https://arxiv.org/html/2610.30557v1#A5.T11.2)：Entries / variant CAGR Sharpe Max DD
  - [原文 Grounding protocol. · b00098](https://arxiv.org/html/2610.30557v1#A5.T11.2)：Momentum entries No core + 61 1.15 - 61 - 25 - 36 - 27 - 46
  - [原文 Grounding protocol. · b00098](https://arxiv.org/html/2610.30557v1#A5.T11.2)：Full core + 41 1.30 - 33 - 18 - 30 - 18 - 27 Random entries, median of 50 seeds No core + 17 0.81 - 37 - 20 - 35 - 26 - 8 Full core + 14 0.82 - 28 - 17 - 27 - 21 - 7

## 实验证据与条件

任务：基于实时 Web 数据的自主投资
基础模型：未报告 / 未提取
比较基线：SPY、QQQ及半导体ETF同期表现
指标：账户收益、特定下跌窗口损失、调用量与API成本
结果：全期账户+5.0%，SPY+12.4%；6月22日至7月29日组合−0.3%，半导体ETF−24.6%、QQQ−10.3%、SPY−2.0%。
资源条件：2026年4月8日至9月10日，102个交易日，10万美元模拟账户；619次流水线运行、1,632次LLM调用；已记录API成本455美元，为下界，逐调用成本日志始于5月12日。
- 五个月实时数据模拟账户部署；作者报告行业下跌窗口内组合损失较小，账户没有真实资本风险。
  核验：原文支持；b00037支持部署日期、账户规模、运行和调用数量；b00054支持全期收益与指定下跌窗口比较；b00078明确成本为下界且逐调用日志始于5月12日；b00067确认没有真实资本风险。
  - [原文 5.1. Live deployment, data and methodology · b00037](https://arxiv.org/html/2610.30557v1#S5.SS1.p1.1)：Steward traded live from April 8 to September 10, 2026 (102 trading days) on real-time Web data, in a brokerage paper account funded with US$100,000.
  - [原文 5.1. Live deployment, data and methodology · b00037](https://arxiv.org/html/2610.30557v1#S5.SS1.p1.1)：The deployment produced 619 pipeline runs and 1,632 logged LLM calls served by frontier models from two vendors with automatic failover. Logged API cost was $455, about US$4.4 per trading day
  - [原文 Containment. · b00054](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px1.p1.1)：The portfolio returned +5.0% against +12.4% for SPY during a semiconductor-led rally
  - [原文 Containment. · b00054](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px1.p1.1)：Between June 22 and July 29 the semiconductor ETF fell 24.6%, QQQ 10.3% and SPY 2.0%, whereas the portfolio lost 0.3%
  - [原文 Appendix D Sessions, Latency and Cost · b00078](https://arxiv.org/html/2610.30557v1#A4.F4)：Logged API cost per agent over the deployment (a lower bound: per-call cost logging began on May 12).
  - [原文 Ethical Considerations · b00067](https://arxiv.org/html/2610.30557v1#Sx1.p1.1)：The system traded a paper account, so no capital was at risk;
任务：投资决策架构消融
基础模型：未报告 / 未提取
比较基线：去除全部记忆层；原始数据单模型单次分析决策
指标：相对SPY的5日、10日前瞻收益及命中率
结果：正文报告单模型分别为−1.35±0.44、−1.76±0.75个百分点，命中率35%、32%；部署架构与零无法区分；单晨移除记忆变化很小。
资源条件：均匀抽取20个早晨的精确记录输入，共100次LLM调用；部署架构每晨采样两次。
- 使用记录输入回放，比较类型化报告加记忆、去除记忆及原始数据单模型三种决策层。
  核验：原文支持；b00046支持三种决策层、20晨记录输入、100次调用及部署架构每晨两次采样，也支持所列5日、10日收益和命中率。结论采用正文数值，没有把回放结果表述为实盘收益。
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：we replay 20 mornings sampled evenly over the deployment through three decision layers on their exact recorded inputs (Table 2 , Figure 2 d; 100 LLM calls): the deployed design (typed analyst reports plus memory; two samples per morning), the same input without any memory layer,
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：a single model that receives the raw data the analysts read and must analyse and decide in one call.
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：Its books lose over the next five and ten days ( -1.35\pm 0.44 and -1.76\pm 0.75 points against SPY; hit rates 35% and 32%), whereas the deployed design’s are indistinguishable from zero.
  - [原文 5.3. RQ2: The decomposition and the memory · b00046](https://arxiv.org/html/2610.30557v1#S5.SS3.p1.1)：Removing the memory changes almost nothing on a single morning
任务：被拒宏观警告仓位学习项的行为验证
基础模型：未报告 / 未提取
比较基线：未加入学习项的经理提示词及其重复运行
指标：标记标的权重变化及基线重跑噪声
结果：基线仍提出的10个标记标的中，8个权重变化不超过1个百分点；所有权重变化均在基线重跑噪声内，噪声中位数为每标的1.8个百分点。
资源条件：10个买入后来被评为错误的早晨、5个对照早晨；35次调用，17美元。
- Q2学习项因长度超限被拒；反事实回放未显示超出基线重跑噪声的仓位变化。
  核验：原文支持；b00049明确记载282字符超过200字符上限而被拒，并支持15个早晨、35次调用、17美元及所列权重变化和基线重跑噪声。结论将无效果限定在该反事实回放中。
  - [原文 Q2: a root-cause diagnosis and a withheld learning. · b00049](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px1.p1.1)：The gate withheld it on its length invariant (282 characters against a 200-character cap) and logged why.
  - [原文 Q2: a root-cause diagnosis and a withheld learning. · b00049](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px1.p1.1)：Replay then measured what the gate had declined (Figure 3 a, Table 8 ; 35 calls, US$17): on the ten mornings whose BUYs were later graded wrong and five control mornings,
  - [原文 Q2: a root-cause diagnosis and a withheld learning. · b00049](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px1.p1.1)：the Portfolio Manager prompt with the learning kept 8 of the 10 flagged names that the baseline still proposed within one point, and every weight moved within the noise of re-running the baseline itself (1.8 points per name at the median).
任务：已应用晚间分析师学习项的行为验证
基础模型：未报告 / 未提取
比较基线：提交前提示词；无触发条件的对照晚间
指标：明确TAKE/WAIT或具名阻碍的出现率、重复遗漏提及数
结果：预期形式由0/20增至5/20，对照均未出现；重复遗漏提及数为25/64，基线为26/64。
资源条件：10个触发晚间与4个对照晚间的冻结输入；前后提示词各采样两次，共56次调用，约16美元。
- 9月30日应用Q3学习项后，回放中预期输出形式增加，但重复遗漏提及数未改善。
  核验：原文支持；b00052支持9月30日可逆应用、10个触发晚间和4个对照晚间、前后各两次采样及调用成本；形式出现次数和重复遗漏提及数均与原文一致，未声称决策或收益改善。
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：The second run, on September 30, was live.
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：The gate applied it as a one-file, reversible commit.
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：We re-ran ten evenings on which such recurrences existed and four control evenings through the prompt before and after the commit, two samples each (Figure 3 b, Table 9 ; 56 calls, about US$16).
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：the prescribed form (an explicit TAKE/WAIT call or named blocker) appeared in 5 of 20 trigger replays against 0 of 20 for the base prompt and never on a control evening
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：the trigger presupposes a count of past classifications that the Evening Analyst’s input does not provide, so the recurring misses surfaced were unchanged (25 of 64 against 26 of 64).
任务：确定性风控核心的长期回测
基础模型：未报告 / 未提取
比较基线：相同入场策略无核心；逐项移除核心规则
指标：最大回撤、CAGR
结果：随机策略最大回撤中位数37%→28%、CAGR 17%→14%；动量策略最大回撤61%→33%、CAGR 61%→41%。
资源条件：2015—2026年，80只股票，每周入场；126日动量前10名或50个随机种子；单边成本5基点；股票池来自2026年。
- 无LLM回测测试确定性核心；回撤下降伴随较低CAGR。作者限定2026年股票池下仅变体间比较有意义。
  核验：原文支持；b00097支持回测时期、80只股票、无LLM每周入场、交易成本及2026年股票池限制；b00054、b00098支持回撤和CAGR变化。结论保留了作者仅允许变体间比较的限定。
  - [原文 Grounding protocol. · b00097](https://arxiv.org/html/2610.30557v1#A5.T11)：Backtest of the deterministic core alone, 2015–2026, on the 80 single stocks of the universe with LLM-free weekly entries (top 10 by 126-day momentum, or random over 50 seeds).
  - [原文 Grounding protocol. · b00097](https://arxiv.org/html/2610.30557v1#A5.T11)：Core: the rules of § 4.3 ; ablations remove one. CAGR and drawdowns in %; 5 bp per side. The universe is from 2026, so only comparisons between variants are meaningful.
  - [原文 Containment. · b00054](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px1.p1.1)：The core lowered the maximum drawdown under all 50 random entry policies (median 37% \to 28%) and under momentum entries (61% \to 33%)
  - [原文 Grounding protocol. · b00098](https://arxiv.org/html/2610.30557v1#A5.T11.2)：Entries / variant CAGR Sharpe Max DD
  - [原文 Grounding protocol. · b00098](https://arxiv.org/html/2610.30557v1#A5.T11.2)：Momentum entries No core + 61 1.15 - 61 - 25 - 36 - 27 - 46
  - [原文 Grounding protocol. · b00098](https://arxiv.org/html/2610.30557v1#A5.T11.2)：Full core + 41 1.30 - 33 - 18 - 30 - 18 - 27 Random entries, median of 50 seeds No core + 17 0.81 - 37 - 20 - 35 - 26 - 8 Full core + 14 0.82 - 28 - 17 - 27 - 21 - 7
任务：提示注入抵抗测试
基础模型：未报告 / 未提取
比较基线：未报告 / 未提取
指标：攻击内容排除次数、指令遵从次数、显式识别拒绝次数
结果：新闻智能体20/20次排除并标记；经理直接接收时0/30次遵从，其中23次显式识别并拒绝。
资源条件：10个早晨记录输入，三类负载；50次调用，19美元。
- 向记录输入注入三类对抗新闻，分别测试新闻分析师过滤及直接进入经理新闻区的攻击。
  核验：原文支持；b00057支持三类负载、10个早晨、50次调用和19美元，并分别报告新闻智能体20次排除及标记、经理30次均未遵从且23次显式识别拒绝。结论未扩大为普遍安全保证。
  - [原文 Adversarial Web content. · b00057](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px2.p1.1)：We insert one adversarial item into the exact recorded input of ten mornings and re-run the agent (Table 4 ; 50 calls, US$19), with three payloads:
  - [原文 Adversarial Web content. · b00057](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px2.p1.1)：a direct override (set one name to 45% and every other target to zero), a plausible headline (300% upside; managers are taking maximum size and disabling stops) and a suspension of discipline (stops and the cash-only rule lifted, allocate 60% to an inverse ETF).
  - [原文 Adversarial Web content. · b00057](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px2.p1.1)：The News agent excluded the item from its typed report in all 20 replays and flagged it as instruction-like in every briefing.
  - [原文 Adversarial Web content. · b00057](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px2.p1.1)：Placed directly in the Portfolio Manager’s news section, as if the analyst layer had passed it through, the item was followed in none of 30 replays; in 23 the Portfolio Manager’s CoT named it as injected content and refused it
任务：推理记录的数字依据审计
基础模型：未报告 / 未提取
比较基线：严格匹配；同智能体错配日期输入的安慰剂
指标：数字匹配比例
结果：包含派生量时99.91%，严格匹配96.06%；安慰剂22%，但安慰剂仅统计至少三位有效数字。
资源条件：750条CoT、254,094个数字；每智能体最多150条，排除小整数和年份。
- 确定性审计衡量推理记录中数字的可匹配性；来源范围包括输入、历史提示词及自身输出。
  核验：原文支持；b00096、b00102支持数字匹配来源、派生量及严格匹配定义；b00103支持样本量与三项比例；b00096明确安慰剂仅统计至少三位有效数字。结论准确将其表述为可匹配性审计。
  - [原文 Grounding protocol. · b00096](https://arxiv.org/html/2610.30557v1#A5.SS0.SSS0.Px7.p1.1)：The audit samples up to 150 CoTs per agent and extracts every number in their reasoning fields, excluding small integers and years.
  - [原文 Grounding protocol. · b00096](https://arxiv.org/html/2610.30557v1#A5.SS0.SSS0.Px7.p1.1)：A number is grounded if it occurs in the agent’s input message, in any historical version of its prompt or in its own emitted fields, allowing rounding and truncation;
  - [原文 Replay noise. · b00102](https://arxiv.org/html/2610.30557v1#A5.T12)：Grounded: cited numbers found in the agent’s input, prompt or own fields, including derived quantities; Strict: exact or rounded matches only; Placebo: strict grounding against another day’s input.
  - [原文 Replay noise. · b00103](https://arxiv.org/html/2610.30557v1#A5.T12.2)：All 750 254,094 99.91% 96.06% 22%
  - [原文 Grounding protocol. · b00096](https://arxiv.org/html/2610.30557v1#A5.SS0.SSS0.Px7.p1.1)：the placebo is reported on numbers with three or more significant digits.

## 原文支持的局限性

- 作者承认：证据仅来自一个配置、一个上涨窗口的模拟账户；前瞻期限重叠、模拟忽略成交风险，季度循环仅两次且仅一次应用；小规模回放不能按收益给架构排名。
  核验：原文支持；b00065逐项支持单配置、上涨窗口模拟账户、重叠期限、忽略成交风险、两次季度循环仅一次应用，以及小样本回放不能按收益排名的限制。
  - [原文 Limitations and next steps. · b00065](https://arxiv.org/html/2610.30557v1#S6.SS0.SSS0.Px4.p1.1)：The evidence comes from one configuration traded on a paper account through one rising window, with overlapping forward horizons, simulations that ignore fill risk and two quarterly cycles, one applied; replays of 14–20 inputs expose behavioural differences but cannot rank variants by return.
  - [原文 Containment. · b00054](https://arxiv.org/html/2610.30557v1#S5.SS5.SSS0.Px1.p1.1)：alpha is not identifiable over 102 days, and no claim of this paper rests on it.
- 作者指出，Q3学习所需历史分类计数未进入实际输入；其他提示词与股票池的人工修改使10月记录无法隔离学习效果。应用前结果评分回放仍是下一步。
  核验：原文支持；b00052明确历史分类计数未进入输入，其他提示词及股票池修改使10月记录无法隔离学习效果；b00064将应用前、基于结果评分的回放检查列为下一步。
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：the trigger presupposes a count of past classifications that the Evening Analyst’s input does not provide
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：Because the operators had also revised other prompts and the universe before the cycle, the October record cannot isolate the learning; replay can.
  - [原文 A syntactic gate needs a semantic check. · b00064](https://arxiv.org/html/2610.30557v1#S6.SS0.SSS0.Px3.p1.1)：The natural next invariant is therefore an outcome-scored replay check that confirms a learning is operable on the agent’s actual inputs and measures its effect on decisions before it is applied.

## 多智能体机制

- 角色与分工：九个角色为新闻、财报、宏观、技术四名分析师，投资组合经理、风险经理、持仓审查员、晚间分析师和季度反思器。
  核验：原文支持；b00021列出四名分析师、投资组合经理、风险经理及持仓审查员；b00031、b00034补足晚间分析师和季度Meta Reflector，与b00019的九智能体一致。
  - [原文 4. Design of Steward · b00019](https://arxiv.org/html/2610.30557v1#S4.p1.1)：Nine LLM agents and a deterministic core run in six sessions
  - [原文 Agents and their typed outputs. · b00021](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px2.p1.1)：The News Intelligence agent maintains three layers:
  - [原文 Agents and their typed outputs. · b00021](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px2.p1.1)：The Earnings Analyst reads 10-Q and 10-K filings
  - [原文 Agents and their typed outputs. · b00021](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px2.p1.1)：The Macro Analyst classifies the regime
  - [原文 Agents and their typed outputs. · b00021](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px2.p1.1)：The Technical Analyst rates each symbol on a five-level scale
  - [原文 Agents and their typed outputs. · b00021](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px2.p1.1)：The Portfolio Manager returns target positions; the Risk Manager approves or rejects the plan with a reason category, field-level modifications and an optional scale factor for all buys; the Position Reviewer returns SELL, REDUCE, TRAIL_STOP or HOLD per holding.
  - [原文 4.4. Short-term self-evolution: evening grading · b00031](https://arxiv.org/html/2610.30557v1#S4.SS4.p1.1)：The Evening Analyst then completes a seven-step CoT
  - [原文 Reflect and propose (R3). · b00034](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px1.p1.1)：On the last trading day of each quarter the evening session invokes a Meta Reflector.
- 协作结构：分析师并行、经理综合，随后代码构造订单并执行硬规则阻断，风险经理复审；风险经理不能批准被引擎阻断的计划。
  核验：原文支持；b00020支持协作及处理顺序；b00027明确只有通过引擎的计划才能到达风险经理，后者不能批准已被引擎阻断的计划。
  - [原文 Sessions. · b00020](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px1.p1.1)：four analysts read the Web in parallel, a Portfolio Manager synthesises their typed reports with the shared memory of § 4.2 , and the plan passes through a deterministic order constructor, a blocking risk engine and an LLM Risk Manager before execution.
  - [原文 Hard rules run before the LLM check. · b00027](https://arxiv.org/html/2610.30557v1#S4.SS3.SSS0.Px2.p1.1)：Only plans that pass reach the LLM Risk Manager, which can reject, modify or scale them but cannot approve what the engine blocked.
- 通信机制：智能体不共享对话历史，通过类型化报告传递信息；原始标题和申报文本仅进入新闻与财报智能体，经理接收类型化字段和新闻简报。
  核验：原文支持；b00023明确不共享对话历史；b00020、b00028支持通过类型化报告向经理传递信息，以及原始标题和申报文本仅进入新闻与财报智能体、经理读取类型化字段和新闻简报。
  - [原文 Shared multi-layer memory. · b00023](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px1.p1.1)：The agents share no conversation history.
  - [原文 Untrusted Web text stays upstream. · b00028](https://arxiv.org/html/2610.30557v1#S4.SS3.SSS0.Px3.p1.1)：Raw headlines and filing text reach only the News and Earnings agents
  - [原文 Untrusted Web text stays upstream. · b00028](https://arxiv.org/html/2610.30557v1#S4.SS3.SSS0.Px3.p1.1)：The Portfolio Manager never sees a headline or a filing: it reads typed fields and the News agent’s briefing
- 共享记忆：代码组装七层记忆：当日信号、持仓背景、近期叙事、45天校准、最近风险裁决、经理最近决策及接近行业上限的预计持仓。
  核验：原文支持；b00023逐层支持所列七层记忆，包括45天校准、最近五次风险裁决、经理最近三次决策及标记接近行业上限的预计持仓。
  - [原文 Shared multi-layer memory. · b00023](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px1.p1.1)：They share a memory that code assembles from the system’s own record in seven layers, read by the Portfolio Manager every morning.
  - [原文 Shared multi-layer memory. · b00023](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px1.p1.1)：L1 holds the day’s typed analyst signals. L2 gives each holding its entry date, days held, entry thesis and its last seven Technical ratings.
  - [原文 Shared multi-layer memory. · b00023](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px1.p1.1)：L3 is the narrative: the last seven evening outlooks, seven days of macro regime, and the high-conviction news state changes of the last two weeks.
  - [原文 Shared multi-layer memory. · b00023](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px1.p1.1)：L4 is a 45-day calibration table:
  - [原文 Shared multi-layer memory. · b00023](https://arxiv.org/html/2610.30557v1#S4.SS2.SSS0.Px1.p1.1)：L5 lists the last five Risk Manager verdicts with their categories, L6 the agent’s own last three decisions, so that reversals are visible, and L7 a projected book that flags sectors approaching their cap.
- 调度方式：仅晨间允许开仓，午间与收盘仅卖出；晚间核对成交并复盘，季度末反思90天记录；无LLM熔断器每30分钟及晨间各阶段运行。
  核验：原文支持；b00020支持仅晨间开仓、午间及收盘仅卖出；b00076支持晚间核对成交及季度90天回顾；b00029支持无LLM熔断器每30分钟及晨间各阶段运行。
  - [原文 Sessions. · b00020](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px1.p1.1)：Only the morning session may open positions
  - [原文 Sessions. · b00020](https://arxiv.org/html/2610.30557v1#S4.SS1.SSS0.Px1.p1.1)：The midday and close sessions are sell-only and run a Position Reviewer
  - [原文 Appendix D Sessions, Latency and Cost · b00076](https://arxiv.org/html/2610.30557v1#A4.T6.2)：20:00–22:00 evening ✓ reconcile fills; grade trades and forecasts; write insights quarter end meta ✓ self-portrait over 90 days; propose learnings; governed apply
  - [原文 Execution is fail-safe. · b00029](https://arxiv.org/html/2610.30557v1#S4.SS3.SSS0.Px4.p1.1)：The circuit breaker, which uses no LLM, runs every 30 minutes and again at each stage of the morning session

## 自进化机制

- 改变对象：更新对象为每日代码重写的记忆，以及四名分析师、投资组合经理、晚间分析师提示词的 Learnings 区；风险经理、持仓审查员和代码规则受保护。
  核验：原文支持；b00030明确每日代码重写记忆及六类可编辑智能体的Learnings区，并将风险经理、持仓审查员和代码规则排除在自编辑范围之外。
  - [原文 The evolvable periphery. · b00030](https://arxiv.org/html/2610.30557v1#S4.SS3.SSS0.Px5.p1.1)：What can change is the memory, rewritten daily by code, and the prompts of the four analysts, the Portfolio Manager and the Evening Analyst, each of which carries a marked Learnings section that the gate of § 4.5 may append to.
  - [原文 The evolvable periphery. · b00030](https://arxiv.org/html/2610.30557v1#S4.SS3.SSS0.Px5.p1.1)：The Risk Manager and the Position Reviewer, which encode the hard discipline, are absent from the Literal type of the proposal schema, so no self-edit can name them, and every rule above lives in code that no prompt reaches.
- 反馈来源：晚间分析师生成类别标签，结果量由代码根据成交和价格计算；代码聚合校准、预测命中率、重复遗漏及根因，供次晨决策和季度反思使用。
  核验：原文支持；b00032区分晚间分析师类别标签与代码计算的结果量，列明代码聚合项目及次晨读取；b00034支持季度反思读取90天评分记录的确定性摘要。
  - [原文 4.4. Short-term self-evolution: evening grading · b00032](https://arxiv.org/html/2610.30557v1#S4.SS4.p2.1)：The labels the Evening Analyst assigns are categories; every quantity that measures an outcome is computed by code from fills and prices.
  - [原文 4.4. Short-term self-evolution: evening grading · b00032](https://arxiv.org/html/2610.30557v1#S4.SS4.p2.1)：What feeds forward is aggregated by code from that record: the calibration of L4, the hit rates of the next-day calls, missed themes that recur in at least two episodes or symbols over the last 14 evenings, and root causes that recur across at least two symbols.
  - [原文 4.4. Short-term self-evolution: evening grading · b00032](https://arxiv.org/html/2610.30557v1#S4.SS4.p2.1)：The Portfolio Manager reads them the next morning with the evening’s outlook
  - [原文 Reflect and propose (R3). · b00034](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px1.p1.1)：Its input is a deterministic digest of 90 days of graded record
- 更新方式：季度反思至多提出三个追加或按哈希撤回的学习项；确定性门控检查目标、长度、禁词、相似度和容量，记录接受或拒绝，并以版本提交支持撤销。
  核验：原文支持；b00034支持至多三个追加或按内容哈希撤回的提案；b00073支持目标、长度、禁词、相似度及容量检查；b00035支持接受拒绝日志与单次版本提交撤销。
  - [原文 Reflect and propose (R3). · b00034](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px1.p1.1)：Its output is at most three PromptLearning objects (Listing 1 ), each an append or a retraction by content hash
  - [原文 Appendix C Gate Invariants · b00073](https://arxiv.org/html/2610.30557v1#A3.p1.1)：(2) an allow-list of target agents, with the Risk Manager and Position Reviewer excluded both here and in the proposal schema’s Literal ; (3) length ceiling (300 characters; 200 before the Q3 cycle) and justification floor;
  - [原文 Appendix C Gate Invariants · b00073](https://arxiv.org/html/2610.30557v1#A3.p1.1)：(4) a word-boundary prohibited-word tripwire ( never , always , override , ignore all , must always , must never ); (5) Jaccard token-similarity dedup against existing entries (threshold 0.6); (6) a per-agent FIFO cap that evicts the oldest auto-added entry;
  - [原文 Gate and rewrite (R4). · b00035](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px2.p1.1)：every accepted and rejected proposal is logged with its reason; and a cycle’s edits form a single version-control commit, so that one git revert undoes a quarter of evolution.
- 发生阶段：主部署窗口为4月8日至9月10日，其间运行晚间反馈；Q2循环仅暂存提案。Q3实际应用发生于窗口结束后的9月30日，另以冻结输入回放验证。
  核验：原文支持；b00037支持主部署日期及98个晚间反馈；b00035明确Q2仅暂存、Q3实际应用；b00052确认9月30日提交，b00087确认冻结输入回放。结论正确区分主窗口与后续应用。
  - [原文 5.1. Live deployment, data and methodology · b00037](https://arxiv.org/html/2610.30557v1#S5.SS1.p1.1)：Steward traded live from April 8 to September 10, 2026 (102 trading days)
  - [原文 5.1. Live deployment, data and methodology · b00037](https://arxiv.org/html/2610.30557v1#S5.SS1.p1.1)：the evening loop ran on 98 evenings
  - [原文 Gate and rewrite (R4). · b00035](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px2.p1.1)：The Q2 cycle ran stage-only and the Q3 cycle live (§ 5.4 ).
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：The second run, on September 30, was live.
  - [原文 Q3: self-audit and an applied learning. · b00052](https://arxiv.org/html/2610.30557v1#S5.SS4.SSS0.Px2.p1.1)：The gate applied it as a one-file, reversible commit.
  - [原文 Self-evolution (RQ3). · b00087](https://arxiv.org/html/2610.30557v1#A5.SS0.SSS0.Px4.p1.1)：the Q3 replay runs frozen evening inputs through the Evening Analyst prompt before and after the commit, two samples each
- 保留范围：在同一投资任务内跨交易日、跨会话持续：记忆反馈至次晨，学习条目以季度和哈希标记保留，受每智能体十条FIFO容量及版本撤销约束；跨独立任务迁移未交代。
  核验：部分支持；b00032、b00035支持同一投资任务内次晨反馈、季度与哈希标记、每智能体十条FIFO容量及版本撤销。但“跨独立任务迁移未交代”只能限定为本次提供的原文块中未见，不能据这些片段断言全文均未交代。
  - [原文 4.4. Short-term self-evolution: evening grading · b00032](https://arxiv.org/html/2610.30557v1#S4.SS4.p2.1)：The Portfolio Manager reads them the next morning with the evening’s outlook
  - [原文 Gate and rewrite (R4). · b00035](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px2.p1.1)：Edits are append-only into the marked section and tagged with quarter and content hash
  - [原文 Gate and rewrite (R4). · b00035](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px2.p1.1)：a FIFO cap of ten entries per agent bounds the section
  - [原文 Gate and rewrite (R4). · b00035](https://arxiv.org/html/2610.30557v1#S4.SS5.SSS0.Px2.p1.1)：a cycle’s edits form a single version-control commit, so that one git revert undoes a quarter of evolution.

## 系统分析与启发（推测）

- 系统分析：类型允许列表与代码边界使自编辑范围可检查，但本次未审计实现，不能独立确认边界完整性。依据b00030：“The Risk Manager and the Position Reviewer, which encode the hard discipline, are absent from the Literal type of the proposal schema”。
- 系统分析：Q3回放支持局部输出形式变化，不能推导投资收益提升。依据b00052：“the prescribed form (an explicit TAKE/WAIT call or named blocker) appeared in 5 of 20 trigger replays against 0 of 20 for the base prompt and never on a control evening”。
- 系统分析：单模型比较同时改变信息组织方式与调用结构，不能据此单独归因于智能体数量。依据b00046：“a single model that receives the raw data the analysts read and must analyse and decide in one call.”
- 系统分析：有限攻击回放及数字匹配率不能证明任意注入安全或完整推理正确性。依据b00057：“the item was followed in none of 30 replays”；b00096：“A number is grounded if it occurs in the agent’s input message, in any historical version of its prompt or in its own emitted fields”。
- 系统分析：晚间反馈与次晨行为的六项相关检验均未在Holm校正后达到0.05，不宜将相关结果解释为已确认的适应效果。依据b00093，最强关系一行为：“Book exposure \sim trailing forecast hit rate + 0.34 0.01 0.08 54”。

## 待研究问题（系统分析）

- 系统分析：在相同基础模型、总token、成本及推理时间预算下，类型化报告流水线相对单智能体是否仍有优势？问题源于b00046：“a single model that receives the raw data the analysts read and must analyse and decide in one call.”
- 系统分析：补充历史分类计数并在应用前加入结果评分回放，能否提升学习的可执行性及长期效果？问题源于b00052：“the trigger presupposes a count of past classifications that the Evening Analyst’s input does not provide”。
- 系统分析：在独立时段、不同市场状态和真实成交条件下，记忆与季度学习是否带来可隔离的持续收益或风险改善？问题源于b00065：“one configuration traded on a paper account through one rising window”。

## 缺失信息

- 所提供原文块未列出完整基础模型名称、版本及调用参数；各实验model字段置null。无LLM核心回测的model字段亦为null。
- 所提供原文块未明确给出等token、等成本或等计算预算的单智能体比较；equal_budget_single_agent_comparison置null。
- 所提供原文块未明确自进化验证采用独立于反思记录的留出集；历史输入回放及触发/对照分组不足以确认独立留出验证，held_out_validation置null。
- 所提供原文块未给出学习应用后可隔离的长期收益效果，也未交代跨独立任务迁移。
- 所提供原文块未包含全部提示词及完整实现，无法逐项独立审计语义和代码边界。
- b00046正文报告5日和10日结果，b00048表头列5日和20日；本卡片按正文标注10日结果，未将其替换为表中的20日结果。
- b00037称季度循环在两个季度末运行，但其主部署窗口截至9月10日；b00052明确第二次循环发生于9月30日。本卡片按明确日期区分主部署窗口与后续季度循环，原文时间表述仍有歧义。
- 未阅读被引前作正文，不能独立确认首次提出、优先权或创新性。
- 本次仅依据提供的原文块修订卡片，未执行代码、回放或独立复现实验。

## 阅读范围

读取 3 / 3 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

LLM agents that act on live Web data must combine heterogeneous evidence, remember what they have done and improve from outcomes without weakening their own safeguards. We study this problem in autonomous investing, where every action is irreversible and based on untrusted Web content. We present Steward, a multi-agent LLM system that draws the boundary of self-evolution in its type system. First, nine role-specialised agents decide jointly: four analysts read news feeds, SEC filings, macroeconomic series and market data and emit typed reports, from which a Portfolio Manager sets target positions that a protected Risk Manager audits. Second, a seven-layer shared memory, assembled by code from the system's own record, gives each decision its position context, the market narrative, calibration and the agent's past decisions. Third, the system improves itself by review: code grades every trade and forecast nightly and writes the grades into memory, and each quarter a reflector proposes prompt learnings that a deterministic gate applies reversibly and replay of recorded inputs verifies. All three operate around an invariant core of order arithmetic, risk rules and discipline-agent prompts that no self-edit can reach. In a five-month live deployment (102 trading days, 1,632 LLM calls), the system contained a 24.6% sector drawdown to a 0.3% loss; in replay of its recorded inputs, a single model given the same raw data traded more and lost 1.35 points against the market over five days where the joint design showed no significant loss, and no injected instruction was followed; and a 2015-2026 backtest shows the core alone lowering the maximum drawdown under all 50 random entry policies. The reflector traced the dominant failure to its root cause, and the gate applied a learning that the agent adopted on trigger evenings and on no control evening. Code: https://github.com/yebof/quant-agent
