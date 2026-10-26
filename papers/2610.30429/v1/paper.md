# RoleFlow: Self-Evolving Multi-Role Agentic Collaboration via Structural Adaptation

作者：Yi Ge, Pan Wang, Xuehao Cui, Zian Zeng, Xu Hu, Heng Huang, Furong Huang
原文：https://arxiv.org/abs/2610.30429v1
首次提交：2026-10-21T20:37:32Z · 版本更新：2026-10-21T20:37:32Z
版本：v1 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- RoleFlow 针对固定协作结构和结构编辑信用分配困难，通过反馈驱动的原子编辑、按需角色合成及 SECPO 训练适应角色链；作者报告七基准平均67.1分，比 W4S 高4.7分。
  核验：原文支持；b00001、b00006、b00009支持所述问题定位及方法；b00049明确报告七基准平均67.1分、领先W4S 4.7分。结论将数字归于作者报告，未扩大为独立验证结果。
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.30429v1#S1.p4.1)：A trainable Global Router (GR) constructs task-specific role chains and refines them through atomic structural edits, while synthesizing specialized roles on demand.
  - [原文 1 Introduction · b00009](https://arxiv.org/html/2610.30429v1#S1.I1.i2.p1.1)：We propose SECPO , a structure-aware policy optimization method that estimates the counterfactual contribution of individual structural edits and assigns targeted credit to edit-specific tokens.
  - [原文 4.2 Main Results · b00049](https://arxiv.org/html/2610.30429v1#S4.SS2.p1.1)：RoleFlow achieves the highest average score of 67.1 across seven benchmarks, outperforming the strongest competing multi-agent system, W4S, by 4.7 points and ranking first on five benchmarks.

## 研究问题

- 作者指出，预定义协作结构限制任务适应性；动态编排采用的轨迹级奖励难以识别单次结构修改的贡献。
  核验：原文支持；b00001明确提出预定义结构限制适应性，以及轨迹级奖励难以识别单次结构改变贡献这两个问题；结论保留了作者观点的归属。
  - [原文 摘要 · b00001](https://arxiv.org/html/2610.30429v1#abstract1.1)：Large language model (LLM) based multi-agent systems often rely on predefined collaboration structures, limiting their adaptability to evolving task requirements. Although recent approaches enable dynamic orchestration, trajectory-level rewards they apply assign one outcome to each decision, ofen struggling to identify the contributions of individual structural changes.

## 方法怎样工作

- GR 构建初始角色链，冻结执行器依次执行，各角色接收任务及此前输出；独立任务验证器返回判决、分数和缺陷，暂存记忆保存轨迹与验证历史。
  核验：原文支持；b00022支持GR生成初始角色链；b00016支持冻结执行器顺序执行并传入任务及此前输出；b00017支持独立验证器的三类返回值和暂存记忆内容。
  - [原文 3.2 RoleFlow: Feedback-Driven Structural Adaptation · b00022](https://arxiv.org/html/2610.30429v1#S3.SS2.p1.1)：The GR first writes a plan that decomposes the task and names the roles of \mathrm{RFC}_{0} .
  - [原文 3.1 Problem Formulation · b00016](https://arxiv.org/html/2610.30429v1#S3.SS1.p1.1)：A frozen executor LLM runs these roles sequentially, with each role receiving the task and the outputs of preceding roles.
  - [原文 3.1 Problem Formulation · b00017](https://arxiv.org/html/2610.30429v1#S3.SS1.p2.1)：A separate task validator V assesses the output and trace, returning a pass/reject indicator h_{t}\in\{0,1\} , score s_{t} , and deficit description d_{t} . Scratch memory \sigma_{t} stores the execution traces and validation history.
- 验证拒绝后，每轮至多进行一次增加、删除、替换、位置交换或空编辑；缺失角色按需合成，有缺陷却提出空编辑时触发缺陷驱动合成。验证通过或达到轮数上限即停止。
  核验：原文支持；b00018列出五类编辑；b00020限定拒绝后提出、每轮至多一次；b00023、b00074支持两种角色合成触发条件；b00022支持停止条件。
  - [原文 3.1 Problem Formulation · b00018](https://arxiv.org/html/2610.30429v1#S3.SS1.p3.2)：\textsc{Add}(\rho) (insert \rho before the final role), \textsc{Prune}(\rho) (remove \rho ), \textsc{Swap}(\rho,\rho^{\prime}) (replace \rho by \rho^{\prime} in place), \textsc{Reroute}(p,q) (exchange the roles at positions p and q ), and the null edit
  - [原文 3.1 Problem Formulation · b00020](https://arxiv.org/html/2610.30429v1#S3.SS1.p4.1)：An edit is proposed only after rejection, and each cycle applies at most one edit.
  - [原文 A.3 Inference Procedure · b00074](https://arxiv.org/html/2610.30429v1#A1.SS3.p1.1)：A role the GR names but \mathcal{R}_{0} lacks is synthesized by the LibraryExpander, and a null edit under a deficit triggers deficit-driven synthesis.
  - [原文 3.2 RoleFlow: Feedback-Driven Structural Adaptation · b00022](https://arxiv.org/html/2610.30429v1#S3.SS2.p1.1)：The edited chain is then executed in the next cycle, and the process stops upon validation success or after T_{\max} adaptation cycles
- 训练时，SECPO 在同一链状态比较编辑与不编辑的奖励；差值超过阈值才提交编辑。局部优势额外分配到编辑 token，与组相对优势共同训练 GR；未提交编辑的反事实对仍参与更新。
  核验：原文支持；b00072明确描述同状态编辑与不编辑比较、超过阈值才保留编辑及编辑token优势叠加；b00031明确未提交的反事实对仍参与策略更新。
  - [原文 A.2 Detailed Global Router Learning Procedure · b00072](https://arxiv.org/html/2610.30429v1#A1.SS2.p1.1)：executes the same chain state once with the candidate edit and once without it, keeps the edit only when the reward difference A^{(t)}_{i} exceeds the threshold \delta (Eq. 2 ), adds \lambda A^{(t)}_{i} to the tokens that spell the edit on top of the group-relative advantage
  - [原文 Same-state counterfactual advantage. · b00031](https://arxiv.org/html/2610.30429v1#S3.SS3.SSS0.Px1.p4.1)：Otherwise, the chain remains unchanged. Importantly, the counterfactual pair contributes to the policy update even when the candidate edit is not committed.

## 作者声称的贡献

- 作者自述提出 RoleFlow，以反馈驱动的原子结构编辑和按需专家角色合成实现协作结构适应。
  核验：原文支持；b00008直接支持作者对RoleFlow及其原子编辑、按需专家合成机制的贡献自述；结论未声称首创性已获确认。
  - [原文 1 Introduction · b00008](https://arxiv.org/html/2610.30429v1#S1.I1.i1.p1.1)：We introduce RoleFlow , a self-evolving multi-role agentic system that enables feedback-driven structural adaptation through atomic edits and on-demand specialist synthesis.
- 作者自述提出 SECPO，估计单次结构编辑的反事实贡献，并将信用定向分配给编辑相关 token；这不构成对首创性的独立确认。
  核验：原文支持；b00009支持SECPO的作者自述及其信用分配方式。该块没有提供独立的首创性核验，结论正确保留了这一证据边界。
  - [原文 1 Introduction · b00009](https://arxiv.org/html/2610.30429v1#S1.I1.i2.p1.1)：We propose SECPO , a structure-aware policy optimization method that estimates the counterfactual contribution of individual structural edits and assigns targeted credit to edit-specific tokens.

## 本文报告的方法比较

- 作者报告 RoleFlow 七基准平均分领先 W4S 4.7分；表中直接提示 Claude-Haiku-4.5 的数学和两个代码基准得分均高于 RoleFlow。
  核验：原文支持；b00049报告平均分领先4.7分；b00044的列标题及数据表明，Claude-Haiku-4.5在MATH-500、MBPP、HumanEval分别为92.0、90.6、96.9，均高于RoleFlow的81.1、89.0、95.7。
  - [原文 4.2 Main Results · b00049](https://arxiv.org/html/2610.30429v1#S4.SS2.p1.1)：RoleFlow achieves the highest average score of 67.1 across seven benchmarks, outperforming the strongest competing multi-agent system, W4S, by 4.7 points and ranking first on five benchmarks.
  - [原文 4 Experiments · b00044](https://arxiv.org/html/2610.30429v1#S4.T1.4.1)：Claude-Haiku-4.5 47.2 26.4 28.1 92.0 90.6 96.9 59.5 63.0
  - [原文 4 Experiments · b00044](https://arxiv.org/html/2610.30429v1#S4.T1.4.1)：RoleFlow 55.6 \pm 2.2 43.5 \pm 1.8 42.1 \pm 1.4 81.1 \pm 0.5 89.0 \pm 0.2 95.7 \pm 0.9 62.6 \pm 1.2 67.1
- 以 GR 最常用的固定链替代 GR，HotpotQA 为45.7 F1，完整系统为55.6。表2说明 T_max=1 仍允许一次编辑，因此不能将该配置称为完全禁用适应。
  核验：原文支持；b00052明确给出固定链45.7与完整系统55.6 F1；b00050明确T_max=1允许一次编辑，因此结论对“完全禁用适应”的纠正有据，也揭示了b00052相关措辞的不一致。
  - [原文 Online Refinement Matters. · b00052](https://arxiv.org/html/2610.30429v1#S4.SS3.SSS0.Px1.p1.1)：Replacing the GR with its most frequent fixed chain yields 45.7 F1 on HotpotQA, essentially the direct executor’s 45.6, versus 55.6 for RoleFlow.
  - [原文 4.3 Ablation Study · b00050](https://arxiv.org/html/2610.30429v1#S4.T2)：T_{\max} : adaptation cycles allowed after cycle 0 (3 in RoleFlow; 1 allows a single edit).
- SECPO 比 GRPO 在三个 QA 基准分别提高2.1、2.5、2.6 F1，但 MBPP 略低、HumanEval 持平；每训练题实际链执行均值由9.1增至13.5。
  核验：原文支持；b00054支持三个QA增益、MBPP略低及HumanEval持平；b00057明确链执行次数是每训练题的实际均值，由标准GRPO的9.1增至SECPO的13.5。
  - [原文 SECPO Improves Structural Learning. · b00054](https://arxiv.org/html/2610.30429v1#S4.SS3.SSS0.Px3.p1.1)：Replacing SECPO with GRPO ( Shao et al., 2024 ) lowers mean F1 by 2.1, 2.5, and 2.6 points on HotpotQA, 2Wiki, and MuSiQue, respectively (Table 2 ).
  - [原文 SECPO Improves Structural Learning. · b00054](https://arxiv.org/html/2610.30429v1#S4.SS3.SSS0.Px3.p1.1)：The advantage is not universal: SECPO slightly trails GRPO on MBPP and ties it on HumanEval, where validation triggers fewer corrective edits.
  - [原文 Same-State Credit Matters. · b00057](https://arxiv.org/html/2610.30429v1#S4.SS3.SSS0.Px4.p1.1)：This comes at a cost: realized chain executions rise from 9.1 to 13.5 per training question relative to standard GRPO.

## 实验证据与条件

任务：多跳问答、数学推理、代码生成、Web 交互，共七个基准
基础模型：Qwen2.5-7B-Instruct GR；gpt-4o-mini 执行器
比较基线：W4S（作者称最强竞争多智能体系统）
指标：QA：F1；MATH-500：准确率；MBPP/HumanEval：Pass@1；WebShop：任务分数；七项平均分
结果：HotpotQA 55.6±2.2；2Wiki 43.5±1.8；MuSiQue 42.1±1.4；MATH-500 81.1±0.5；MBPP 89.0±0.2；HumanEval 95.7±0.9；WebShop 62.6±1.2；平均67.1，比 W4S 高4.7分。
资源条件：训练使用4张 NVIDIA H200，运行三次；QA 每题一条链；数学每题20条链，严格多数优先，否则由执行器选择候选；代码每题10条链，测试筛选后提交一个程序。
- 七基准主实验报告三次训练运行的均值与标准差；数学采用多候选投票及无严格多数时的模型选择，代码采用多候选测试筛选。
  核验：原文支持；b00044、b00047、b00048支持RoleFlow的七项结果、指标、三次训练统计和模型硬件条件；b00076支持QA单链、数学20链及无严格多数时模型选择、代码10链测试筛选。三次训练统计应理解为RoleFlow结果；b00089另说明直接提示基线采用三次回答均值。
  - [原文 4 Experiments · b00044](https://arxiv.org/html/2610.30429v1#S4.T1.4.1)：HotpotQA 2Wiki OOD MuSiQue OOD MATH-500 MBPP HumanEval OOD WebShop Avg.
  - [原文 4 Experiments · b00044](https://arxiv.org/html/2610.30429v1#S4.T1.4.1)：RoleFlow 55.6 \pm 2.2 43.5 \pm 1.8 42.1 \pm 1.4 81.1 \pm 0.5 89.0 \pm 0.2 95.7 \pm 0.9 62.6 \pm 1.2 67.1
  - [原文 Metric. · b00047](https://arxiv.org/html/2610.30429v1#S4.SS1.SSS0.Px3.p1.1)：We report F1 for QA, accuracy for MATH-500, Pass@1 for MBPP and HumanEval, and the WebShop score. Results are means and standard deviations over three training runs.
  - [原文 Implementation. · b00048](https://arxiv.org/html/2610.30429v1#S4.SS1.SSS0.Px4.p1.1)：We train the GR with SECPO using Qwen2.5-7B-Instruct in verl ( Sheng et al., 2024 ) on four NVIDIA H200 GPUs; roles are executed by gpt-4o-mini.
  - [原文 4.2 Main Results · b00049](https://arxiv.org/html/2610.30429v1#S4.SS2.p1.1)：RoleFlow achieves the highest average score of 67.1 across seven benchmarks, outperforming the strongest competing multi-agent system, W4S, by 4.7 points
  - [原文 Sampling and selection. · b00076](https://arxiv.org/html/2610.30429v1#A1.SS3.SSS0.Px1.p1.1)：One chain answers each QA question. On MATH-500 we sample twenty chains per problem and take the majority answer. When no answer wins more than half of the votes, one call of the executor LLM, which does not see the reference answer, picks one of the candidate answers.
  - [原文 Sampling and selection. · b00076](https://arxiv.org/html/2610.30429v1#A1.SS3.SSS0.Px1.p1.1)：On MBPP and HumanEval we sample ten chains per problem and submit one program. We pick the program that passes the most public example tests and, among those, the most unit tests that the executor LLM writes from the task statement
任务：HotpotQA 训练及效率比较；HotpotQA、2Wiki、MuSiQue 测试
基础模型：Qwen2.5-7B-Instruct GR；gpt-4o-mini 执行器
比较基线：标准 GRPO、增加优化更新的 GRPO、增加 rollout 的 GRPO、COMA-Operator
指标：F1；训练 token；GPU-h；每训练题实际链执行次数
结果：SECPO 比标准 GRPO 分别高2.1、2.5、2.6 F1；增加 GRPO 预算最多提高1.0 F1；COMA-Operator 为55.6/41.4/36.6，SECPO 为55.6/43.5/42.1。
资源条件：标准 GRPO：4.26M token、2.6 GPU-h、每题9.1次链执行；增加更新：7.33M token、3.4 GPU-h；增加 rollout：7.55M token、3.5 GPU-h；SECPO：5.07M token、3.7 GPU-h、每题13.5次链执行。
- 信用分配消融比较标准 GRPO、增加更新或 rollout 的 GRPO 与 COMA-Operator；表3同时给出训练 token、GPU 时和链执行次数。
  核验：原文支持；b00055—b00057支持比较对象、三个QA结果及资源数据。表中标准GRPO和SECPO分别为4.26M/5.07M token、2.6/3.7 GPU-h、9.1/13.5次执行；增加更新和rollout的资源值也与结论一致。b00069支持模型条件。
  - [原文 SECPO Improves Structural Learning. · b00055](https://arxiv.org/html/2610.30429v1#S4.T3)：Efficiency comparison of SECPO with alternative credit signals and training budgets for the Global Router on HotpotQA.
  - [原文 Same-State Credit Matters. · b00057](https://arxiv.org/html/2610.30429v1#S4.SS3.SSS0.Px4.p1.1)：Increasing GRPO updates or rollouts improves QA F1 by at most 1.0 point, while consuming more training tokens than SECPO. COMA-Operator matches SECPO on HotpotQA (55.6) but trails on 2Wiki and MuSiQue (41.4/36.6 versus 43.5/42.1)
  - [原文 SECPO Improves Structural Learning. · b00056](https://arxiv.org/html/2610.30429v1#S4.T3.2)：GRPO 5 5 1 ✗ Group Mean 20 0 9.1 1.00 \times 4.26 2.6 53.5 ref. 41.0 ref. 39.5 ref.
  - [原文 SECPO Improves Structural Learning. · b00056](https://arxiv.org/html/2610.30429v1#S4.T3.2)：GRPO, Optimizer Updates \uparrow 5 10 1 ✗ Group Mean 20 10.0 1.09 \times 7.33 3.4
  - [原文 SECPO Improves Structural Learning. · b00056](https://arxiv.org/html/2610.30429v1#S4.T3.2)：GRPO, Rollouts \uparrow ( K=9 ) 9 5 1 ✗ Group Mean 36 16.2 1.78 \times 7.55 3.5
  - [原文 SECPO Improves Structural Learning. · b00056](https://arxiv.org/html/2610.30429v1#S4.T3.2)：RoleFlow 5 5 2 ✓ No-Edit Rerun 35 13.5 1.48 \times 5.07 3.7 55.6 ( + 2.1) 43.5 ( + 2.5) 42.1 ( + 2.6)
  - [原文 A.1 Training Configuration · b00069](https://arxiv.org/html/2610.30429v1#A1.SS1.p1.1)：We train the GR with SECPO using Qwen2.5-7B-Instruct as the backbone in verl ( Sheng et al., 2024 ) , updating all parameters, while gpt-4o-mini executes the roles and the LibraryExpander.
任务：MBPP、HumanEval
基础模型：以 gpt-4o-mini 为执行器训练的 GR；测试执行器包括 Llama-3.1-8B-Instruct、gpt-4o-mini
比较基线：未报告 / 未提取
指标：Pass@1 增益
结果：Llama-3.1-8B-Instruct 分别提高11.7、16.0点；gpt-4o-mini 分别提高5.3、7.4点。
资源条件：更换执行器后不重新训练 GR；完整预算未在提供文本中给出。
- 跨执行器实验报告，以 gpt-4o-mini 训练的 GR 无需重训即可改善所评估执行器；具体增益基线在提供文本中未明确。
  核验：原文支持；b00064明确报告无需重训、所评估执行器均改善，以及两种执行器在MBPP和HumanEval上的四个增益数字；该段未明确增益的具体比较基线，结论将baseline保留为null是恰当的。
  - [原文 Cross-Executor Generalization. · b00064](https://arxiv.org/html/2610.30429v1#S4.SS5.SSS0.Px3.p1.1)：Figure 6 shows that the GR trained with gpt-4o-mini improves all evaluated executors without retraining. Llama-3.1-8B-Instruct gains 11.7 and 16.0 Pass@1 on MBPP and HumanEval, compared with 5.3 and 7.4 for gpt-4o-mini.

## 原文支持的局限性

- 作者明确指出，新领域必须提供逐轮判决与缺陷反馈的验证器；推理成本高于免训练流水线，SECPO 训练每次编辑额外执行一条链。
  核验：原文支持；b00067直接支持新领域所需验证器、逐轮判决与缺陷反馈、推理成本比较，以及SECPO训练每次编辑额外执行一条链。
  - [原文 Limitations · b00067](https://arxiv.org/html/2610.30429v1#Sx1.p1.1)：RoleFlow requires a task validator that returns a pass or reject verdict and a deficit for every cycle, so a new domain needs such a check before the GR can be trained or run. Inference costs more than training-free pipelines and SECPO training executes one additional chain per edit.
- 作者承认，多编辑训练变体仍按每轮单编辑测试，存在训练与测试不匹配；该消融支持单编辑配置，但不能隔离其机制贡献。
  核验：原文支持；b00058明确承认多编辑训练变体按单编辑测试造成训练与测试不匹配，并明确表示该比较支持单编辑配置但未隔离机制。
  - [原文 Atomic Edits Preserve Credit Granularity. · b00058](https://arxiv.org/html/2610.30429v1#S4.SS3.SSS0.Px5.p1.1)：Since these variants are evaluated with one edit per cycle, train–test mismatch also contributes to the comparison; the evidence supports the single-edit configuration without isolating that mechanism.
- 作者将结构修订相对额外采样的质量与成本优势限定于所测设置，明确不据此声称普遍降低计算量。
  核验：原文支持；b00062明确将质量与成本优势限定于该设置，并直接否认由此推出普遍更低计算量；结论保留了适用范围。
  - [原文 Refinement Versus Resampling. · b00062](https://arxiv.org/html/2610.30429v1#S4.SS5.SSS0.Px1.p1.1)：Under this setting, investing inference in revising collaboration yields a more favorable quality–cost trade-off than sampling additional answers; it does not imply universally lower compute.

## 多智能体机制

- 角色与分工：角色由名称、系统提示词和能力标签定义，同一冻结执行器依次实现角色；默认链以 Planner 开始、Validator 结束。
  核验：原文支持；b00016明确列出角色的名称、系统提示词和能力标签，说明冻结执行器顺序实现角色，并限定Planner起始、Validator结束为默认配置。
  - [原文 3.1 Problem Formulation · b00016](https://arxiv.org/html/2610.30429v1#S3.SS1.p1.1)：Each role \rho specifies a name, a system prompt, and capability tags.
  - [原文 3.1 Problem Formulation · b00016](https://arxiv.org/html/2610.30429v1#S3.SS1.p1.1)：A frozen executor LLM runs these roles sequentially, with each role receiving the task and the outputs of preceding roles. By default, the chain begins with a Planner and ends with a Validator.
- 协作结构：GR 依据验证反馈选择并修订角色链；LibraryExpander 根据角色名、任务和当前缺陷合成缺失角色规格。
  核验：原文支持；b00015支持GR依据验证反馈选择和修订角色链；b00023明确LibraryExpander使用角色名、任务和当前缺陷合成缺失角色规格。
  - [原文 3 Approach · b00015](https://arxiv.org/html/2610.30429v1#S3.p1.1)：Its Global Router (GR) selects and revises a chain of specialized roles using validation feedback.
  - [原文 3.2 RoleFlow: Feedback-Driven Structural Adaptation · b00023](https://arxiv.org/html/2610.30429v1#S3.SS2.p2.1)：If the GR names a role absent from \mathcal{R} , a LibraryExpander synthesizes its specification from the role name, task, and current deficit.
- 通信机制：每个角色对应一次执行器调用，角色提示词作为系统消息，任务及此前角色输出组成用户消息。
  核验：原文支持；b00100明确每个角色对应一次执行器调用，并说明系统消息与用户消息的组成。该块另述代码任务拒绝后的修复备注，但不否定结论所述基本消息结构。
  - [原文 Role execution. · b00100](https://arxiv.org/html/2610.30429v1#A3.SS2.SSS0.Px1.p1.1)：The executor LLM implements each role with one call. The system message is the role’s system prompt, and the user message is assembled as follows from the task and the outputs of the earlier roles.
- 共享记忆：任务暂存记忆保存执行轨迹与验证历史；训练共享角色库保存经回报门控接纳的角色规格，供后续训练步骤使用。
  核验：原文支持；b00017支持暂存记忆内容；b00039支持训练后以回报门控接纳合成角色规格；b00041支持共享角色库供后续训练步骤使用。
  - [原文 3.1 Problem Formulation · b00017](https://arxiv.org/html/2610.30429v1#S3.SS1.p2.1)：Scratch memory \sigma_{t} stores the execution traces and validation history.
  - [原文 3.4 On-Demand Role Synthesis and Library Growth · b00039](https://arxiv.org/html/2610.30429v1#S3.SS4.p1.1)：After each training step, a return gate determines which synthesized role specifications enter the shared library.
  - [原文 3.4 On-Demand Role Synthesis and Library Growth · b00041](https://arxiv.org/html/2610.30429v1#S3.SS4.p3.1)：The shared library is then available to subsequent training steps.
- 调度方式：角色顺序执行，验证拒绝后才提出编辑，每轮至多一次；推理首次接受即停止，最多执行1+T_max次链。
  核验：原文支持；b00016支持顺序执行；b00020支持拒绝后编辑及每轮至多一次；b00074明确推理首次接受即停止，并给出最多1+T_max次链执行的上限。
  - [原文 3.1 Problem Formulation · b00016](https://arxiv.org/html/2610.30429v1#S3.SS1.p1.1)：A frozen executor LLM runs these roles sequentially, with each role receiving the task and the outputs of preceding roles.
  - [原文 3.1 Problem Formulation · b00020](https://arxiv.org/html/2610.30429v1#S3.SS1.p4.1)：An edit is proposed only after rejection, and each cycle applies at most one edit.
  - [原文 A.3 Inference Procedure · b00074](https://arxiv.org/html/2610.30429v1#A1.SS3.p1.1)：The loop ends at the first accepted output or after T_{\max} adaptation cycles, so a chain is executed at most 1+T_{\max} times, once per cycle.

## 自进化机制

- 改变对象：任务内改变角色链并合成角色规格；训练时更新 GR 全部参数，执行器保持冻结。
  核验：原文支持；b00006、b00022—b00023支持任务内角色链修改及角色合成；b00069明确更新GR全部参数；b00021明确执行器冻结、仅训练GR。
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.30429v1#S1.p4.1)：A trainable Global Router (GR) constructs task-specific role chains and refines them through atomic structural edits, while synthesizing specialized roles on demand.
  - [原文 A.1 Training Configuration · b00069](https://arxiv.org/html/2610.30429v1#A1.SS1.p1.1)：We train the GR with SECPO using Qwen2.5-7B-Instruct as the backbone in verl ( Sheng et al., 2024 ) , updating all parameters
  - [原文 Learning objective. · b00021](https://arxiv.org/html/2610.30429v1#S3.SS1.SSS0.Px1.p1.1)：The executor remains frozen; only the GR is trained.
- 反馈来源：独立于链末 Validator 角色的任务验证器返回通过/拒绝、分数及固定类别缺陷；缺陷驱动修改，判决与分数构成周期奖励。
  核验：原文支持；b00077明确任务验证器独立于Validator角色，返回判决、分数和固定类别缺陷；b00022支持缺陷驱动编辑；b00021明确周期奖励由判决与加权分数组成。
  - [原文 Task validators. · b00077](https://arxiv.org/html/2610.30429v1#A1.SS3.SSS0.Px2.p1.1)：In every domain the validator V returns the verdict h_{t} , the score s_{t} and a deficit d_{t} from a fixed set of categories (§ 3.1 ). It is separate from the Validator role.
  - [原文 3.2 RoleFlow: Feedback-Driven Structural Adaptation · b00022](https://arxiv.org/html/2610.30429v1#S3.SS2.p1.1)：After each rejected output, it uses the deficit d_{t} and accumulated memory \sigma_{t} to propose one structural edit.
  - [原文 Learning objective. · b00021](https://arxiv.org/html/2610.30429v1#S3.SS1.SSS0.Px1.p1.1)：The cycle reward is R(y_{t})=h_{t}+\lambda_{s}s_{t}
- 更新方式：SECPO 以同状态编辑和不编辑的奖励差形成局部优势，加权叠加到编辑 token 的组相对优势上，并采用 PPO 裁剪目标与 KL 正则训练 GR。
  核验：原文支持；b00027—b00028支持同状态编辑与不编辑的奖励差；b00038支持在编辑token上加权叠加局部优势；b00026明确保留PPO裁剪目标及KL正则。
  - [原文 Same-state counterfactual advantage. · b00028](https://arxiv.org/html/2610.30429v1#S3.E2)：A^{(t)}_{i}\,=\,R(y^{+}_{i,t})-R(y^{0}_{i,t}). (2)
  - [原文 Policy optimization. · b00038](https://arxiv.org/html/2610.30429v1#S3.F4)：Every plan token receives the group-relative advantage A^{\mathrm{GRPO}}_{\ell} , and the single-edit advantage A^{(t)}_{i} is added with weight \lambda on the edit span \mathcal{E}^{(i)}_{t} .
  - [原文 3.3 SECPO: Edit-Level Counterfactual Credit Assignment · b00026](https://arxiv.org/html/2610.30429v1#S3.SS3.p1.1)：while retaining GRPO’s critic-free group of K rollouts ( Shao et al., 2024 ) and PPO’s clipped surrogate with KL regularization ( Schulman et al., 2017 ) .
- 发生阶段：训练阶段更新 GR 并执行反事实重评；推理阶段 GR 参数固定，仅进行任务内角色链适应及角色合成。
  核验：原文支持；b00072支持训练更新GR并执行反事实比较；b00074明确推理固定训练所得参数、按需合成角色，并将反事实重执行限定为训练用途。
  - [原文 A.2 Detailed Global Router Learning Procedure · b00072](https://arxiv.org/html/2610.30429v1#A1.SS2.p1.1)：updates the GR with the SECPO loss (Eq. 5 ) and admits synthesized roles through the return gate (Eq. 6 ).
  - [原文 A.3 Inference Procedure · b00074](https://arxiv.org/html/2610.30429v1#A1.SS3.p1.1)：At inference the GR keeps its trained parameters \theta^{*} , and the role library holds the seed roles of the domain, written \mathcal{R}_{0} .
  - [原文 A.3 Inference Procedure · b00074](https://arxiv.org/html/2610.30429v1#A1.SS3.p1.1)：A role the GR names but \mathcal{R}_{0} lacks is synthesized by the LibraryExpander, and a null edit under a deficit triggers deficit-driven synthesis.
  - [原文 A.3 Inference Procedure · b00074](https://arxiv.org/html/2610.30429v1#A1.SS3.p1.1)：The counterfactual re-execution of § 3.3 serves training.
- 保留范围：新角色先进入任务 rollout 临时覆盖层；训练中回报超过组内首个参考 rollout 才跨步骤保留。推理每题从领域种子库开始，不加载训练增长库，因此推理合成角色不跨题持续积累。
  核验：原文支持；b00023支持临时覆盖层；b00039—b00041支持超过组内首个参考rollout回报才跨训练步骤保留；b00024明确推理每题从种子库开始并为该题合成专家，支持不跨题持续积累的判断。
  - [原文 3.2 RoleFlow: Feedback-Driven Structural Adaptation · b00023](https://arxiv.org/html/2610.30429v1#S3.SS2.p2.1)：The new role is stored in rollout i ’s temporary overlay \hat{\mathcal{R}}^{(i)}
  - [原文 3.4 On-Demand Role Synthesis and Library Growth · b00039](https://arxiv.org/html/2610.30429v1#S3.SS4.p1.1)：A synthesized role \hat{\rho} from rollout i is admitted only if its rollout return exceeds that of reference rollout \tau_{\mathrm{ref}}^{(i)} , defined as the first rollout in its block of K within the training batch
  - [原文 3.4 On-Demand Role Synthesis and Library Growth · b00041](https://arxiv.org/html/2610.30429v1#S3.SS4.p3.1)：The shared library is then available to subsequent training steps.
  - [原文 3.2 RoleFlow: Feedback-Driven Structural Adaptation · b00024](https://arxiv.org/html/2610.30429v1#S3.SS2.p3.1)：At inference, each task starts with the domain’s seed library rather than the library grown during training, and the required specialists are synthesized for that task.
- 独立任务验证：推理设置依据与训练、测试均不重叠的留出数据选择；2Wiki、MuSiQue、HumanEval 用于 OOD 测试，不在其上搜索、训练或调参。
  核验：原文支持；b00082明确推理设置使用与训练、测试不重叠的留出数据；b00079标识三个OOD基准；b00088明确不在这三个基准上搜索、训练或调参。
  - [原文 B.2 Training, Validation and Test Splits · b00082](https://arxiv.org/html/2610.30429v1#A2.SS2.p1.1)：We choose the inference settings of Appendix A.3 on held-out data that overlaps neither the training nor the test sets.
  - [原文 B.1 Benchmark Catalog · b00079](https://arxiv.org/html/2610.30429v1#A2.SS1.p1.1)：2WikiMultiHopQA, MuSiQue and HumanEval are out-of-distribution benchmarks.
  - [原文 Transfer to 2Wiki, MuSiQue and HumanEval. · b00088](https://arxiv.org/html/2610.30429v1#A2.SS3.SSS0.Px5.p1.1)：No method searches, trains or tunes on these three benchmarks. Each keeps what it obtained on HotpotQA or MBPP

## 系统分析与启发（推测）

- 系统分析：应区分训练中的参数学习与推理中的结构适应；推理 GR 参数固定，不能将任务内编辑解释为在线参数更新。依据 b00074：“At inference the GR keeps its trained parameters”。
- 系统分析：代码 Pass@1 包含每题十条链筛选，数学包含每题二十条链及答案选择；解释性能比较时需同时审查候选生成预算。依据 b00076：“On MBPP and HumanEval we sample ten chains per problem and submit one program.”
- 系统分析：WebShop 验证器会替换部分动作，评估结构适应的独立贡献时需控制该干预。依据 b00077：“it replaces the reply with the action on the current page that keeps a purchase possible.”

## 待研究问题（系统分析）

- 系统分析问题：严格匹配 token、调用数或费用后，结构适应相对单智能体多次采样的优势能否跨领域保持？b00062 的结论限定为：“Under this setting”。
- 系统分析问题：训练与测试均采用相同编辑数量时，单编辑信用分配还有多大独立贡献？b00058 明确：“train–test mismatch also contributes to the comparison”。
- 系统分析问题：如何区分结构编辑收益与整链重新执行带来的采样收益？b00027 的比较方式为：“SECPO executes the chain with the candidate edit”，并与不编辑执行结果比较。

## 缺失信息

- b00062 提供 HotpotQA 上与自一致性采样的相近 API 成本比较，但未给出完整数值和严格等预算设置；equal_budget_single_agent_comparison 置 null。
- b00064 未明确跨执行器增益的具体基线，也未给出完整执行器列表、绝对分数和对应资源预算；该实验 baseline 置 null。
- WebShop 训练描述存在不一致：b00045 称使用 WebShop 训练集训练领域 GR；b00076 称使用 MBPP 训练的 GR；b00081 列 WebShop 训练量为0。无法确定统一训练设置。
- b00052 将下降3.8—8.5 F1描述为禁用适应，但 b00050—b00051 对应配置为 T_max=1，仍允许一次编辑；卡片不将其解释为完全禁用适应。
- 提供文本未明确 QA 验证器的完整实现、运行时是否接触参考答案，以及奖励分数权重 λ_s 的数值。
- b00056 已报告 HotpotQA 对照训练的 token 和 GPU-h；其余领域完整训练总步骤、实际总 GPU 时、token 和 API 费用未在提供文本中明确。
- 草稿援引的 b00108、b00111 未包含在 original_blocks 中，相关数学案例和验证器误接受断言已删除。
- 未提供前作原文，无法独立确认创新优先权；本次仅依据提供文本修订卡片，未复现实验。

## 阅读范围

读取 3 / 3 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Large language model (LLM) based multi-agent systems often rely on predefined collaboration structures, limiting their adaptability to evolving task requirements. Although recent approaches enable dynamic orchestration, trajectory-level rewards they apply assign one outcome to each decision, ofen struggling to identify the contributions of individual structural changes. We propose RoleFlow, a self-evolving multi-role agentic system that refines collaboration structures through feedback-driven atomic edits and on-demand role synthesis. To make structural adaptation learnable, we introduce Single-Edit Counterfactual Policy Optimization (SECPO), which evaluates each edit against its no-edit counterpart at the same chain state and assigns targeted credit to edit-specific tokens. Across seven benchmarks spanning four domains, RoleFlow achieves the optimal average performance, surpassing the strongest competitor by 4.7 points. It leads on all three multi-hop QA benchmarks by 3.2-7.5 F1 points and also shows supremacy on mathematical reasoning, web interaction, and code generation. Further analyses demonstrate cross-benchmark transferability, training-data efficiency, and cross-executor generalization.
