# MELD: Recursive Self-Improvement via Hierarchical Coordination for Multi-Agent Scientific Discovery

作者：Sizhe Tang, Zuyuan Zhang, Zeyu Fang, Tian Lan
原文：https://arxiv.org/abs/2610.24454v1
首次提交：2026-10-17T04:43:40Z · 版本更新：2026-10-17T04:43:40Z
版本：v1 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- MELD针对研究分工与个体学习耦合的问题，在共享派生树上交替适配协调与研究策略；作者报告4B系统在22项任务中20项取得最佳三种子均值。
  核验：原文支持；b00002、b00005支持问题定位、共享派生树与交替适配；b00006明确报告4B协调与研究骨干在22项任务中的20项取得最佳三种子均值。该结果限于文中比较方法。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.24454v1#S1.p3.1)：The Coordinator and Scientists learn through alternating GRPO-style parameter updates ( Shao et al., 2024 ) under a shared smooth best-of-budget objective.
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.24454v1#S1.p4.1)：Meld attains the best three-seed mean score among the compared methods on 20 tasks (Table 1 ) and the highest aggregate normalized scores on MLGym, with an interquartile mean of 0.748 versus 0.684 for ARTS ∗ .
  - [原文 摘要 · b00002](https://arxiv.org/html/2610.24454v1#abstract1.1)：Multi-agent scientific discovery with large language models raises a coupled learning problem: research assignments determine both which experiments are pursued and the experiences from which agents adapt.
  - [原文 摘要 · b00002](https://arxiv.org/html/2610.24454v1#abstract1.1)：The Coordinator generates a joint portfolio of search branches and research directives over a shared derivation tree, while Scientists develop hypotheses and execution plans implemented by a shared frozen Executor.
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.24454v1#S1.p4.1)：These system-level comparisons use a 4B backbone for Meld ’s coordination and research, proprietary Scientist models for most baselines, and the same frozen Executor throughout.

## 研究问题

- 研究分配同时影响团队进展与后续学习经历。作者将单次发现过程中联合学习团队协调和个体研究策略定位为现有方法尚未解决的问题；该前作判断未独立核验。
  核验：原文支持；b00003支持分配对进展和学习经历的双重影响；b00004明确作出尚未解决联合学习问题的作者判断。结论保留了前作判断未经独立核验的边界。
  - [原文 1 Introduction · b00003](https://arxiv.org/html/2610.24454v1#S1.p1.1)：For a team of collaborative agents, each local research assignment determines both the team’s overall progress and the learning experience that shapes the team’s subsequent research strategy.
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2610.24454v1#S1.p2.1)：These advances leave a central joint learning problem unresolved: how can a team-level coordination policy and individual agent-level research policies be learned together within a single discovery process?

## 方法怎样工作

- 用共享派生树及剩余预算表示发现状态。Coordinator一次生成联合分配，从至多16个节点中选择父节点并指定研究问题、瓶颈与约束；各Scientist生成假设和执行计划。
  核验：原文支持；b00017支持共享树和剩余预算构成状态表示；b00248明确说明一次生成联合组合、至多16个候选父节点、指令三个字段，以及Scientist生成假设和计划。
  - [原文 Shared Discovery Process. · b00017](https://arxiv.org/html/2610.24454v1#S3.SS0.SSS0.Px2.p1.1)：At round t , the shared history is represented by a rooted derivation tree \mathcal{G}_{t}=(V_{t},E_{t}) , whose root stores (c_{0},s_{0}) . Together with the remaining budget b_{t} , it defines the discovery state \mathcal{S}_{t}=(\mathcal{P},\mathcal{G}_{t},b_{t}) .
  - [原文 Policies and adapters. · b00248](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px2.p1.1)：The Coordinator emits the complete portfolio in one schema-constrained JSON completion of at most 1200 tokens containing, for each unit, a parent identifier chosen from a retrieved shortlist of at most 16 tree nodes (at most two nodes from the same family) and a free-text directive with three fields (research question, observed bottleneck, constraints).
  - [原文 Policies and adapters. · b00248](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px2.p1.1)：Each Scientist emits a hypothesis and an execution plan of at most 3400 tokens for its assignment.
- 冻结Executor执行计划并返回候选及反馈。成功评估的候选加入树；超时或验证失败消耗预算、训练效用为0且不入树。团队奖励为平滑势函数的轮内增量。
  核验：原文支持；b00247、b00020和b00265分别支持冻结执行、成功入树及超时或验证失败的预算与效用处理；b00031支持团队奖励为一轮前后的势函数差。
  - [原文 Executor and judge. · b00247](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px1.p1.1)：The Executor is frozen throughout; it implements the plan it is given and returns the candidate together with execution and validation feedback.
  - [原文 Shared Discovery Process. · b00020](https://arxiv.org/html/2610.24454v1#S3.SS0.SSS0.Px2.p2.1)：Each successful evaluation adds v_{t}^{i}=(h_{t}^{i},e_{t}^{i},c_{t}^{i},\ell_{t}^{i},s_{t}^{i}) to the tree.
  - [原文 Budget accounting. · b00265](https://arxiv.org/html/2610.24454v1#A2.SS7.SSS0.Px1.p1.1)：A candidate that exceeds the timeout or fails validation consumes one evaluator call, receives failure utility s_{\min}{=}0 for the training potential, and is not added to the derivation tree.
  - [原文 Potential increments as shared credit. · b00031](https://arxiv.org/html/2610.24454v1#S4.SS2.SSS0.Px2.p1.1)：A round receives r_{t}^{\Phi}=\Phi_{\tau,K}(\mathcal{S}_{t+1})-\Phi_{\tau,K}(\mathcal{S}_{t}) for its collective outcome. The temperature sets how closely the potential tracks the maximum while retaining credit for near-frontier candidates.
- 每组从同一快照运行8个分叉、每叉3个研究单元。协调组重采样联合分配，研究组固定分配；两类组交替更新活动参数。使用新样本、不回放，预算不足完整组后仅推理。
  核验：原文支持；b00249明确规定8个分叉、每叉3个单元及活动参数块交替更新；b00035支持两类组的分配采样区别；b00039支持新样本、无回放与预算不足后仅推理。
  - [原文 Adaptation. · b00249](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px3.p1.1)：A group consists of G{=}8 forks of one frozen snapshot, each executing all N{=}3 units, hence 24 scored candidates per group; Coordinator groups and Scientist groups alternate strictly, and each group is followed by one optimizer step on its active block, after which the updated serving adapters are used for the next group.
  - [原文 Matched-snapshot groups. · b00035](https://arxiv.org/html/2610.24454v1#S4.SS3.SSS0.Px1.p1.1)：In a Coordinator group , each fork samples a complete portfolio Z^{(g)}\sim\pi^{\mathrm{coord}}_{\phi_{\mathrm{old}}}(\cdot\mid\mathcal{S}) and executes its units using the current Scientist policies. In a Scientist group , one portfolio Z is fixed across forks,
  - [原文 Update and commit. · b00039](https://arxiv.org/html/2610.24454v1#S4.SS3.SSS0.Px3.p1.1)：Coordinator and Scientist groups alternate using fresh samples, with no replay, until the budget no longer admits a full group, after which the current policies are rolled out without further updates (Appendix B.3 ).

## 作者声称的贡献

- 作者自述提出层级测试时训练框架，在一个未见任务内联合适配两层策略，并由更新后的策略生成后续学习经历，形成递归自改进闭环；创新优先性未独立确认。
  核验：原文支持；b00078明确作出层级测试时训练、单任务联合适配和递归自改进闭环的作者自述；结论没有将其提升为已独立确认的创新优先性。
  - [原文 7 Conclusion · b00078](https://arxiv.org/html/2610.24454v1#S7.p1.1)：We introduced Meld , a hierarchical TTT framework that jointly adapts team-level Coordinator and agent-level Scientist policies on one unseen task. Updated policies generate the experience and feedback for later adaptation, forming a recursive self-improvement loop with team-level coordination and agent-level research exploration.
- 作者自述建立层级目标对齐分析，研究匹配边际分布与预算下的条件性协调收益、共同初始模型处私有适配的一阶收益，并推导有限预算遗憾界和条件性优化速率。
  核验：原文支持；b00006逐项报告目标对齐、匹配分布与预算下的条件性协调收益、共同模型处私有适配的一阶收益，以及遗憾界和条件性优化速率。这里只支持作者报告这些理论结果，不等于独立验证证明。
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.24454v1#S1.p4.1)：Our theoretical analysis establishes objective alignment for the proposed hierarchy, characterizes conditions for coordination gains over independent parallel discovery at matched individual outcome distributions and budgets, and quantifies the first-order benefit of private adaptation at a common model.
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.24454v1#S1.p4.1)：We further derive a finite-budget regret bound for adapted models and a conditional optimization rate.

## 本文报告的方法比较

- 本文统一框架重跑AIRA、MLEvolve和CORAL，使用冻结Haiku 4.5 Scientist；ARTS*为同Qwen3-4B骨干的单Scientist适配基线。各方法共享Executor，按计分候选预算匹配。
  核验：原文支持；b00064和b00252支持统一框架重跑、三个冻结Haiku Scientist基线及同Qwen3-4B骨干的单Scientist ARTS*；b00265明确预算按名义计分候选匹配。
  - [原文 Compared systems. · b00064](https://arxiv.org/html/2610.24454v1#S6.SS1.SSS0.Px2.p1.1)：We rerun AIRA ( Toledo et al., 2025 ) , MLEvolve ( Du et al., 2026 ) , and CORAL ( Qu et al., 2026 ) in the same harness with frozen Claude Haiku 4.5 as their Scientist and as the shared Executor (Appendix B.4 ).
  - [原文 Compared systems. · b00064](https://arxiv.org/html/2610.24454v1#S6.SS1.SSS0.Px2.p1.1)：We also rerun ARTS ∗ ( Juneja et al., 2026 ) , the test-time-training variant of ARTS, which fine-tunes a single tree-search Scientist on the same backbone.
  - [原文 B.4 Baseline Implementations · b00252](https://arxiv.org/html/2610.24454v1#A2.SS4.p1.1)：ARTS ∗ uses the Qwen3-4B-Instruct-2507 backbone of Meld together with the shared Executor, evaluator, tree bookkeeping, and judge.
  - [原文 Budget accounting. · b00265](https://arxiv.org/html/2610.24454v1#A2.SS7.SSS0.Px1.p1.1)：Within each task, all methods receive the same nominal scored-candidate budget, so comparisons are matched by scored candidates rather than wall-clock time.
- 理论比较固定快照、Scientist、Executor和评估器，匹配各单元分配边际及N次评估，仅改变分配耦合；负关联条件下，协调的期望训练奖励不低于独立并行。
  核验：原文支持；b00154—b00158支持固定快照、模型、执行与评估机制，并匹配分配边际和评估次数；b00053明确给出效用随机变量负关联时的期望奖励不等式。该结论属于所述理论比较，未声称实际训练必然满足负关联。
  - [原文 A.5.1 Matched-Marginal Comparison and Proof · b00154](https://arxiv.org/html/2610.24454v1#A1.SS5.SSS1.p1.2)：Fix the snapshot \mathcal{S} , the N Scientist models \theta_{1:N} , and the shared frozen Executor and evaluator
  - [原文 A.5.1 Matched-Marginal Comparison and Proof · b00154](https://arxiv.org/html/2610.24454v1#A1.SS5.SSS1.p1.2)：Both systems make exactly N new evaluator calls, including failed attempts, from this snapshot; K remains the common system-level budget.
  - [原文 A.5.1 Matched-Marginal Comparison and Proof · b00156](https://arxiv.org/html/2610.24454v1#A1.SS5.SSS1.p1.3)：so that the parallel comparison retains every Scientist model and matches each unit’s assignment distribution.
  - [原文 A.5.1 Matched-Marginal Comparison and Proof · b00158](https://arxiv.org/html/2610.24454v1#A1.SS5.SSS1.p1.4)：the same kernels occur in both laws, and only the coupling of the assignments changes.
  - [原文 Theorem 5.3 (Value of coordination at matched marginals) . · b00054](https://arxiv.org/html/2610.24454v1#S5.SS2.p2.1)：it is at least the parallel reward under negative association (iii).

## 实验证据与条件

任务：12项MLGym与10项MLE-bench任务
基础模型：冻结Qwen3-4B-Instruct-2507及可训练LoRA；共享冻结Claude Haiku 4.5 Executor
比较基线：AIRA、MLEvolve、CORAL、ARTS*
指标：每个种子预算内最佳留出分数，再取三个独立种子的均值
结果：20/22项最佳点估计；CIFAR-10落后AIRA 0.003，Spaceship Titanic落后CORAL和MLEvolve 0.0046
资源条件：按每任务名义计分候选预算匹配，不按墙钟时间匹配；作者报告4张NVIDIA A100、每个方法运行约9小时
- 作者报告22项任务中20项取得最佳三种子均值；例外为CIFAR-10和Spaceship Titanic。
  核验：原文支持；b00065—b00067和b00266支持20/22、两项例外、差值以及先取种子内最佳再平均的指标；b00064、b00252、b00265和b00267支持模型、基线、预算及资源描述。结果是作者报告的点估计，并非显著性或复现结论。
  - [原文 6.2 Main Results · b00065](https://arxiv.org/html/2610.24454v1#S6.T1)：Best held-out scores within the nominal evaluator-call budget on 12 MLGym and 10 MLE-bench tasks, averaged over three independent seeds.
  - [原文 Broad gains across task families. · b00067](https://arxiv.org/html/2610.24454v1#S6.SS2.SSS0.Px1.p1.1)：Meld achieves the best reported point estimate on 20 of 22 tasks, trailing only on CIFAR-10 (AIRA, by 0.003 ) and Spaceship Titanic (CORAL and MLEvolve, by 0.0046 ; Table 1 ).
  - [原文 Compared systems. · b00064](https://arxiv.org/html/2610.24454v1#S6.SS1.SSS0.Px2.p1.1)：Meld adapts LoRA adapters on a frozen Qwen3-4B-Instruct-2507 ( Yang et al., 2025 ) backbone (Appendix B.3 )
  - [原文 Compared systems. · b00064](https://arxiv.org/html/2610.24454v1#S6.SS1.SSS0.Px2.p1.1)：We rerun AIRA ( Toledo et al., 2025 ) , MLEvolve ( Du et al., 2026 ) , and CORAL ( Qu et al., 2026 ) in the same harness with frozen Claude Haiku 4.5 as their Scientist and as the shared Executor (Appendix B.4 ).
  - [原文 B.4 Baseline Implementations · b00252](https://arxiv.org/html/2610.24454v1#A2.SS4.p1.1)：ARTS ∗ uses the Qwen3-4B-Instruct-2507 backbone of Meld together with the shared Executor, evaluator, tree bookkeeping, and judge.
  - [原文 Budget accounting. · b00265](https://arxiv.org/html/2610.24454v1#A2.SS7.SSS0.Px1.p1.1)：Within each task, all methods receive the same nominal scored-candidate budget, so comparisons are matched by scored candidates rather than wall-clock time.
  - [原文 Compute. · b00267](https://arxiv.org/html/2610.24454v1#A2.SS7.SSS0.Px3.p1.1)：Experiments run on four NVIDIA A100 GPUs. Each method run takes approximately 9 hours, with test-time adaptation updating only the LoRA blocks described in Table 3 .
任务：12项MLGym任务的跨任务聚合
基础模型：MELD：Qwen3-4B-Instruct-2507
比较基线：ARTS*为最强聚合基线
指标：归一化分数的Median、IQM、Mean、Optimality Gap；任务级三种子均值的5000次bootstrap，95%区间
结果：MELD的Median/IQM/Mean为0.753/0.748/0.745，ARTS*为0.669/0.684/0.694；Optimality Gap分别为0.255与0.306
资源条件：同任务计分候选预算一致
- 作者报告MELD在MLGym的四项聚合指标上均最佳；这些指标使用任务级三种子均值。
  核验：原文支持；b00075—b00076支持四项聚合指标排名及全部所列数值；b00262支持任务级三种子均值、5000次任务重采样和95%区间。b00252、b00265支持同骨干基线与预算条件。
  - [原文 Early and delayed improvements. · b00075](https://arxiv.org/html/2610.24454v1#S6.F6)：Figure 6: Median, IQM, Mean, and Optimality Gap of normalized scores (Baseline {}=0 , Human Best {}=1 ) over the 12 MLGym tasks, with 95% bootstrap intervals. Meld is best on all four.
  - [原文 Aggregate performance and scope. · b00076](https://arxiv.org/html/2610.24454v1#S6.SS2.SSS0.Px3.p1.1)：Its Median, IQM, and Mean are 0.753 , 0.748 , and 0.745 , versus 0.669 , 0.684 , and 0.694 for ARTS ∗ , the strongest aggregate baseline. Optimality Gap decreases from 0.306 to 0.255 (about 17\% ).
  - [原文 B.6 Aggregate Metrics · b00262](https://arxiv.org/html/2610.24454v1#A2.SS6.p1.1)：Figure 6 is computed from the three-seed mean per-task best scores of Table 1 and the anchors of Table 2 .
  - [原文 B.6 Aggregate Metrics · b00262](https://arxiv.org/html/2610.24454v1#A2.SS6.p1.1)：Confidence intervals are 95% percentile intervals from a bootstrap that resamples the 12 task-level three-seed means with replacement (5,000 replicates, fixed bootstrap seed).
  - [原文 B.4 Baseline Implementations · b00252](https://arxiv.org/html/2610.24454v1#A2.SS4.p1.1)：ARTS ∗ uses the Qwen3-4B-Instruct-2507 backbone of Meld together with the shared Executor, evaluator, tree bookkeeping, and judge.
  - [原文 Budget accounting. · b00265](https://arxiv.org/html/2610.24454v1#A2.SS7.SSS0.Px1.p1.1)：Within each task, all methods receive the same nominal scored-candidate budget, so comparisons are matched by scored candidates rather than wall-clock time.
任务：Iterated Prisoner’s Dilemma（PD）与Colonel Blotto（CB）
基础模型：Qwen3-4B-Instruct-2507；完整MELD更新两层策略
比较基线：Coordinator-only、Scientist-only、Frozen
指标：先在每个种子的对应批次内计算有效候选原始分数中位数及24次尝试的阈值命中数，再分别取三种子均值；阈值PD≥2.62、CB≥0.245
结果：完整MELD：中位数的三种子均值在PD为2.35→2.57、CB为0.000→0.010；命中数均值分别为2→10、2→6。另三变体适配后命中数均值依次为PD 5/6/3、CB 3/4/2
资源条件：每变体3个种子；每次72次候选评估，其中48次适配、24次预留最终评估；最终批次排除训练
- PD/CB消融中完整MELD的适配后指标优于单层更新；Median为各种子有效候选中位数的三种子均值，命中数也取三种子均值。最终批次不训练，但各变体使用自身生成的树。
  核验：原文支持；b00261支持完整配置在所列适配后指标上的数值优势；b00258—b00260支持逐种子、逐批次计算再平均及命中阈值。b00253、b00257支持72次评估、最终批次排除训练和各变体使用自身树；不构成固定同一棵树下的纯参数效应比较。
  - [原文 Variants and budget. · b00253](https://arxiv.org/html/2610.24454v1#A2.SS5.SSS0.Px1.p1.1)：We compare full Meld , Coordinator-only, Scientist-only, and Frozen on Iterated Prisoner’s Dilemma (PD) and Colonel Blotto (CB), using three independent seeds per variant.
  - [原文 Variants and budget. · b00253](https://arxiv.org/html/2610.24454v1#A2.SS5.SSS0.Px1.p1.1)：Each run uses 72 candidate evaluations, comprising two 24-candidate adaptation groups and a final 24-candidate evaluation batch reserved before the run. The reserved batch is excluded from training.
  - [原文 Reported statistics. · b00260](https://arxiv.org/html/2610.24454v1#A2.T4)：“Median” is the mean of the per-seed medians over valid candidates; “hits” is the mean number of threshold hits (score at least 2.62 on PD or 0.245 on CB) per 24 attempted evaluations.
  - [原文 Reported statistics. · b00259](https://arxiv.org/html/2610.24454v1#A2.SS5.SSS0.Px4.p2.1)：Batch medians are computed separately within each seed before averaging, rather than by pooling candidates across seeds.
  - [原文 Reported statistics. · b00261](https://arxiv.org/html/2610.24454v1#A2.T4.7)：PD CB Variant Median Hits / 24 Median Hits / 24 Full Meld 2.35\rightarrow 2.57 2\rightarrow 10 0.000\rightarrow 0.010 2\rightarrow 6 Coordinator-only 2.35\rightarrow 2.44 2\rightarrow 5 0.000\rightarrow 0.004 2\rightarrow 3 Scientist-only 2.35\rightarrow 2.48 2\rightarrow 6 0.000\rightarrow 0.006 2\rightarrow 4 Frozen 2.35\rightarrow 2.37 2\rightarrow 3 0.000\rightarrow 0.002 2\rightarrow 2
  - [原文 Post-cycle evaluation. · b00257](https://arxiv.org/html/2610.24454v1#A2.SS5.SSS0.Px3.p2.1)：Each variant is evaluated from the tree produced by its own adaptation groups, so the comparison includes how the enabled updates shape the subsequent discovery process.
  - [原文 Policies and adapters. · b00248](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px2.p1.1)：Meld uses Qwen3-4B-Instruct-2507 as the frozen backbone for both the Coordinator and the Scientists
任务：CHAMPS
基础模型：MELD：Qwen3-4B-Instruct-2507，完整配置N=3
比较基线：N=1的MELD
指标：log-MAE
结果：完整配置1.1592，N=1为1.1899；作者称损失相对ARTS*优势的近一半
资源条件：相同预算
- CHAMPS同预算消融中，单研究单元MELD的log-MAE高于完整配置。
  核验：原文支持；b00077明确报告同预算下N=1的log-MAE从1.1592升至1.1899，并作出损失近半优势的描述；b00248支持完整配置为N=3及所列骨干。
  - [原文 6.3 Ablations · b00077](https://arxiv.org/html/2610.24454v1#S6.SS3.p1.1)：With one research unit ( N{=}1 ) at the same budget, Meld loses nearly half of its CHAMPS margin over ARTS ∗ , as log-MAE rises from 1.1592 to 1.1899 , so the full gain requires multiple units.
  - [原文 Policies and adapters. · b00248](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px2.p1.1)：Meld uses Qwen3-4B-Instruct-2507 as the frozen backbone for both the Coordinator and the Scientists, served locally in bfloat16, with four independent LoRA adapters: one coordination adapter \phi and one private Scientist adapter \theta_{i} per unit ( N{=}3 ).

## 原文支持的局限性

- 作者明确承认轮内信用分配、固定研究层级和任务内适配的限制；跨任务迁移是未来方向。单轮学习目标遗漏的下游影响一般不为零。
  核验：原文支持；b00078直接列出轮内信用、任务内适配和固定层级限制，并提出跨任务迁移方向；b00135明确说明被省略的下游项一般不为零。
  - [原文 7 Conclusion · b00078](https://arxiv.org/html/2610.24454v1#S7.p1.1)：Current limitations are round-local credit and task-local adaptation within a fixed research hierarchy, and cross-task transfer could be natural future work.
  - [原文 Proof of Proposition 5.2 . · b00135](https://arxiv.org/html/2610.24454v1#A1.SS3.p5.2)：The downstream terms, those carrying R^{\Phi}_{t+1:\mathrm{end}} , are not zero in general, because R^{\Phi}_{t+1:\mathrm{end}} depends on a_{t}^{\beta} through \mathcal{S}_{t+1} , and this is the bias accepted in Section 4.2 .
- 原文区分序列级无偏估计与实际训练代理：可变长度归一化和组内标准化不直接受该无偏性结论覆盖；实际提交所有分叉的合并状态，也不同于单分叉后继状态。
  核验：原文支持；b00141明确区分序列估计与可变长度token归一化、组内标准化的保证范围；b00135明确实际提交所有分叉的合并状态，而非单分叉后继状态。
  - [原文 Relation to token-length normalization. · b00141](https://arxiv.org/html/2610.24454v1#A1.SS3.SSS1.Px2.p1.3)：otherwise part (iv) establishes unbiasedness for \widehat{g}_{\mathrm{seq}} , not for \widehat{g}_{\mathrm{tok}} .
  - [原文 Relation to token-length normalization. · b00141](https://arxiv.org/html/2610.24454v1#A1.SS3.SSS1.Px2.p1.3)：This factor is a function of all G forks, including fork g , so the resulting estimator is a data-dependent rescaling of \widehat{g}_{\mathrm{tok}} whose expectation is likewise not covered by part (iv)
  - [原文 Proof of Proposition 5.2 . · b00135](https://arxiv.org/html/2610.24454v1#A1.SS3.p5.2)：In Algorithm 1 the G forks of a group are committed together, so the state actually reached is \mathcal{S}\oplus\bigcup_{g}X^{(g)} rather than a single fork’s successor;
- 优化结论依赖Lipschitz、PL及估计偏差/方差假设；交错运行扩展另需快照失配假设。原文说明适配不减少覆盖和平滑误差。
  核验：原文支持；b00059支持Lipschitz、PL和估计偏差及方差假设；b00062明确交错运行扩展需要快照失配假设，且适配不减少覆盖和平滑误差。结论没有将所列条件声称为完整假设清单。
  - [原文 Assumption 5.5 (Curvature and estimation) . · b00059](https://arxiv.org/html/2610.24454v1#S5.Thmtheorem5.p1.1)：(A1) \nabla F is L -Lipschitz on \Omega and \tfrac{1}{2}\|\nabla F(\Theta)\|^{2}\geq\mu\,(F^{\star}-F(\Theta)) for all \Theta\in\Omega , with \mu\leq L .
  - [原文 Assumption 5.5 (Curvature and estimation) . · b00059](https://arxiv.org/html/2610.24454v1#S5.Thmtheorem5.p1.1)：each block estimate satisfies \|\bar{\nabla}_{m}-\nabla_{\mathsf{b}_{m}}F(\Theta^{(m)})\|\leq\delta and \mathbb{E}[\|\widehat{\nabla}_{m}-\bar{\nabla}_{m}\|^{2}\mid\mathcal{F}_{m}]\leq\sigma^{2} .
  - [原文 Theorem 5.6 (Convergence of the discovery regret) . · b00062](https://arxiv.org/html/2610.24454v1#S5.SS3.p2.1)：Adaptation does not reduce the coverage and smoothing errors, and Eq. ( 9 ) bounds the regret of a full-budget rollout of the adapted model, which Appendix A.7.3 extends, under a snapshot-mismatch assumption, to the interleaved Meld run

## 多智能体机制

- 角色与分工：一个Coordinator决定研究分支与问题，三个Scientist生成假设及计划；共享冻结Haiku 4.5 Executor执行，同模型judge在执行前筛除格式错误或不可执行计划。
  核验：原文支持；b00025、b00023和b00248支持协调者与三个Scientist的角色；b00247支持共享冻结Haiku 4.5 Executor及同型号judge在执行前筛除格式错误或不可执行计划。
  - [原文 4.1 Hierarchical Policy · b00025](https://arxiv.org/html/2610.24454v1#S4.SS1.p2.2)：The Coordinator decides where and what to research; each Scientist decides how .
  - [原文 Policies and adapters. · b00248](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px2.p1.1)：with four independent LoRA adapters: one coordination adapter \phi and one private Scientist adapter \theta_{i} per unit ( N{=}3 ).
  - [原文 Executor and judge. · b00247](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px1.p1.1)：All methods share the same Executor, Claude Haiku 4.5 operating a tool loop with read, write, run, and validate actions inside the candidate workspace. The Executor is frozen throughout;
  - [原文 Executor and judge. · b00247](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px1.p1.1)：A per-batch judge, also Haiku 4.5, discards malformed hypotheses (empty, off-schema, or inexecutable plans) before execution in every arm;
- 协作结构：Coordinator一次结构化生成联合任务组合，允许分配相互依赖；给定状态与分配后Scientist独立采样。协调奖励来自候选效用，没有显式多样性奖励。
  核验：原文支持；b00022支持一次结构化联合生成允许分配依赖；b00023明确条件独立采样；b00031明确奖励依据候选效用而非显式多样性奖励。
  - [原文 4.1 Hierarchical Policy · b00022](https://arxiv.org/html/2610.24454v1#S4.SS1.p1.1)：The portfolio is emitted as one structured completion, allowing assignments to depend on one another before candidates are generated.
  - [原文 4.1 Hierarchical Policy · b00023](https://arxiv.org/html/2610.24454v1#S4.SS1.p2.1)：Scientists sample independently conditional on the state and portfolio.
  - [原文 Potential increments as shared credit. · b00031](https://arxiv.org/html/2610.24454v1#S4.SS2.SSS0.Px2.p1.1)：Joint assignments are thus evaluated through realized candidate utilities, not an explicit diversity bonus.
- 通信机制：Coordinator通过父节点及自然语言指令传递任务；Scientist观察共享状态与自己的分配，Executor返回候选及执行、验证反馈。
  核验：原文支持；b00022直接定义父节点和自然语言研究指令；b00176支持Scientist仅观察共享状态及自身分配；b00247支持Executor返回候选与执行、验证反馈。
  - [原文 4.1 Hierarchical Policy · b00022](https://arxiv.org/html/2610.24454v1#S4.SS1.p1.1)：Each assignment z_{t}^{i}=(p_{t}^{i},d_{t}^{i}) specifies a parent node p_{t}^{i} from a retrieved tree shortlist and a research directive d_{t}^{i} : a schema-constrained natural-language statement of the research question, the parent’s bottleneck, and the constraints to respect.
  - [原文 A.6.1 Setting · b00176](https://arxiv.org/html/2610.24454v1#A1.SS6.SSS1.p1.2)：although Scientist i observes only (\mathcal{S},z^{i}) .
  - [原文 Executor and judge. · b00247](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px1.p1.1)：The Executor is frozen throughout; it implements the plan it is given and returns the candidate together with execution and validation feedback.
- 共享记忆：派生树共享成果与反馈，私有适配器保留受分配影响的更新；成功评估入树，失败尝试不成为可扩展节点。
  核验：原文支持；b00026明确区分共享树中的成果反馈和私有适配器中的分配条件更新；b00020支持成功评估入树、失败尝试不作为可扩展节点。
  - [原文 4.1 Hierarchical Policy · b00026](https://arxiv.org/html/2610.24454v1#S4.SS1.p3.1)：The tree shares artifacts and feedback, while private adapters retain assignment-conditioned updates without forcing identical policy changes.
  - [原文 Shared Discovery Process. · b00020](https://arxiv.org/html/2610.24454v1#S3.SS0.SSS0.Px2.p2.1)：Each successful evaluation adds v_{t}^{i}=(h_{t}^{i},e_{t}^{i},c_{t}^{i},\ell_{t}^{i},s_{t}^{i}) to the tree.
  - [原文 Shared Discovery Process. · b00020](https://arxiv.org/html/2610.24454v1#S3.SS0.SSS0.Px2.p2.1)：Failed attempts consume budget and provide learning signals but are not added as expandable nodes.
- 调度方式：每组8个快照分叉、每叉3个研究单元，合计24个计分候选；协调组与研究组严格交替，每组更新后用新适配器运行下一组。
  核验：原文支持；b00249直接给出8个分叉、3个研究单元、24个计分候选、严格交替及更新后适配器用于下一组的完整配置。
  - [原文 Adaptation. · b00249](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px3.p1.1)：A group consists of G{=}8 forks of one frozen snapshot, each executing all N{=}3 units, hence 24 scored candidates per group; Coordinator groups and Scientist groups alternate strictly, and each group is followed by one optimizer step on its active block, after which the updated serving adapters are used for the next group.
- 同等资源的单 Agent 比较：包含同骨干单Scientist基线ARTS*及CHAMPS同预算N=1消融。预算匹配对象为计分候选，不能据此推断总计算成本相同。
  核验：原文支持；b00064支持同骨干单Scientist ARTS*；b00077支持CHAMPS同预算N=1消融；b00265明确只按计分候选匹配，因此不能由此推出总计算成本一致。
  - [原文 Compared systems. · b00064](https://arxiv.org/html/2610.24454v1#S6.SS1.SSS0.Px2.p1.1)：We also rerun ARTS ∗ ( Juneja et al., 2026 ) , the test-time-training variant of ARTS, which fine-tunes a single tree-search Scientist on the same backbone.
  - [原文 Budget accounting. · b00265](https://arxiv.org/html/2610.24454v1#A2.SS7.SSS0.Px1.p1.1)：Within each task, all methods receive the same nominal scored-candidate budget, so comparisons are matched by scored candidates rather than wall-clock time.
  - [原文 6.3 Ablations · b00077](https://arxiv.org/html/2610.24454v1#S6.SS3.p1.1)：With one research unit ( N{=}1 ) at the same budget, Meld loses nearly half of its CHAMPS margin over ARTS ∗ , as log-MAE rises from 1.1592 to 1.1899

## 自进化机制

- 改变对象：更新一个协调LoRA及三个Scientist私有LoRA，共享Qwen3-4B骨干和Executor保持冻结。
  核验：原文支持；b00248支持一个协调LoRA和三个私有Scientist LoRA及冻结Qwen3-4B骨干；b00026明确骨干和Executor均不更新，b00249支持适配器交替更新。
  - [原文 Policies and adapters. · b00248](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px2.p1.1)：Meld uses Qwen3-4B-Instruct-2507 as the frozen backbone for both the Coordinator and the Scientists, served locally in bfloat16, with four independent LoRA adapters: one coordination adapter \phi and one private Scientist adapter \theta_{i} per unit ( N{=}3 ).
  - [原文 4.1 Hierarchical Policy · b00026](https://arxiv.org/html/2610.24454v1#S4.SS1.p3.1)：neither the backbone nor the Executor is updated.
- 反馈来源：反馈为候选效用形成的团队势函数增量；Scientist共享团队优势，但仅通过自己的响应token更新。
  核验：原文支持；b00031支持基于候选效用的团队势函数增量；b00035明确Scientist共享团队优势，但仅通过各自响应token更新。
  - [原文 Potential increments as shared credit. · b00031](https://arxiv.org/html/2610.24454v1#S4.SS2.SSS0.Px2.p1.1)：A round receives r_{t}^{\Phi}=\Phi_{\tau,K}(\mathcal{S}_{t+1})-\Phi_{\tau,K}(\mathcal{S}_{t}) for its collective outcome.
  - [原文 Potential increments as shared credit. · b00031](https://arxiv.org/html/2610.24454v1#S4.SS2.SSS0.Px2.p1.1)：Joint assignments are thus evaluated through realized candidate utilities, not an explicit diversity bonus.
  - [原文 Matched-snapshot groups. · b00035](https://arxiv.org/html/2610.24454v1#S4.SS3.SSS0.Px1.p1.1)：Scientists share this team advantage but update only through their own response tokens, without pooling samples across snapshots or private policies.
- 更新方式：使用GRPO式采样和留一基线，优势按组内标准差归一化，以token级PPO式代理、非对称裁剪及相对任务初始策略的KL约束交替更新。
  核验：原文支持；b00035—b00038和b00249支持GRPO式采样、留一基线、组内标准差归一化、token平均PPO式代理、非对称裁剪以及相对冻结任务初始策略的KL惩罚；b00039支持交替更新。
  - [原文 Matched-snapshot groups. · b00035](https://arxiv.org/html/2610.24454v1#S4.SS3.SSS0.Px1.p1.1)：We combine GRPO-style sampling ( Shao et al., 2024 ) with a leave-one-out baseline ( Ahmadian et al., 2024 ) .
  - [原文 Token-level update. · b00036](https://arxiv.org/html/2610.24454v1#S4.SS3.SSS0.Px2.p1.1)：Broadcasting \widehat{A}_{g} to its response tokens gives the token-averaged PPO-style surrogate ( Schulman et al., 2017 ) ,
  - [原文 Adaptation. · b00249](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px3.p1.1)：The leave-one-out advantage of Eq. ( 6 ) is standardized by the within-group standard deviation, broadcast to all response tokens, and combined with the asymmetric clipping range and the KL penalty to the frozen task-start policy.
  - [原文 Update and commit. · b00039](https://arxiv.org/html/2610.24454v1#S4.SS3.SSS0.Px3.p1.1)：Coordinator and Scientist groups alternate using fresh samples, with no replay,
- 发生阶段：在单个未见任务的测试时发现过程中更新，适配和后续推理共用预算；仅成功评估的候选入树，失败或超时消耗预算但不入树。预算不足完整组后停止更新。
  核验：原文支持；b00078和b00232支持单个未见任务内更新及适配与推理共用预算；b00020、b00265支持成功入树和执行评估失败的处理；b00249支持预算不足完整组后停止更新。
  - [原文 7 Conclusion · b00078](https://arxiv.org/html/2610.24454v1#S7.p1.1)：We introduced Meld , a hierarchical TTT framework that jointly adapts team-level Coordinator and agent-level Scientist policies on one unseen task.
  - [原文 A.7.3 Arbitrary Starting States and the Interleaved Run · b00232](https://arxiv.org/html/2610.24454v1#A1.SS7.SSS3.p2.1)：In Meld the adaptation groups and the final inference phase share one budget:
  - [原文 Shared Discovery Process. · b00020](https://arxiv.org/html/2610.24454v1#S3.SS0.SSS0.Px2.p2.1)：Each successful evaluation adds v_{t}^{i}=(h_{t}^{i},e_{t}^{i},c_{t}^{i},\ell_{t}^{i},s_{t}^{i}) to the tree.
  - [原文 Budget accounting. · b00265](https://arxiv.org/html/2610.24454v1#A2.SS7.SSS0.Px1.p1.1)：A candidate that exceeds the timeout or fails validation consumes one evaluator call, receives failure utility s_{\min}{=}0 for the training potential, and is not added to the derivation tree.
  - [原文 Adaptation. · b00249](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px3.p1.1)：When the remaining scored-candidate budget is insufficient for another full matched-snapshot group, the remainder is used for inference without an additional update.
- 保留范围：更新保留范围为任务内：私有适配器保存更新，每个任务开始时全部重置至初始检查点，不构成跨任务持续保留。
  核验：原文支持；b00026支持私有适配器保留任务内更新；b00248明确每个任务开始时所有适配器重置至初始检查点，因此所述机制不跨任务持续保留这些更新。
  - [原文 4.1 Hierarchical Policy · b00026](https://arxiv.org/html/2610.24454v1#S4.SS1.p3.1)：The tree shares artifacts and feedback, while private adapters retain assignment-conditioned updates without forcing identical policy changes.
  - [原文 Policies and adapters. · b00248](https://arxiv.org/html/2610.24454v1#A2.SS3.SSS0.Px2.p1.1)：All adapters are reset to their initial checkpoint at the start of every task.
- 独立任务验证：候选由工作区外私有评估器评分，测试标签不可访问。PD/CB消融另预留24候选最终批次且排除训练；采集期间参数、状态和父节点列表固定，各分叉反馈隔离。
  核验：原文支持；b00243支持工作区外私有评估器及研究代理无法访问测试标签；b00253支持PD/CB预留24次最终评估且排除训练；b00257支持该最终批次采集期间参数、状态和父节点列表固定，以及分叉间候选与反馈隔离。
  - [原文 B.2 Private Evaluators · b00243](https://arxiv.org/html/2610.24454v1#A2.SS2.p1.1)：We score all candidates with private evaluators that run outside the agent workspace. Test labels, evaluator state, and protected scoring files are inaccessible to the research agents and are restored before each validation.
  - [原文 Variants and budget. · b00253](https://arxiv.org/html/2610.24454v1#A2.SS5.SSS0.Px1.p1.1)：Each run uses 72 candidate evaluations, comprising two 24-candidate adaptation groups and a final 24-candidate evaluation batch reserved before the run. The reserved batch is excluded from training.
  - [原文 Post-cycle evaluation. · b00257](https://arxiv.org/html/2610.24454v1#A2.SS5.SSS0.Px3.p2.1)：All policy parameters, the discovery state, and the parent shortlist remain fixed throughout collection of b_{\mathrm{post}} . Candidates and feedback from one evaluation fork are not exposed to the others, and no optimizer step is taken on this batch.

## 系统分析与启发（推测）

- 系统分析：协调也在决定适配数据的来源，可将联合分配视为学习数据生成机制；这是基于c002、c005的解释，不是额外实验结论。
- 系统分析：按计分候选预算匹配支持该预算口径下的比较，不能单独证明总成本效率领先；依据c008、c010、c022。
- 系统分析：PD/CB最终批次排除训练，但变体使用各自产生的树，因而结果包含参数变化与搜索状态变化，不能单独识别纯参数收益；依据c012、c028。
- 系统分析：局部估计器、实际训练代理与全程预算目标需要区分；条件性理论不能直接解释为实际系统无条件收敛保证；依据c014—c016。

## 待研究问题（系统分析）

- 系统分析问题：同时匹配总token、执行调用、训练计算及墙钟时间后，报告的优势是否保留？依据c008、c022。
- 系统分析问题：固定相同派生树和评估快照时，两层参数适配分别贡献多少？依据c012。
- 系统分析问题：实际运行是否满足理论所需的负关联、PL、估计误差及快照失配条件？依据c009、c016。
- 系统分析问题：跨任务保留适配器能否形成可迁移收益？当前任务开始重置的设置不能回答此问题；依据c014、c027。

## 缺失信息

- 提供文本含完整主结果表1，但未见逐任务具体名义候选预算及各任务原始分数到训练效用的完整映射。
- 已读文本未提供逐种子原始结果、聚合置信区间数值端点或差异显著性检验；不能将最佳点估计等同于显著领先。
- 已读文本未提供逐方法完整token、API费用及训练与推理计算开销分解；CHAMPS单单元消融的具体预算和独立资源明细也未见。
- 提供的理论块并非完整证明链，本次未独立核验全部证明或所引外部定理；已读部分未见实际训练满足全部理论假设的验证。
- 未提供所引前作全文，无法独立核验前作定位或确认创新优先性。
- 本卡依据本次提供的正文及附录文本块修订，未执行代码或复现实验。

## 阅读范围

读取 5 / 5 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Multi-agent scientific discovery with large language models raises a coupled learning problem: research assignments determine both which experiments are pursued and the experiences from which agents adapt. We introduce MELD, a unified hierarchical test-time training framework that jointly adapts a team-level Coordinator policy and agent-level individual Scientist policies within a single discovery process. The Coordinator generates a joint portfolio of search branches and research directives over a shared derivation tree, while Scientists develop hypotheses and execution plans implemented by a shared frozen Executor. Both levels receive alternating GRPO-style parameter updates under a shared smooth best-of-budget objective, allowing team organization and individual research behavior to co-evolve in a recursive self-improvement loop. Our analysis establishes objective alignment for the hierarchy, characterizes conditions for coordination gains over independent parallel discovery and the first-order benefit of private adaptation, and derives a finite-budget regret bound for adapted models. On 22 MLGym and MLE-bench tasks, MELD is best on 20 of them and achieves the highest aggregate normalized scores on MLGym, using a 4B backbone for coordination and research. Most baselines use proprietary Scientists, and all systems share one frozen Executor.
