# HarnessPro: Recursive Harness Self-Improvement with Pareto Optimization for Performance-Cost Trade-offs

作者：Zhuoshi Pan, ZhiYuan Feng, Yukuo Cen, Honglin Lin, Junru Lu, Zhongxia Chen, Shuo Yang, H. Vicky Zhao, Jie Tang
原文：https://arxiv.org/abs/2610.26770v2
首次提交：2026-10-19T17:27:38Z · 版本更新：2026-10-20T06:00:54Z
版本：v2 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- HarnessPro 针对递归改进 harness 的性能—成本权衡，以多智能体诊断、生成测试和三档候选选择进行无标签进化；作者报告 GPT-5.5＋Codex 下 heavy 相对 RHO 平均提高通过率2.0个百分点、降低每任务成本26.1%。
  核验：原文支持；b00001、b00065支持所述方法和三档输出，并明确报告GPT-5.5＋Codex下heavy相对RHO的跨基准平均增益为2.0个百分点、平均每任务成本降幅为26.1%；结论保留了作者报告的性质。
  - [原文 6 Conclusion · b00065](https://arxiv.org/html/2610.26770v2#S6.p1.1)：To this end, it coordinates trajectory diagnosis and harness modification through a multi-agent framework, with a dedicated planner proposing update plans and LLM-generated tests guiding candidate evaluation.
  - [原文 摘要 · b00001](https://arxiv.org/html/2610.26770v2#abstract1.1)：Across these benchmarks using GPT-5.5 with Codex, the heavy mode of HarnessPro achieves an average pass-rate gain of 2.0 percentage points and an average per-task cost reduction of 26.1% relative to RHO.
  - [原文 6 Conclusion · b00065](https://arxiv.org/html/2610.26770v2#S6.p1.1)：Rather than producing a single harness, HarnessPro offers cost-focused (lite), balanced (medium), and performance-focused (heavy) alternatives to meet different deployment budgets.

## 研究问题

- 研究问题是递归 harness 自改进能否同时提升任务表现并降低执行成本，并为不同部署预算保留选择。
  核验：原文支持；b00002明确提出同时提高性能、降低执行成本的问题；b00065明确将三档方案对应不同部署预算。
  - [原文 1 Introduction · b00002](https://arxiv.org/html/2610.26770v2#S1.p1.1)：We therefore ask: Can recursive harness self-improvement deliver better performance at lower execution cost?
  - [原文 6 Conclusion · b00065](https://arxiv.org/html/2610.26770v2#S6.p1.1)：Rather than producing a single harness, HarnessPro offers cost-focused (lite), balanced (medium), and performance-focused (heavy) alternatives to meet different deployment budgets.

## 方法怎样工作

- 先固定10个训练任务的 coreset；测试合成器依据任务描述和初始轨迹生成训练、验证测试，并在进化期间固定。进化不使用标准答案、官方测试或评分器反馈。
  核验：原文支持；b00075明确固定10任务coreset；b00038说明训练及验证任务的测试由任务描述和初始轨迹生成，且进化不访问标准答案、官方测试或评分反馈；b00040说明生成测试保持固定。
  - [原文 A.1 DPP-Based Coreset Selection · b00075](https://arxiv.org/html/2610.26770v2#A1.SS1.p2.6)：We stop after k=10 tasks and keep this coreset fixed across all evolution epochs. Neither official test results nor validation outcomes enter coreset selection.
  - [原文 Test Synthesizer. · b00038](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px1.p1.1)：During harness evolution, we follow RHO ( Pan et al., 2026a ) , adopting a label-free setting without access to ground-truth solutions, official tests, or grader feedback.
  - [原文 Test Synthesizer. · b00038](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px1.p1.1)：For each task x\in\mathcal{D}_{\mathrm{train}}\cup\mathcal{D}_{\mathrm{val}} , the agent generates tests from its description x and the initial trajectory \tau_{h_{0}}(x) :
  - [原文 Test Synthesizer. · b00040](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px1.p1.2)：These generated tests remain fixed throughout the self-improvement process, ensuring a fair comparison among candidate harnesses.
- 分析器联合诊断每任务的多次 rollout；规划器结合当前实现、诊断、指标及候选代码差异提出成本优先、平衡、性能优先三种计划；编辑器在独立工作区实施并提交 Git，新候选与父代共同评估。
  核验：原文支持；b00026支持联合分析多次独立rollout；b00029支持规划器使用实现、诊断、指标和代码差异并提出三类计划；b00034支持独立工作区、Git提交及父子候选共同评估。
  - [原文 Trajectory Analyzer. · b00026](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px1.p1.1)：To reduce the impact of randomness, the agent jointly examines the trajectories \{\tau_{h}^{t,g}(x)\}_{g=1}^{G} from G independent rollouts and their metrics \{m_{h}^{t,g}(x)\}_{g=1}^{G} , rather than relying on a single attempt:
  - [原文 Evolution Planner. · b00029](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px2.p1.1)：The planner starts with the full implementation of h_{i}^{t} , using its diagnoses and metrics to identify where modifications are needed. It also compares harness h_{i}^{t} and the other candidates h_{k}^{t} by examining their code differences
  - [原文 Evolution Planner. · b00029](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px2.p1.1)：Each plan is guided by a distinct instruction: I_{1} emphasizes cost reduction, I_{2} balances performance and cost, and I_{3} prioritizes performance, as detailed in Appendix B .
  - [原文 Harness Editor. · b00034](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px3.p1.2)：Each of the three plans is implemented in a separate workspace, and the resulting harness is committed to Git so that changes can be traced and reverted. Newly generated harnesses form \mathcal{C}_{t} , and we combine them with the parent harnesses in \mathcal{A}_{t} for evaluation:
- 验证时每候选每任务运行一次；剔除低于初始通过率或被 Pareto 支配的候选，再最小化归一化性能、成本偏差的加权平方和。lite、medium、heavy 权重为(1,2)、(1,1)、(2,1)，最多保留三个候选进入下一轮，结束后固定并测试。
  核验：原文支持；b00040—b00047支持每验证任务运行一次、按初始验证通过率与Pareto支配过滤、按归一化偏差加权平方和选取最多三个候选；b00076确认三组权重；b00023支持结束后固定并测试。
  - [原文 Test Synthesizer. · b00040](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px1.p1.2)：After each epoch, we run each candidate h\in\widetilde{\mathcal{C}}_{t} once per validation task x and check its output against \mathcal{S}(x) .
  - [原文 Candidate filtering and selection. · b00041](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px2.p1.1)：To prevent the candidate set from growing indefinitely, we retain at most three harnesses for the next epoch. We first discard candidates below the initial pass-rate floor \mathrm{PR}_{\mathrm{val}}(h_{0}) or Pareto-dominated by another candidate:
  - [原文 Candidate filtering and selection. · b00045](https://arxiv.org/html/2610.26770v2#S4.E8)：\displaystyle d_{\mathrm{perf}}(h) \displaystyle=(P_{\max}-\mathrm{PR}_{\mathrm{val}}(h))/(P_{\max}-P_{\min}), (8) \displaystyle d_{\mathrm{cost}}(h) \displaystyle=(C_{\mathrm{val}}(h)-C_{\min})/(C_{\max}-C_{\min}).
  - [原文 Candidate filtering and selection. · b00046](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px2.p2.3)：The selection objective for mode m is J_{m}(h)=\alpha_{m}d_{\mathrm{perf}}(h)^{2}+\beta_{m}d_{\mathrm{cost}}(h)^{2} , where \alpha_{m} and \beta_{m} weight performance and cost, respectively.
  - [原文 Reasoning effort and mode weights. · b00076](https://arxiv.org/html/2610.26770v2#A1.SS2.SSS0.Px1.p1.1)：the performance-cost weights (\alpha_{m},\beta_{m}) are (1,2) for lite, (1,1) for medium, and (2,1) for heavy. These weights remain fixed across epochs.
  - [原文 4.1 Overview · b00023](https://arxiv.org/html/2610.26770v2#S4.SS1.p2.1)：The selected harnesses form the candidate set for the next epoch. This process repeats until the epoch limit is reached, after which we fix the harnesses and evaluate them on the test set.

## 作者声称的贡献

- 作者自述贡献是以多智能体诊断、独立规划和生成测试实现无标签递归 harness 改进，并输出三档性能—成本方案；未独立确认其创新优先性。
  核验：原文支持；b00065明确将这些机制与三档输出列为作者提出的方法。结论将贡献限定为作者自述，没有把该文本当作创新优先性的独立证明。
  - [原文 6 Conclusion · b00065](https://arxiv.org/html/2610.26770v2#S6.p1.1)：We introduced HarnessPro , a label-free approach to recursive harness self-improvement that improves task performance while reducing execution cost. To this end, it coordinates trajectory diagnosis and harness modification through a multi-agent framework, with a dedicated planner proposing update plans and LLM-generated tests guiding candidate evaluation.
  - [原文 6 Conclusion · b00065](https://arxiv.org/html/2610.26770v2#S6.p1.1)：Rather than producing a single harness, HarnessPro offers cost-focused (lite), balanced (medium), and performance-focused (heavy) alternatives to meet different deployment budgets.

## 本文报告的方法比较

- Balance 仅改写 RHO 的优化指令；RHO+Iteration 将 Balance 运行至相同轮数。作者报告 medium 在 Terminal-Bench 2 与 RHO+Iteration 性能持平、成本低31.7%；heavy 在 ProgramBench 高1.3个百分点、成本低5.8%。同轮数不等于同总预算。
  核验：原文支持；b00050确认Balance仅改变优化指令，RHO+Iteration与HarnessPro轮数相同；b00054和b00053支持31.7%、1.3个百分点及5.8%的对应比较。同轮数本身不能证明总预算相同，所给原文也未提供这一保证。
  - [原文 Baselines. · b00050](https://arxiv.org/html/2610.26770v2#S5.SS1.SSS0.Px2.p1.1)：Balance changes only RHO’s optimization instruction, asking for better task performance at lower cost. RHO+Iteration runs Balance for the same number of epochs as HarnessPro .
  - [原文 5.2 Main Results · b00054](https://arxiv.org/html/2610.26770v2#S5.SS2.p1.1)：Our medium mode matches the performance of RHO+Iteration on Terminal-Bench 2 at 31.7% lower cost. Moreover, on ProgramBench, our heavy mode raises pass rate by 1.3 percentage points while lowering mean cost by 5.8%.
- 作者报告 GLM-5.2＋Claude Code 下 heavy 在三个基准均比 RHO 通过率更高、成本更低；SWE-Bench Pro 平均延迟由520秒降至412秒。
  核验：原文支持；b00055明确报告该模型与运行框架下heavy在三个基准均优于RHO且成本更低，并给出SWE-Bench Pro平均延迟520至412秒；b00053的对应数据一致。
  - [原文 5.2 Main Results · b00055](https://arxiv.org/html/2610.26770v2#S5.SS2.p2.1)：The results with GLM-5.2 and Claude Code follow a similar pattern: the heavy mode of HarnessPro surpasses RHO on all three benchmarks at lower cost
  - [原文 5.2 Main Results · b00055](https://arxiv.org/html/2610.26770v2#S5.SS2.p2.1)：For example, on SWE-Bench Pro, our heavy mode reduces mean latency from RHO’s 520 to 412 seconds.

## 实验证据与条件

任务：Terminal-Bench 2、SWE-Bench Pro、ProgramBench；测试任务分别59、100、100个
基础模型：GPT-5.5＋Codex 0.147.0
比较基线：RHO
指标：官方测试通过率、每任务平均执行成本；ProgramBench 使用任务内测试用例通过比例的宏平均
结果：Terminal-Bench 2 heavy：80.8%，较 RHO 高4.5个百分点，成本低33.9%；ProgramBench heavy：69.6%/$2.95，对68.8%/$3.59；SWE-Bench Pro medium：79.0%/$1.26，对80.0%/$2.68。
资源条件：每候选每训练任务每轮3次 rollout；前两基准进化3轮、ProgramBench 4轮。HarnessPro 前两基准报告3次运行、ProgramBench 2次运行的均值±样本标准差。Terminal-Bench 2、ProgramBench 每 solver 为8 CPU、32 GiB；SWE-Bench Pro 无显式每任务 CPU/内存限制。
- 作者报告的主实验显示性能—成本改善，但不同模式并非都提高通过率；ProgramBench 的通过率口径不同于另外两个基准。
  核验：原文支持；b00053、b00054支持列出的模式、比较对象和数值，包括medium在SWE-Bench Pro通过率略低于RHO；b00049、b00051、b00079支持任务数、模型版本、rollout与轮数、重复运行统计及硬件条件。ProgramBench指标口径差异也被准确保留。
  - [原文 5.2 Main Results · b00054](https://arxiv.org/html/2610.26770v2#S5.SS2.p1.1)：On Terminal-Bench 2, the heavy mode of HarnessPro reaches a mean pass rate of 80.8% across three runs, 4.5 percentage points above RHO, with 33.9% lower mean cost.
  - [原文 5.2 Main Results · b00054](https://arxiv.org/html/2610.26770v2#S5.SS2.p1.1)：The advantage extends to ProgramBench, where its 69.6% pass rate exceeds RHO’s 68.8% at 17.8% lower mean cost ($2.95 vs. $3.59).
  - [原文 5.2 Main Results · b00054](https://arxiv.org/html/2610.26770v2#S5.SS2.p1.1)：On SWE-Bench Pro, it achieves a 79.0% pass rate compared with RHO’s 80.0%, while reducing the average cost per task by 53.0%, from $2.68 to $1.26.
  - [原文 Data and implementation. · b00049](https://arxiv.org/html/2610.26770v2#S5.SS1.SSS0.Px1.p1.1)：We pair GPT-5.5 with Codex 0.147.0 and GLM-5.2 with Claude Code 2.1.231 . Each candidate harness produces G=3 rollouts per training task in each epoch.
  - [原文 Data and implementation. · b00049](https://arxiv.org/html/2610.26770v2#S5.SS1.SSS0.Px1.p1.1)：Following the dataset splitting protocol of RHO ( Pan et al., 2026a ) , we hold out 59, 100, and 100 tasks, respectively, for testing.
  - [原文 Data and implementation. · b00049](https://arxiv.org/html/2610.26770v2#S5.SS1.SSS0.Px1.p1.1)：Evolution runs for three epochs on Terminal-Bench 2 and SWE-Bench Pro, and four on ProgramBench, retaining up to three harnesses after each epoch. All methods use the same data splits and grading settings.
  - [原文 Evaluation metrics. · b00051](https://arxiv.org/html/2610.26770v2#S5.SS1.SSS0.Px3.p1.1)：On Terminal-Bench 2 and SWE-Bench Pro, a task passes only if all its official tests pass. For ProgramBench, we follow its official evaluation protocol ( Yang et al., 2026a ) and report pass rate as the macro-average of the fraction of test cases passed for each task.
  - [原文 Evaluation metrics. · b00051](https://arxiv.org/html/2610.26770v2#S5.SS1.SSS0.Px3.p1.1)：For HarnessPro , all metrics are given as mean \pm sample standard deviation over three runs on Terminal-Bench 2 and SWE-Bench Pro, and two on ProgramBench.
  - [原文 Task environments. · b00079](https://arxiv.org/html/2610.26770v2#A1.SS2.SSS0.Px4.p1.1)：Terminal-Bench 2 and ProgramBench allocate 8 CPUs and 32 GiB of memory per solver. SWE-Bench Pro runs solvers in host workspaces without an explicit per-task CPU or memory limit.
任务：Terminal-Bench 2、SWE-Bench Pro 的组件消融与策略对照
基础模型：GPT-5.5＋Codex
比较基线：完整 HarnessPro；移除规划器、移除测试合成器；RHO 加动态路由、预算 hooks 或固定 low 推理强度
指标：通过率、每任务平均成本
结果：移除规划器后 SWE-Bench Pro medium 从79.0%/$1.26降至73.0%/$1.42；移除测试合成器后通过率下降3.4—10.0个百分点；作者报告三种 RHO 变体均被 HarnessPro 产物 Pareto 支配。
资源条件：未报告 / 未提取
- 规划器与测试合成器消融支持它们在所测配置中的作用；作者还比较了向 RHO 单独加入路由、预算 hooks 或低推理强度的变体。
  核验：原文支持；b00062—b00064支持所述模型配置、两个基准、组件消融与三种RHO策略变体；给出的通过率和成本变化准确。结论限定于所测配置，并将Pareto支配表述为作者报告，没有声称每项消融都同时恶化两项指标。
  - [原文 5.5 Ablation Study · b00062](https://arxiv.org/html/2610.26770v2#S5.T3)：Table 3: Ablations with GPT-5.5 and Codex.
  - [原文 5.5 Ablation Study · b00064](https://arxiv.org/html/2610.26770v2#S5.SS5.p1.1)：For example, on SWE-Bench Pro, the pass rate of the medium mode drops from 79.0% to 73.0%, while mean cost rises from $1.26 to $1.42 per task.
  - [原文 5.5 Ablation Study · b00064](https://arxiv.org/html/2610.26770v2#S5.SS5.p1.1)：Removing the test synthesizer has a larger impact , with pass rates dropping by 3.4–10.0 percentage points across both benchmarks and all three modes.
  - [原文 5.5 Ablation Study · b00062](https://arxiv.org/html/2610.26770v2#S5.T3)：In the RHO variants, + dynamic routing selects reasoning effort from task descriptions, + budget hooks append budget reminders to tool results and + low reasoning effort fixes effort at low.
  - [原文 5.5 Ablation Study · b00064](https://arxiv.org/html/2610.26770v2#S5.SS5.p1.1)：Overall, all three RHO variants are Pareto-dominated by harnesses evolved by HarnessPro , which achieve higher pass rates at lower cost.
任务：Terminal-Bench 2 与 SWE-Bench Pro 训练任务的失败识别
基础模型：未报告 / 未提取
比较基线：直接 LLM 判断
指标：失败召回率
结果：由41.7%提高至83.3%
资源条件：未报告 / 未提取
- 初步评估比较生成测试与直接 LLM 判断对失败的识别能力。
  核验：原文支持；b00040明确给出相对直接LLM判断，失败召回率从41.7%升至83.3%；b00037限定为两个基准训练任务汇总。所给段落未明确该初步实验的模型和资源条件，相关字段保持null合理。
  - [原文 Test Synthesizer. · b00040](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px1.p1.2)：A preliminary experiment demonstrates the effectiveness of this approach, with failure recall increasing from 41.7% to 83.3% compared with direct LLM judgments (Figure 2 ).
  - [原文 4.3 Evaluation and Candidate Selection · b00037](https://arxiv.org/html/2610.26770v2#S4.F2)：Figure 2: Confusion matrices pooled across training tasks from Terminal-Bench 2 and SWE-Bench Pro.

## 原文支持的局限性

- 作者明确指出模型响应时间受服务负载和网络影响，因此延迟只是辅助指标，不是优化目标；不能将成本降低直接解释为延迟必然降低。
  核验：原文支持；b00016明确说明服务负载和网络导致响应时间波动，延迟仅为辅助指标；b00015另将成本定义为token计费。不能由成本降低推出延迟必然降低，属于有依据的解释限制。
  - [原文 Latency. · b00016](https://arxiv.org/html/2610.26770v2#S3.SS0.SSS0.Px3.p1.1)：Because model response times fluctuate with server load and network conditions, we treat latency as an auxiliary metric rather than an optimization objective.
- 作者报告改进并非逐轮同时降低成本、提高性能：SWE-Bench Pro medium 从第1到第2轮通过率上升，但成本也上升，第3轮才同时改善两项指标。
  核验：原文支持；b00057明确报告SWE-Bench Pro medium在第1至第2轮通过率与成本同时上升，第3轮才相对第2轮同时改善，支持非逐轮双指标改善的结论。
  - [原文 5.4 Evolution Dynamics · b00057](https://arxiv.org/html/2610.26770v2#S5.SS4.p1.1)：In the medium mode, pass rate rises from 70.0% in epoch 1 to 77.0% in epoch 2, but mean cost also rises from $1.57 to $1.66. Only in epoch 3 does it improve both metrics, with pass rate rising to 79.0% and mean cost falling to $1.26 per task.

## 多智能体机制

- 角色与分工：角色包括轨迹分析器、进化规划器、harness 编辑器和测试合成器。
  核验：原文支持；b00025明确列出轨迹分析器、进化规划器、harness编辑器和测试合成器四个角色。
  - [原文 4.2 Trajectory Analysis and Harness Evolution · b00025](https://arxiv.org/html/2610.26770v2#S4.SS2.p1.1)：These trajectories and artifacts guide harness self-improvement through a multi-agent framework comprising a trajectory analyzer , an evolution planner , a harness editor , and a test synthesizer .
- 协作结构：规划器整合实现、诊断、指标及其他候选的代码差异；编辑器根据计划和诊断产生可执行候选，形成诊断—规划—编辑的协作流程。
  核验：原文支持；b00029说明规划器整合实现、诊断、指标和其他候选代码差异；b00032说明编辑器使用计划与诊断产生可执行候选，支持所述协作流程。
  - [原文 Evolution Planner. · b00029](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px2.p1.1)：The planner starts with the full implementation of h_{i}^{t} , using its diagnoses and metrics to identify where modifications are needed. It also compares harness h_{i}^{t} and the other candidates h_{k}^{t} by examining their code differences
  - [原文 Harness Editor. · b00032](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px3.p1.1)：We then design a harness editor to modify candidate h_{i}^{t} , producing a new, executable candidate harness using the proposed plan \mathbf{p}_{j}(h_{i}^{t}) and the diagnoses \mathbf{z}(h_{i}^{t}) :
- 通信机制：诊断传递问题、性能与成本影响及证据，并附轨迹路径和事件范围；规划器默认不接收完整轨迹，需要时按路径读取，诊断超过64K tokens 时由分析器摘要。
  核验：原文支持；b00028明确诊断内容、轨迹文件路径、事件范围及聚合诊断超过64K tokens时摘要；b00031明确规划器默认不接收完整轨迹，需要时按记录路径查看。
  - [原文 Trajectory Analyzer. · b00028](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px1.p1.2)：The analyzer’s output z(h,x) reports (1) identified problems, (2) their impact on performance and cost, and (3) their sources and supporting evidence. The evidence includes a concise trajectory summary or relevant excerpts, together with the path of the trajectory file and the relevant event range.
  - [原文 Evolution Planner. · b00031](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px2.p1.2)：Full trajectories are not provided to the planner by default. When needed, it can inspect them using the file paths recorded in the diagnoses.
  - [原文 Trajectory Analyzer. · b00028](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px1.p1.2)：If \mathbf{z}(h) exceeds 64K tokens, the analyzer summarizes it.
- 调度方式：三种计划分别在独立工作区实施，候选提交 Git 后与父代合并评估；原文摘录未确定这些工作区是否并行执行。
  核验：原文支持；b00034明确独立工作区、Git提交及父子候选合并评估，但没有说明这些工作区是否并行执行；结论正确保留了这一不确定性。
  - [原文 Harness Editor. · b00034](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px3.p1.2)：Each of the three plans is implemented in a separate workspace, and the resulting harness is committed to Git so that changes can be traced and reverted. Newly generated harnesses form \mathcal{C}_{t} , and we combine them with the parent harnesses in \mathcal{A}_{t} for evaluation:

## 自进化机制

- 改变对象：更新对象是完整 harness，包括指令、技能、工具、hooks 和验证规则。
  核验：原文支持；b00010明确将进化对象表述为整个harness，并列出指令、技能、工具、hooks和验证规则。
  - [原文 Component optimization and inference-time budget allocation. · b00010](https://arxiv.org/html/2610.26770v2#S2.SS0.SSS0.Px2.p1.1)：HarnessPro instead uses past trajectories to evolve the entire harness, including instructions, skills, tools, hooks, and verification rules.
- 反馈来源：训练轨迹及性能、成本诊断指导更新；固定生成测试产生验证反馈，用于候选筛选。
  核验：原文支持；b00014、b00028支持训练结果及性能成本诊断指导更新；b00040明确固定生成测试用于获取验证指标，b00048说明验证指标用于筛选。
  - [原文 Trajectory Analyzer. · b00028](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px1.p1.2)：The analyzer’s output z(h,x) reports (1) identified problems, (2) their impact on performance and cost, and (3) their sources and supporting evidence.
  - [原文 Pass rate. · b00014](https://arxiv.org/html/2610.26770v2#S3.SS0.SSS0.Px1.p1.1)：Outcomes on the training set are used to update harnesses, while the validation set is used to evaluate and select candidate harnesses.
  - [原文 Test Synthesizer. · b00040](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px1.p1.2)：These generated tests remain fixed throughout the self-improvement process, ensuring a fair comparison among candidate harnesses.
- 更新方式：规划器提出三种性能—成本取向的编辑计划，编辑器修改可执行 harness；父代与后代经验证筛选，保留候选递归进入下一轮。
  核验：原文支持；b00029、b00032支持三类计划及可执行harness修改；b00034—b00036支持父代与后代共同评估；b00023支持筛选后递归进入下一轮。
  - [原文 Evolution Planner. · b00029](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px2.p1.1)：Each plan is guided by a distinct instruction: I_{1} emphasizes cost reduction, I_{2} balances performance and cost, and I_{3} prioritizes performance, as detailed in Appendix B .
  - [原文 Harness Editor. · b00032](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px3.p1.1)：We then design a harness editor to modify candidate h_{i}^{t} , producing a new, executable candidate harness using the proposed plan \mathbf{p}_{j}(h_{i}^{t}) and the diagnoses \mathbf{z}(h_{i}^{t}) :
  - [原文 4.1 Overview · b00023](https://arxiv.org/html/2610.26770v2#S4.SS1.p2.1)：The selected harnesses form the candidate set for the next epoch.
- 发生阶段：属于最终测试前的离线进化：训练集指导修改，验证集指导选择，进化结束后固定 harness 进行测试。
  核验：原文支持；b00014、b00023明确训练用于更新、验证用于选择，进化结束后固定harness再进行最终测试，支持将该流程概括为最终测试前的离线进化。
  - [原文 Pass rate. · b00014](https://arxiv.org/html/2610.26770v2#S3.SS0.SSS0.Px1.p1.1)：Outcomes on the training set are used to update harnesses, while the validation set is used to evaluate and select candidate harnesses. The test set is used only for final evaluation after evolution.
  - [原文 4.1 Overview · b00023](https://arxiv.org/html/2610.26770v2#S4.SS1.p2.1)：This process repeats until the epoch limit is reached, after which we fix the harnesses and evaluate them on the test set.
- 保留范围：更新通过 Git 和候选继承跨进化轮次保留，固定产物用于测试任务；属于离线跨任务复用，部署后持续学习的持久性未交代。
  核验：原文支持；b00034支持Git保存可追踪修改，b00023支持候选跨轮继承及固定产物用于测试；结合b00014的训练、验证、测试划分，可概括为离线跨任务复用。所给文本未交代部署后持续学习，不能据此推断此类持久机制。
  - [原文 Harness Editor. · b00034](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px3.p1.2)：Each of the three plans is implemented in a separate workspace, and the resulting harness is committed to Git so that changes can be traced and reverted.
  - [原文 4.1 Overview · b00023](https://arxiv.org/html/2610.26770v2#S4.SS1.p2.1)：The selected harnesses form the candidate set for the next epoch. This process repeats until the epoch limit is reached, after which we fix the harnesses and evaluate them on the test set.
- 独立任务验证：验证集和测试集对规划器隐藏；过滤与选择只用验证指标。最终测试使用官方评估；中间轮次测试指标仅用于可视化，不参与选择。
  核验：原文支持；b00031明确验证集和测试集对规划器隐藏；b00048明确筛选只使用验证指标；b00051明确最终评估口径；b00061明确中间轮次测试指标仅用于可视化、不用于过滤或选择。
  - [原文 Evolution Planner. · b00031](https://arxiv.org/html/2610.26770v2#S4.SS2.SSS0.Px2.p1.2)：Throughout evolution, the validation and test sets remain hidden from the planner to avoid benchmark leakage.
  - [原文 Candidate filtering and selection. · b00048](https://arxiv.org/html/2610.26770v2#S4.SS3.SSS0.Px2.p2.4)：Filtering and selection use only validation metrics, with no access to test-set results.
  - [原文 Evaluation metrics. · b00051](https://arxiv.org/html/2610.26770v2#S5.SS1.SSS0.Px3.p1.1)：On Terminal-Bench 2 and SWE-Bench Pro, a task passes only if all its official tests pass. For ProgramBench, we follow its official evaluation protocol ( Yang et al., 2026a ) and report pass rate as the macro-average of the fraction of test cases passed for each task.
  - [原文 5.4 Evolution Dynamics · b00061](https://arxiv.org/html/2610.26770v2#S5.F4)：Intermediate-epoch test-set metrics are reported for visualization only and were not used for filtering or selection.

## 系统分析与启发（推测）

- 系统分析：依据 b00034、b00041，父代保留、Git 回滚与通过率下限共同提供了回退机制，但不能据此保证未见任务上的性能不下降。
- 系统分析：依据 b00040、b00048，固定生成测试有利于候选比较的一致性，也值得检查反复选择是否放大代理测试偏差。
- 系统分析：依据 b00050，同轮数对照只能控制迭代次数，不能独立证明多智能体在相同 token、调用数或总费用下优于单智能体。

## 待研究问题（系统分析）

- 系统分析：计入测试生成、诊断、规划、编辑和候选评估费用后，需要多少部署任务才能收回进化成本？
- 系统分析：验证任务每轮仅一次 rollout，候选排序与 Pareto 筛选对随机性有多敏感？
- 系统分析：固定生成测试上的改进能否迁移到其他任务分布、基础模型和运行框架？

## 缺失信息

- 所给摘录未交代归一化极差为零、并列最优及候选重合时的处理规则。
- 所给摘录未提供各基准验证集确切规模、随机种子及统计显著性检验；虽报告均值±样本标准差，摘录未完整呈现所有模式的结果。
- 所给摘录未完整提供 GLM-5.2 各模式的通过率与成本数值，以及失败召回率实验的基础模型、样本数和完整混淆矩阵。
- 所给摘录未提供进化全过程总成本、部署回本分析或明确的等总预算单智能体对照。
- 所给摘录未明确共享记忆机制、代理实际并行调度及部署后的持续学习机制。
- 所给笔记未包含完整提示词、代码 listing 和 harness 文件，无法核验具体实现；组件消融的独立资源配置亦未明确。
- 未阅读被引用前作，不能独立确认首次性或前作结论；本次仅依据所给原文笔记合成卡片，未复现实验。

## 阅读范围

读取 2 / 2 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Harness development plays a crucial role in building capable AI agents. Recent approaches improve harnesses through recursive self-improvement (RSI), but their performance gains often come with higher execution costs. We introduce HarnessPro, a label-free method for evolving harnesses to improve task performance while reducing execution cost. In this setting, candidate harnesses are evaluated using LLM-generated tests without access to ground-truth solutions or official tests. Specialized agents diagnose execution trajectories, plan updates with different performance-cost priorities, and implement them as candidate harnesses. Rather than returning a single harness, HarnessPro uses normalized weighted squared-distance selection to provide cost-focused (lite), balanced (medium), and performance-focused (heavy) harnesses for different deployment budgets. Selected harnesses enter the next iteration, where execution feedback guides further updates. Our experiments cover Terminal-Bench 2, SWE-Bench Pro, and ProgramBench, using GPT-5.5 with Codex and GLM-5.2 with Claude Code. Across these benchmarks using GPT-5.5 with Codex, the heavy mode of HarnessPro achieves an average pass-rate gain of 2.0 percentage points and an average per-task cost reduction of 26.1% relative to RHO. This advantage also holds when using GLM-5.2 with Claude Code. Code is available at https://github.com/pzs19/HarnessPro
