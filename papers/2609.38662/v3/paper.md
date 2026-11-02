# CollabFlow: Recursive Self-Improvement of Agent Collaboration

作者：Xiao Huang, Mingda Zhang, Junming Zhang, Qiang Huang, Hanwen Zhang, Yue Dai, Zijia Wang, Xiaoying Tang
原文：https://arxiv.org/abs/2609.38662v3
首次提交：2026-09-29T23:39:03Z · 版本更新：2026-10-22T13:45:52Z
版本：v3 · 待核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- CollabFlow针对协作预设、错误传播与团队集中问题，用证据门控通信和CTB跨轮训练团队Director；作者报告12个基准上的性能优势，其中OOD HumanEval与AFlow并列。
  核验：原文支持；b00001、b00083支持问题定位及两层改进机制；b00061、b00078支持12个基准的作者报告，并明确HumanEval与AFlow并列。
  - [原文 摘要 · b00001](https://arxiv.org/html/2609.38662v3#abstract1.1)：However, existing multi-agent collaboration leaves this loop open: collaboration is pre-defined at the operator level, topology-only learning keeps verbatim exchange that propagates errors, and reward maximization on a system’s own outcomes concentrates on a few teams.
  - [原文 6 Conclusion · b00083](https://arxiv.org/html/2609.38662v3#S6.p1.1)：CollabFlow makes agent collaboration recursively self-improving: evidence-conditioned protocols let Agents refine one another’s answers within a round, and Collaborative Trajectory Balance retrains the Collab-Director on its own records across rounds while keeping several good teams in play
  - [原文 1 Introduction · b00009](https://arxiv.org/html/2609.38662v3#S1.p6.1)：We evaluate on twelve datasets spanning question answering, mathematical and expert reasoning, embodied planning, code generation, and web shopping, with held-out suites probing transfer to unseen task types.
  - [原文 5 Experiments · b00078](https://arxiv.org/html/2609.38662v3#S5.p4.1)：With everything frozen, CollabFlow again leads every OOD row but HumanEval, where it ties AFlow

## 研究问题

- 作者认为现有方法预设算子层协作，或仅学习通信拓扑却保留逐字交换，未同时学习团队组织与消息使用方式。
  核验：原文支持；b00007明确批评预设协作和逐字消息交换，并指出策略学习谁通信而未学习消息如何使用；结论保留了作者观点属性。
  - [原文 1 Introduction · b00007](https://arxiv.org/html/2609.38662v3#S1.p4.1)：but every received message re-enters the receiver’s reasoning in full, spreading conformity and errors
  - [原文 摘要 · b00001](https://arxiv.org/html/2609.38662v3#abstract1.1)：collaboration is pre-defined at the operator level, topology-only learning keeps verbatim exchange that propagates errors
- 作者认为基于自身结果最大化奖励会集中于少数团队，减少后续学习来源；同一团队的不同构造顺序还会分散信用。
  核验：原文支持；b00007直接支持团队集中、后续学习来源减少及同一团队不同构造顺序分散信用三项作者判断。
  - [原文 1 Introduction · b00007](https://arxiv.org/html/2609.38662v3#S1.p4.1)：a reward-maximizing policy concentrates on a few teams ( Yu et al., 2026 ; Li et al., 2026 ) , leaving later rounds fewer teams to learn from, while the construction orders of one team split its credit.

## 方法怎样工作

- Director根据任务、兼容Agent、部分图和剩余预算，对合法动作评分采样，逐步选择Agent、绑定技能、添加协议边及输出规则；完整合法团队方可停止，超时或预算耗尽则中止。
  核验：原文支持；b00088、b00096支持输入条件、合法动作评分及归一化采样；b00030支持动作类型、合法停止条件和超时或预算耗尽时中止。
  - [原文 A.1 Collab-Director Input and Output Contract · b00088](https://arxiv.org/html/2609.38662v3#A1.SS1.p1.1)：The Collab-Director receives the task x , compatible Agent profiles \mathcal{A}_{x} , the partial graph G_{t} , the protocols permitted for the task family, and the remaining construction budget \mathbf{b}_{t}^{\rm con} .
  - [原文 A.3 Structural Actions and Validation · b00096](https://arxiv.org/html/2609.38662v3#A1.SS3.p1.1)：the director scores every legal action string and samples from the renormalized kernel of Eq. 5
  - [原文 4.1 Learned Agent Collaboration: What Each Round Changes · b00030](https://arxiv.org/html/2609.38662v3#S4.SS1.p3.2)：Actions select Agents, bind skills, add protocol-labeled edges, select the output, or stop; a stop requires a complete valid team, and a timeout or exhausted budget returns an explicit abort (Appendix A.3 ).
- 冻结执行器运行团队。证据分为0、1、2级，门限κ=1；不同答案仅在发送方证据领先两级时直接采纳，接近时可进行一次有界无工具修订，修订后重新过滤证据并评分。
  核验：原文支持；b00024、b00143支持冻结执行器与三级证据；b00038、b00149支持κ=1、不同答案相差两级才直接采纳，以及一次有界无工具修订和重新过滤评分。
  - [原文 4.1 Learned Agent Collaboration: What Each Round Changes · b00024](https://arxiv.org/html/2609.38662v3#S4.SS1.p1.1)：the trainable Collab-Director designs the team and a frozen executor runs its Agents
  - [原文 Scores and likelihood-ratio interpretation. · b00143](https://arxiv.org/html/2609.38662v3#A2.SS4.SSS0.Px1.p1.1)：The method uses the maximum applicable evidence category: 2 for an applicable successful executable check, 1 for applicable retrieval support if there is no category-2 record, and 0 otherwise.
  - [原文 4.2 Message-Level Improvement: Evidence-Conditioned Communication · b00038](https://arxiv.org/html/2609.38662v3#S4.SS2.p2.2)：where \mathrm{Revise}_{c} is one bounded, tool-free call in place of a re-execution, and its output is filtered and rescored, so every record stays with the version it checked. With integer scores in \{0,1,2\} , we fix \kappa=1 , the only integer margin that adopts on a two-level gap but revises on a one-level gap.
- 执行结果形成回放记录；CTB将不同构造顺序汇入同一规范团队，以长度归一化残差和KL项更新Director。奖励结合答案分数、历史成功率与结构先验，唯一结果在批后更新计数。
  核验：原文支持；b00012支持回放、完整规范团队处合并及残差和KL更新；b00058、b00229支持奖励组成及唯一结果在批后更新计数。
  - [原文 3 Preliminaries · b00012](https://arxiv.org/html/2609.38662v3#S3.F3)：the frozen executor runs it, and the evaluated outcome becomes a replay record
  - [原文 3 Preliminaries · b00012](https://arxiv.org/html/2609.38662v3#S3.F3)：Across rounds, CTB merges construction histories only at the complete canonical team and updates the director with the length-normalized residual and a KL term
  - [原文 4.3 Team-Level Improvement: Collaborative Trajectory Balance · b00058](https://arxiv.org/html/2609.38662v3#S4.SS3.p5.2)：the reward multiplies the answer score by two factors with no tuned weight: the team’s Jeffreys-smoothed posterior success rate ( Jeffreys, 1946 ) and a minimum-description-length structural prior ( Rissanen, 1978 )
  - [原文 B.11 Reward snapshots, positive support, and moving counters · b00229](https://arxiv.org/html/2609.38662v3#A2.SS11.p2.2)：Each execution record increments the counts once, however often it is copied. All rewards in a batch use its pre-batch counts; completed outcomes update counts only after that batch.

## 作者声称的贡献

- 作者将系统定位为有界递归自改进：固定评估器、执行器、Agent群体及更新规则，跨轮改变Director、技能库和可靠性记录。此处仅记录作者定位。
  核验：原文支持；b00353直接列明固定组件和跨轮变化组件；结论明确仅记录作者对有界递归自改进的定位。
  - [原文 Appendix I Limitations · b00353](https://arxiv.org/html/2609.38662v3#A9.p1.1)：CollabFlow is a bounded form of recursive self-improvement: its answer evaluator, executor, Agent population, and update rules stay fixed across rounds, and only the director (with its backward kernel and normalizer), the skill library, and the reliability records change.
- 作者将TB与奖励比例采样归于GFlowNet前作，自述贡献是扩展至完整Agent团队，并明确构造、终端、通信和执行契约；未据此确认创新优先权。
  核验：原文支持；b00107明确将TB及奖励比例终端采样归于GFlowNet前作，并将完整Agent团队及接口契约描述为本文扩展；结论未认定创新优先权。
  - [原文 Appendix B Theoretical Foundations and Execution Contracts · b00107](https://arxiv.org/html/2609.38662v3#A2.p1.1)：Trajectory balance (TB) and reward-proportional terminal sampling build on GFlowNet results ( Bengio et al., 2021 ; Malkin et al., 2022 ; Bengio et al., 2023 ) ; we carry them to complete-Agent teams with checked construction and terminal interfaces and explicit communication and execution contracts.
- 作者给出条件性结论：固定奖励且所有有效路径精确平衡时，仅以有效完成为条件的团队分布正比于温度化奖励；固定评分表、结构编码、图支持和β时，计数引起的目标漂移有界。
  核验：原文支持；b00059、b00289支持固定奖励和精确有效路径平衡下的条件分布结论；b00238—b00239支持固定评分表、结构编码、图支持及β时的计数漂移界。该表述未扩大为实际有限训练保证。
  - [原文 Proposition 3 . · b00059](https://arxiv.org/html/2609.38662v3#Thmproposition3.p1.1)：Under exact valid-path balance at fixed rewards (T1–T3, T4 ′ ), CTB samples each canonical team in proportion to its tempered reward among valid completions
  - [原文 C.1 Training Procedure · b00289](https://arxiv.org/html/2609.38662v3#A3.SS1.p3.1)：only the valid-conditional graph law is reward-proportional.
  - [原文 Corollary B.22 (Movement of the self-generated target) . · b00238](https://arxiv.org/html/2609.38662v3#A2.Thmcftheorem22.p1.1)：Fix the answer-score table, structural code, graph support, and \beta between snapshots k and k+1
  - [原文 Corollary B.22 (Movement of the self-generated target) . · b00239](https://arxiv.org/html/2609.38662v3#A2.E27)：e^{-2\beta d}\leq\frac{q_{k+1}(G)}{q_{k}(G)}\leq e^{2\beta d},\qquad\operatorname{TV}(q_{k+1},q_{k})\leq\tanh(\beta d/2). (B.27)

## 本文报告的方法比较

- 主比较包含直接推理、SFT、GRPO、AFlow、FlowSteer、evolving orchestrator、SkillFlow和SkillRL；作者报告IID平均EM和综合Acc.分别领先最强基线2.27和4.37个百分点。
  核验：原文支持；b00321支持基线清单；b00061中IID平均EM为75.94对73.67，综合Acc.为89.15对84.78，分别相差2.27和4.37个百分点，与b00071一致。
  - [原文 E.1 Baseline Inventory · b00321](https://arxiv.org/html/2609.38662v3#A5.SS1.p1.1)：The main comparison covers direct Qwen3.5-9B inference, SFT, GRPO, AFlow, FlowSteer, the evolving orchestrator, SkillFlow, and SkillRL
  - [原文 5 Experiments · b00071](https://arxiv.org/html/2609.38662v3#S5.p3.1)：CollabFlow leads every IID dataset and metric (Table 1 ), 2.27 EM and 4.37 accuracy points above the strongest baseline on average
- 匹配rollout数量和奖励后，作者报告CTB所有团队级指标优于GRPO、PPO及去CTB版本；单次消融中，去Director训练损失13.7个IID和19.5个OOD百分点，去通信损失最大。
  核验：原文支持；b00074、b00081支持匹配rollout和奖励后的团队级优势；b00064限定消融为单次运行，b00080支持13.7、19.5个百分点及去通信损失最大的作者报告。
  - [原文 5 Experiments · b00081](https://arxiv.org/html/2609.38662v3#S5.p7.1)：Under matched rollouts and reward, CTB beats GRPO, PPO and CollabFlow without CTB on every team-level measure, with the smallest team-distribution shift
  - [原文 5 Experiments · b00064](https://arxiv.org/html/2609.38662v3#S5.F4)：Paradigm comparison and ablation of CollabFlow on the six IID and six OOD benchmarks (Qwen3.5-9B executor; EM for QA; one run).
  - [原文 5 Experiments · b00080](https://arxiv.org/html/2609.38662v3#S5.p6.1)：Removing director training costs 13.7 IID and 19.5 OOD points, of which recursion across rounds supplies 7.6 and 13.6. Removing communication costs most
- 表H.2报告每项平均总token：CollabFlow为9,676.6，低于Single agent的12,010.0、Fixed team的10,404.4、Ensemble的24,081.8和SkillFlow的10,451.6；统计包含episode内全部模型调用。
  核验：原文支持；b00351的Mean per item / Total列与五个数值逐项一致，CollabFlow均更低；b00350明确统计episode内每次模型调用的输入和输出token。
  - [原文 H.2 Token Cost per Item · b00350](https://arxiv.org/html/2609.38662v3#A8.SS2.p1.1)：Table H.2 lists the tokens used per item by CollabFlow and the four comparison systems, counting the input and output tokens of every model call in an episode.
  - [原文 H.2 Token Cost per Item · b00351](https://arxiv.org/html/2609.38662v3#A8.T2.2)：Single agent 12,010.0 10,889.8 1,120.2 27,507.4 39,279 13,892.5 1.157 Fixed team 10,404.4 9,119.6 1,284.8 13,091.0 14,437 2,373.8 0.228 Ensemble 24,081.8 20,894.2 3,187.6 37,974.8 47,942 12,557.5 0.521
  - [原文 H.2 Token Cost per Item · b00351](https://arxiv.org/html/2609.38662v3#A8.T2.2)：SkillFlow 10,451.6 9,396.0 1,055.6 16,639.4 18,039 5,063.7 0.484 CollabFlow 9,676.6 8,645.8 1,030.8 11,490.0 11,986 1,903.2 0.197

## 实验证据与条件

任务：问答、数学与专家推理、具身规划、代码生成、网络购物；6个IID和6个OOD基准
基础模型：Qwen3.5-9B作为Director和冻结执行器
比较基线：直接推理、SFT、GRPO、AFlow、FlowSteer、evolving orchestrator、SkillFlow、SkillRL
指标：QA使用EM/F1；其余使用准确率、成功率或Pass@1；5次运行均值与标准差
结果：作者报告相对最强基线，IID平均EM +2.27、综合Acc. +4.37个百分点，平均增益p<0.01；OOD平均EM +3.51、F1 +4.22个百分点，HumanEval与AFlow并列
资源条件：每基准128个评估样本，AIME 2026为30个；作者声明共享Agent群体、工具和每任务预算，消息计入预算
- 主实验覆盖6个IID和6个留出OOD基准；作者报告IID全部指标领先，OOD除HumanEval并列外领先。
  核验：原文支持；b00061—b00062、b00070—b00071、b00078及b00315支持基准划分、模型、样本数、指标、五次运行、共享资源声明及全部所列增益；HumanEval并列例外已保留。显著性仅按作者报告核验。
  - [原文 1 Introduction · b00009](https://arxiv.org/html/2609.38662v3#S1.p6.1)：We evaluate on twelve datasets spanning question answering, mathematical and expert reasoning, embodied planning, code generation, and web shopping
  - [原文 5 Experiments · b00070](https://arxiv.org/html/2609.38662v3#S5.p2.1)：Six in-distribution (IID) datasets train the Collab-Director and six out-of-distribution (OOD) datasets are held out, 128 items each (30 for AIME 2026)
  - [原文 5 Experiments · b00070](https://arxiv.org/html/2609.38662v3#S5.p2.1)：Qwen3.5-9B serves as both the Collab-Director and the frozen executor, and all methods share one Agent population, tool set and per-task budget, which also charges messages.
  - [原文 E.1 Baseline Inventory · b00321](https://arxiv.org/html/2609.38662v3#A5.SS1.p1.1)：The main comparison covers direct Qwen3.5-9B inference, SFT, GRPO, AFlow, FlowSteer, the evolving orchestrator, SkillFlow, and SkillRL
  - [原文 5 Experiments · b00062](https://arxiv.org/html/2609.38662v3#S5.T1)：Every cell is the mean over five runs; the subscript is the standard deviation across those five, propagated across benchmarks for the Avg. rows. QA averages are taken separately for EM and F1, and Acc. averages the primary metrics (accuracy, success rate, or Pass@1) of the other four benchmarks in each part.
  - [原文 5 Experiments · b00071](https://arxiv.org/html/2609.38662v3#S5.p3.1)：CollabFlow leads every IID dataset and metric (Table 1 ), 2.27 EM and 4.37 accuracy points above the strongest baseline on average, and every average gain is significant at p<10^{-2}
  - [原文 5 Experiments · b00078](https://arxiv.org/html/2609.38662v3#S5.p4.1)：With everything frozen, CollabFlow again leads every OOD row but HumanEval, where it ties AFlow, and its margins widen to 3.51 EM and 4.22 F1
任务：6个IID和6个OOD基准上的组件消融
基础模型：Qwen3.5-9B冻结执行器
比较基线：去Director训练、去递归、去通信、逐字交换、强制修订、全部OneWay
指标：套件分数百分点变化，QA使用EM
结果：去训练下降13.7/19.5个IID/OOD百分点，其中递归贡献7.6/13.6；去通信损失最大；三种通信替代下降5.5–9.8/14.3–15.6个百分点
资源条件：单次运行；保持完整模型的执行器、Agent群体和每任务预算
- 单次组件消融报告Director训练、跨轮递归和通信带来的性能差异。
  核验：原文支持；b00063—b00064、b00080支持消融对象、单次运行及所列百分点差异；b00328支持固定执行器、Agent群体和每任务预算的条件。
  - [原文 5 Experiments · b00064](https://arxiv.org/html/2609.38662v3#S5.F4)：Paradigm comparison and ablation of CollabFlow on the six IID and six OOD benchmarks (Qwen3.5-9B executor; EM for QA; one run).
  - [原文 5 Experiments · b00080](https://arxiv.org/html/2609.38662v3#S5.p6.1)：Removing director training costs 13.7 IID and 19.5 OOD points, of which recursion across rounds supplies 7.6 and 13.6. Removing communication costs most, while verbatim exchange, forced revision and all- OneWay edges cost 5.5–9.8 IID but 14.3–15.6 OOD points
  - [原文 E.3 Component Ablations · b00328](https://arxiv.org/html/2609.38662v3#A5.SS3.p1.1)：every row keeps the frozen executor, Agent population, and per-task budget of the full model.
任务：训练前64个提示组上的团队级优化
基础模型：未报告 / 未提取
比较基线：GRPO、PPO、去CTB版本
指标：平均奖励、成功率、相邻团队分布总变差TV
结果：CollabFlow分别为0.8775、92.58%、0.0937；去CTB分别为0.8578、88.28%、0.1491
资源条件：8步，每方法256次rollout，匹配奖励
- 匹配rollout与奖励的团队级比较中，作者报告CTB获得更高奖励及成功率、更小的相邻团队分布变化。
  核验：无法核验；发布时原文引用检查未通过
  - [原文 5 Experiments · b00077](https://arxiv.org/html/2609.38662v3#S5.F5)：First 64 prompt groups of training (8 steps, 256 rollouts per method); TV between consecutive team distributions.
  - [原文 5 Experiments · b00074](https://arxiv.org/html/2609.38662v3#S5.F5.3.1)：Reward and success Consistency Stability Team-level Avg. Succ. 4/4 Reward Worst Succ. Team step reward ↑ (%) ↑ (%) ↑ std ↓ task ↑ std ↓ TV ↓
  - [原文 5 Experiments · b00074](https://arxiv.org/html/2609.38662v3#S5.F5.3.1)：w/o CTB 0.8578 88.28 81.25 0.0496 78.13 9.47 0.1491 CollabFlow 0.8775 92.58 85.94 0.0353 85.94 6.04 0.0937
  - [原文 5 Experiments · b00081](https://arxiv.org/html/2609.38662v3#S5.p7.1)：Under matched rollouts and reward, CTB beats GRPO, PPO and CollabFlow without CTB on every team-level measure, with the smallest team-distribution shift

## 原文支持的局限性

- 作者承认固定Agent群体、协议、输出模式和资源上限限制表示能力；构造覆盖不意味着每项任务都有胜任Agent。
  核验：原文支持；b00353直接说明固定Agent群体、协议、输出模式和资源上限限制表示能力，并明确构造覆盖不保证每项任务存在胜任Agent。
  - [原文 Appendix I Limitations · b00353](https://arxiv.org/html/2609.38662v3#A9.p1.1)：The representation is limited by its fixed Agent population, protocols, output modes, and resource caps. Construction coverage is relative to this admissible space, and does not imply a capable Agent exists for every task.
- 作者承认真但不完整或误导性的证据仍可支持错误候选；稀疏、非平稳结果的可靠性估计未必校准，有限训练不保证理论目标分布，有效路径平衡本身也不控制中止率。
  核验：原文支持；b00355直接支持证据误导、可靠性不一定校准和有限训练不保证精确分布；b00208说明有效路径平衡把中止率留给合法性掩码及预算。
  - [原文 Appendix I Limitations · b00355](https://arxiv.org/html/2609.38662v3#A9.p3.1)：The conditional update compares tool and retrieval support with fixed rules, so authentic but incomplete or misleading evidence can still favor an incorrect candidate.
  - [原文 Appendix I Limitations · b00355](https://arxiv.org/html/2609.38662v3#A9.p3.1)：Reliability estimates from sparse or nonstationary executions need not be calibrated, and finite training does not ensure the exact terminal distribution proved under fixed conditions.
  - [原文 Theorem B.16 (Raw valid-only balance) . · b00208](https://arxiv.org/html/2609.38662v3#A2.SS9.p4.1)：Because Z absorbs p_{\mathsf{V}} , valid-path balance leaves the abort rate to the legal masks and budgets
- 作者承认单写者仅在权限执行和有序提交下避免内部写冲突，不保证计划、观测或外部一致性；消息诊断属于观察性证据，改善可能同时依赖额外计算等因素。
  核验：原文支持；b00354明确列出权限执行、有序提交和内部写者的适用条件，以及计划、观测和外部一致性的限制；同段支持诊断的观察性及额外计算等混杂因素。
  - [原文 Appendix I Limitations · b00354](https://arxiv.org/html/2609.38662v3#A9.p2.1)：The single-writer design prevents conflicts between different internal writers under enforced permissions and ordered commits, but does not guarantee correct plans, fresh observations, safe action semantics, or consistency with external participants.
  - [原文 Appendix I Limitations · b00354](https://arxiv.org/html/2609.38662v3#A9.p2.1)：Diagnostic traces are observational and may associate a message with an improvement that also depends on extra computation or other changes.

## 多智能体机制

- 角色与分工：Director设计团队，冻结执行器运行Agent；有状态任务中仅Executor可修改状态，Advisor只提供有界单向建议。
  核验：部分支持；b00024支持Director与冻结执行器分工，b00101支持内部Advisor和唯一可写Executor；但“有状态任务中仅Executor可修改状态”未保留内部Agent范围。b00320明确该限制不覆盖外部服务器，需限定为系统内部写权限。
  - [原文 4.1 Learned Agent Collaboration: What Each Round Changes · b00024](https://arxiv.org/html/2609.38662v3#S4.SS1.p1.1)：the trainable Collab-Director designs the team and a frozen executor runs its Agents
  - [原文 A.4 Communication and Output Semantics · b00101](https://arxiv.org/html/2609.38662v3#A1.T3.2)：Stateful restriction Internal Advisors provide bounded one-way guidance to the sole mutable Executor, and write permission stays with the Executor.
- 协作结构：团队表示为协议标注有向图，节点选取配置不可变的完整Agent，并指定输出规则；团队构造图与运行时通信图不同。
  核验：原文支持；b00013支持协议标注有向图、配置不可变的完整Agent及输出规则；b00163明确区分构造图和运行时通信图。
  - [原文 3 Preliminaries · b00013](https://arxiv.org/html/2609.38662v3#S3.p1.1)：A collaboration graph is an annotated directed graph G=(V,E,o) , where V\subseteq\mathcal{A}_{x} selects complete Agents with immutable profiles
  - [原文 3 Preliminaries · b00013](https://arxiv.org/html/2609.38662v3#S3.p1.1)：labels each edge with a protocol from the fixed registry \mathcal{P}=\{\textsc{FinalOnly},\textsc{OneWay},\textsc{Interactive}\} , and o is the output rule.
  - [原文 B.6 Runtime scheduling, finite execution, and a linear baseline · b00163](https://arxiv.org/html/2609.38662v3#A2.SS6.p1.1)：Construction edges add team components; runtime edges exchange messages between selected Agents. These are different graphs.
- 通信机制：FinalOnly不修订，OneWay执行一次门控，Interactive交替执行有界门控。证据按事件身份去重，自报通过测试不构成证据，自报置信度不进入评分或阈值比较。
  核验：原文支持；b00039、b00164支持三种协议的门控语义；b00137、b00142支持事件身份去重及自报测试不构成证据；b00150支持置信度不参与评分和阈值比较。
  - [原文 4.2 Message-Level Improvement: Evidence-Conditioned Communication · b00039](https://arxiv.org/html/2609.38662v3#S4.SS2.p3.1)：A protocol p fixes the edge program g^{p}_{e} that edge e runs: the identity for FinalOnly , one gate for OneWay , and a capped number of gates in alternating directions for Interactive , stopping at agreement or a decisive update.
  - [原文 B.4 Candidate versions, evidence applicability, and duplication · b00137](https://arxiv.org/html/2609.38662v3#A2.SS4.p1.1)：Copying a record copies its identifier, so a copy adds no new verification event. The runtime authenticates each record’s source, so a message that merely claims a passed test adds no evidence.
  - [原文 B.5 One-edge revision identity · b00150](https://arxiv.org/html/2609.38662v3#A2.SS5.p1.2)：Self-reported confidence enters neither s_{c} nor the threshold comparison; the revision kernel may read it among its permitted textual inputs.
- 共享记忆：系统层维护可检索文本技能库、执行回放记录，以及按图和任务簇索引的可靠性计数。
  核验：原文支持；b00095支持可检索文本技能及技能库，b00012支持执行回放记录，b00295支持按图和任务簇索引可靠性计数。
  - [原文 A.2 Agent Profiles · b00095](https://arxiv.org/html/2609.38662v3#A1.SS2.p2.1)：The construction interface also supports a bind_skill action that attaches a retrieved textual strategy to one selected Agent
  - [原文 3 Preliminaries · b00012](https://arxiv.org/html/2609.38662v3#S3.F3)：the frozen executor runs it, and the evaluated outcome becomes a replay record
  - [原文 C.2 Reliability Statistics and Reward Bookkeeping · b00295](https://arxiv.org/html/2609.38662v3#A3.SS2.p1.3)：with counts keyed by the graph and its task cluster c_{x} .
- 调度方式：无环通信图按确定性拓扑顺序访问边，有环图固定顺序扫描至上限；更新异步串行，读取此前更新后的状态。有状态Advisor在状态修改之间的决策边界交接。
  核验：部分支持；b00163、b00165支持确定性顺序、串行异步更新和状态修改之间的Advisor交接；但有环图是“至多”执行规定扫描轮数，且预算耗尽会提前停止。结论“扫描至上限”遗漏这一停止条件，应改为有界扫描、预算耗尽时提前停止。
  - [原文 B.6 Runtime scheduling, finite execution, and a linear baseline · b00163](https://arxiv.org/html/2609.38662v3#A2.SS6.p1.1)：For an acyclic runtime E , choose the lexicographically resolved topological order and visit each outgoing edge program once, with a fixed order among edges having the same source.
  - [原文 B.6 Runtime scheduling, finite execution, and a linear baseline · b00163](https://arxiv.org/html/2609.38662v3#A2.SS6.p1.1)：For a cyclic runtime E , visit edge programs in fixed order for at most R_{\rm comm}<\infty sweeps.
  - [原文 B.6 Runtime scheduling, finite execution, and a linear baseline · b00163](https://arxiv.org/html/2609.38662v3#A2.SS6.p1.1)：The schedule is asynchronous and serial: every elementary update sees the state left by previous updates, rather than an unspecified mixture of snapshots.
  - [原文 B.6 Runtime scheduling, finite execution, and a linear baseline · b00165](https://arxiv.org/html/2609.38662v3#A2.SS6.p3.1)：Stateful Advisor messages are tool-disabled and feed the Executor’s next decision; they are delivered at declared decision boundaries, between state mutations.
- 同等资源的单 Agent 比较：作者声明结构对照共享执行器、Agent群体和每任务预算。单次运行中，带工具单Agent的HotpotQA EM为47.66，CollabFlow为63.28；相同实际计算量未由该声明确立。
  核验：原文支持；b00328支持共享执行器、Agent群体及预算；b00063—b00064支持单次运行的HotpotQA EM为47.66和63.28。共享预算声明本身没有确立实际计算量相同。
  - [原文 E.3 Component Ablations · b00328](https://arxiv.org/html/2609.38662v3#A5.SS3.p1.1)：every row keeps the frozen executor, Agent population, and per-task budget of the full model.
  - [原文 5 Experiments · b00063](https://arxiv.org/html/2609.38662v3#S5.F4.2)：Variant IID OOD HotpotQA TriviaQA AIME MedXpertQA ALFWorld MBPP+ MuSiQue NQ-Open MATH GPQA HumanEval WebShop EM EM Acc. Acc. SR Pass@1 EM EM Acc. Acc. Pass@1 SR Single agent with tools 47.66
  - [原文 5 Experiments · b00063](https://arxiv.org/html/2609.38662v3#S5.F4.2)：CollabFlow (full) 63.28 88.28 76.67 98.44 97.66 85.16 46.88 92.97 95.31 79.69 85.94 84.38
  - [原文 5 Experiments · b00064](https://arxiv.org/html/2609.38662v3#S5.F4)：Paradigm comparison and ablation of CollabFlow on the six IID and six OOD benchmarks (Qwen3.5-9B executor; EM for QA; one run).

## 自进化机制

- 改变对象：跨轮更新Director、反向核、归一化器、技能库及可靠性记录；答案评估器、执行器、Agent群体和更新规则保持固定。
  核验：原文支持；b00353直接列出跨轮变化的Director、反向核、归一化器、技能库和可靠性记录，以及保持固定的四类组件。
  - [原文 Appendix I Limitations · b00353](https://arxiv.org/html/2609.38662v3#A9.p1.1)：CollabFlow is a bounded form of recursive self-improvement: its answer evaluator, executor, Agent population, and update rules stay fixed across rounds, and only the director (with its backward kernel and normalizer), the skill library, and the reliability records change.
- 反馈来源：反馈包括答案评分与去重成功记录；奖励结合Jeffreys平滑成功率和结构先验，批内使用旧计数，批后更新。二元成功计数与F1等连续评分分开。
  核验：原文支持；b00058、b00229支持答案评分、Jeffreys平滑成功率、结构先验和批后去重计数更新；b00295明确区分二元成功计数与F1等连续评分。
  - [原文 4.3 Team-Level Improvement: Collaborative Trajectory Balance · b00058](https://arxiv.org/html/2609.38662v3#S4.SS3.p5.2)：the reward multiplies the answer score by two factors with no tuned weight: the team’s Jeffreys-smoothed posterior success rate ( Jeffreys, 1946 ) and a minimum-description-length structural prior ( Rissanen, 1978 )
  - [原文 B.11 Reward snapshots, positive support, and moving counters · b00229](https://arxiv.org/html/2609.38662v3#A2.SS11.p2.2)：Each execution record increments the counts once, however often it is copied. All rewards in a batch use its pre-batch counts; completed outcomes update counts only after that batch.
  - [原文 C.2 Reliability Statistics and Reward Bookkeeping · b00295](https://arxiv.org/html/2609.38662v3#A3.SS2.p1.3)：Binary success counts are separate from a continuous factual score such as F1.
- 更新方式：CTB以自身记录跨轮重训Director，同时更新反向策略和归一化器；技能库根据使用技能的团队结果进行增删改。
  核验：原文支持；b00083、b00286支持以自身记录跨轮更新Director、反向策略和归一化器；b00095支持依据使用技能的团队结果增删改技能。
  - [原文 6 Conclusion · b00083](https://arxiv.org/html/2609.38662v3#S6.p1.1)：Collaborative Trajectory Balance retrains the Collab-Director on its own records across rounds
  - [原文 C.1 Training Procedure · b00286](https://arxiv.org/html/2609.38662v3#A3.SS1.p1.1)：Each round keeps the Agent population and executor fixed, collects several team rollouts for each sampled task, and updates the director, backward policy, and normalizer
  - [原文 A.2 Agent Profiles · b00095](https://arxiv.org/html/2609.38662v3#A1.SS2.p2.1)：Between evolution steps, the loop adds, modifies or deletes library skills from the outcomes of the teams that used them
- 发生阶段：训练阶段跨轮更新参数和记录，任务内通过通信修订候选答案；推理时冻结Director及执行器，构造并运行合法团队。
  核验：原文支持；b00286支持训练阶段参数和可靠性记录更新，b00038支持任务内候选修订，b00290明确推理时冻结Director并用冻结执行器运行合法团队。
  - [原文 C.1 Training Procedure · b00286](https://arxiv.org/html/2609.38662v3#A3.SS1.p1.1)：Each round keeps the Agent population and executor fixed, collects several team rollouts for each sampled task, and updates the director, backward policy, and normalizer; its unique outcomes then update the reliability counters used by the next round.
  - [原文 4.2 Message-Level Improvement: Evidence-Conditioned Communication · b00038](https://arxiv.org/html/2609.38662v3#S4.SS2.p2.2)：where \mathrm{Revise}_{c} is one bounded, tool-free call in place of a re-execution, and its output is filtered and rescored
  - [原文 C.1 Training Procedure · b00290](https://arxiv.org/html/2609.38662v3#A3.SS1.p4.1)：At inference, freeze the Collab-Director, construct a legal team, and execute it with the frozen executor.
- 保留范围：参数、技能与记录在训练中跨任务、跨轮持续更新。保持性实验仅筛选最大单步增益的20步：成功率34.4%升至75.0%，15步在5步后仍领先；不能据此代表全部步骤的长期保持率。
  核验：原文支持；b00286、b00095支持跨任务采样及跨轮参数、技能和记录更新；b00077、b00082明确只分析最大单步增益的20步，并支持34.4%、75.0%及15步五步后仍领先。结论保留了筛选范围，未推广为全部步骤的长期保持率。
  - [原文 C.1 Training Procedure · b00286](https://arxiv.org/html/2609.38662v3#A3.SS1.p1.1)：Each round keeps the Agent population and executor fixed, collects several team rollouts for each sampled task, and updates the director, backward policy, and normalizer; its unique outcomes then update the reliability counters used by the next round.
  - [原文 A.2 Agent Profiles · b00095](https://arxiv.org/html/2609.38662v3#A1.SS2.p2.1)：Between evolution steps, the loop adds, modifies or deletes library skills from the outcomes of the teams that used them
  - [原文 5 Experiments · b00082](https://arxiv.org/html/2609.38662v3#S5.p8.1)：Over the twenty steps with the largest one-step gain, success on the evolved task rises from 34.4% to 75.0%, 15 steps stay ahead five steps later
- 独立任务验证：作者报告6个OOD数据集留出，冻结Director、Agent群体和训练配置，不以OOD评估实例训练、选择提示或调参；适配器在查看结果前固定，训练测试标识及衍生重复源不重叠。
  核验：原文支持；b00070支持六个OOD基准留出；b00319支持冻结配置、禁止使用OOD评估实例训练或选提示调参及预先固定适配器；b00316支持训练测试标识及衍生重复实例不重叠。结论恰当限定为作者声明。
  - [原文 5 Experiments · b00070](https://arxiv.org/html/2609.38662v3#S5.p2.1)：Six in-distribution (IID) datasets train the Collab-Director and six out-of-distribution (OOD) datasets are held out
  - [原文 D.3 Frozen Held-out Evaluation · b00319](https://arxiv.org/html/2609.38662v3#A4.SS3.p1.1)：The OOD protocol freezes the Collab-Director, Agent population, and training-derived configuration. No OOD evaluation instance is used for policy training, prompt selection, or hyperparameter tuning. Benchmark-specific adapters were fixed before outcome inspection.
  - [原文 D.1 Benchmark Inventory and Splits · b00316](https://arxiv.org/html/2609.38662v3#A4.SS1.p2.1)：Train and test identifiers are disjoint, including derived prompts and duplicated source instances.

## 系统分析与启发（推测）

- 系统分析（依据c009、c020）：有效完成条件下的奖励比例分布、目标漂移界与实际任务性能是不同对象，理论结论不能解释为包含中止结果的无条件分布保证或性能单调提升保证。
- 系统分析（依据c032）：仅筛选最大增益步骤可能高估整体保持效果，应补充全部步骤及独立留出任务的统计。
- 系统分析（依据c012、c027）：共享预算声明、单次单Agent对照和较低平均token支持效率讨论，但不足以独立识别等实际计算量下协作的因果收益。

## 待研究问题（系统分析）

- 系统分析问题：技能更新后，图和任务簇计数键如何区分技能版本，避免混用行为已改变的团队记录？
- 系统分析问题：全部进化步骤的编辑接受、回滚、遗忘与跨任务保持表现如何？
- 系统分析问题：等实际token或等模型调用量的单Agent比较、多次独立运行的通信消融，是否仍支持当前收益？

## 缺失信息

- 本次提供的原文未明确实际预算数值、修订token上限、通信扫描上限、完整训练轮数、优化器与回放配置，以及β、KL权重和奖励底值的实验取值。
- 本次材料未完整展开技能编辑器、编辑接受或回滚规则、技能版本与可靠性计数键的对应关系，也未提供全部进化步骤的保持性统计。
- 主结果表和单Agent结构对照性能行已提供；仍未明确各基线实际未匹配配置，不能将共享预算声明等同于实际计算量完全匹配。
- 表H.2所覆盖的任务集合、样本数、基础模型和独立运行次数在所给成本段未明确；团队级CTB比较的具体模型未单独明确，故对应字段置null。
- 系统层技能库、回放和计数已有描述，但本次材料未确立所有Agent可任意读写的共享黑板。
- 仅依据本次提供的原文分块分析；未读取前作或仓库，未独立核查评估协议执行情况，未复现实验，不能确认首次性、创新优先权或可复现性。上述缺口不等同于论文全文或代码未提供。

## 阅读范围

读取 6 / 6 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Recursive self-improvement (RSI) lets a system improve from its own outcomes; in LLM-based multi-agent systems, Agents refine one another within a task, and outcomes improve how they collaborate across tasks. However, existing multi-agent collaboration leaves this loop open: collaboration is pre-defined at the operator level, topology-only learning keeps verbatim exchange that propagates errors, and reward maximization on a system's own outcomes concentrates on a few teams. To address these challenges, we propose CollabFlow, an RSI system of Learned Agent Collaboration: a trainable Collab-Director constructs teams of complete Agents, a frozen executor runs them, and each round's outcomes retrain the director. Within each round, the edges of a collaboration graph carry protocols of Evidence-Conditioned Communication: a receiver adopts a differing answer only when the sender's evidence is stronger by a margin, so the director learns who communicates and how. Across rounds, we further propose Collaborative Trajectory Balance (CTB), a flow-based objective that credits each team once across its construction orders and targets a reward-proportional distribution over teams, so several good teams stay in play. We also bound how far this self-generated target moves between rounds, which shrinks as records accumulate. On twelve datasets, CollabFlow outperforms all baselines and keeps improving across rounds. Code is available at https://anonymous.4open.science/r/CollabFlow-631E.
