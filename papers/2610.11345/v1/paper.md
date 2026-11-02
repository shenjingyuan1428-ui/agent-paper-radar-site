# SynCo: Data Synthesis Co-Training for Self-Evolving LLMs via Multi-Agent Reinforcement Learning

作者：Wei Yang, Shawn Li, Yuehan Qin, Yawei Wang, Mingxi Wang, Shixuan Li, Tiankai Yang, Jiate Li, Jesse Thomason, Xuezhe Ma, Yue Zhao
原文：https://arxiv.org/abs/2610.11345v1
首次提交：2026-10-08T06:40:18Z · 版本更新：2026-10-08T06:40:18Z
版本：v1 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- SynCo针对训练任务与学习者能力失配，以同批在线交互联合优化任务合成器和解题器；作者报告Qwen3-8B在八个数学基准上平均准确率达78.72%，较冻结合成器提高2.87个百分点。
  核验：原文支持；b00002、b00021支持能力失配动机及同批在线联合更新；b00052、b00055支持8B八基准平均78.72%及较Frozen提高2.87个百分点，属于作者报告结果。
  - [原文 1 Introduction · b00002](https://arxiv.org/html/2610.11345v1#S1.p1.1)：Tasks that were once informative may become trivial, whereas tasks far beyond the agent’s competence continue to provide little useful learning signal.
  - [原文 3.1 Problem Formulation: Agentic Data Synthesis Co-Training · b00021](https://arxiv.org/html/2610.11345v1#S3.SS1.p4.2)：Both policies are updated from the same online batch using agent-specific group-relative policy optimization, forming a unified co-training process rather than sequential synthesis and learning.
  - [原文 Coupled evolution of agents and data. · b00052](https://arxiv.org/html/2610.11345v1#S3.T1)：Reasoning accuracy (%) across eight mathematical reasoning benchmarks. Vanilla denotes the initial Qwen3-8B model.
  - [原文 4.1 RQ1: Does Co-Training Data Synthesis Improve Reasoning Performance? · b00055](https://arxiv.org/html/2610.11345v1#S4.SS1.p1.1)：The frozen-Synthesizer baseline improves further to 75.85%, whereas SynCo reaches 78.72%, outperforming the strongest external baseline by 3.76 percentage points, Frozen by 2.87 points, and Vanilla by 6.36 points.

## 研究问题

- 作者认为，学习者进步后原有任务可能过易，过难任务仍缺乏有效信号；部分既有流程按旧检查点生成任务后再训练，未从同次在线交互联合优化生成与解题策略。
  核验：原文支持；b00002、b00003明确表达上述动机和对部分既有流程的描述；结论保留了作者观点归属，未视为对前作的独立核验。
  - [原文 1 Introduction · b00002](https://arxiv.org/html/2610.11345v1#S1.p1.1)：Tasks that were once informative may become trivial, whereas tasks far beyond the agent’s competence continue to provide little useful learning signal.
  - [原文 1 Introduction · b00003](https://arxiv.org/html/2610.11345v1#S1.p2.1)：Many existing frameworks still alternate between generating tasks from a previous learner checkpoint and subsequently training the learner on the resulting data
  - [原文 1 Introduction · b00003](https://arxiv.org/html/2610.11345v1#S1.p2.1)：Although this enables iterative adaptation, the synthesis policy and the task policy are not optimized together from the same online interaction.
- 任务有效、新颖或更难，并不保证当前学习者获得有效组相对优化信号；关键是采样轨迹组能否产生差异化反馈。
  核验：原文支持；b00057与b00143明确区分任务质量、难度和实际优化效用；b00125将有效梯度任务定义为轨迹组奖励不一致，支持差异化反馈这一限定。
  - [原文 4.2 RQ2: How Does the Synthesized Curriculum Evolve During Co-Training? · b00057](https://arxiv.org/html/2610.11345v1#S4.SS2.p1.1)：These results distinguish task validity and diversity from realized optimization utility: well-formed and novel tasks may still provide no effective policy gradient for the current Reasoner.
  - [原文 D.5 Why Ex-Ante Difficulty Does Not Predict Gradient Utility · b00143](https://arxiv.org/html/2610.11345v1#A4.SS5.p2.1)：This distinction is important under group-relative optimization: a task can become substantially harder while remaining equally uninformative if all sampled trajectories still receive the same outcome.

## 方法怎样工作

- 结合任务池统计、近期能力诊断和拒绝反馈生成任务；检查结构、适定性、答案一致性及冗余，并进行独立解共识检查。Reasoner仅接收题目。
  核验：原文支持；b00119支持合成上下文的三类来源及Reasoner仅接收题目；b00103支持所列验证项目和独立解共识检查。
  - [原文 C.4 Agent Prompt Templates · b00119](https://arxiv.org/html/2610.11345v1#A3.SS4.p1.1)：At each synthesis iteration, the placeholders in the Synthesizer user prompt are populated using the current synthetic-pool statistics, the Reasoner’s recent capability diagnostics, and feedback from rejected tasks.
  - [原文 B.2 Reward and Verification Details · b00103](https://arxiv.org/html/2610.11345v1#A2.SS2.p1.1)：The verifier checks schema completeness, problem well-posedness, answer consistency, output validity, and redundancy with recently generated tasks. We additionally apply an independent consensus check to filter tasks whose reference answers are insufficiently supported by independent solutions.
  - [原文 C.4 Agent Prompt Templates · b00119](https://arxiv.org/html/2610.11345v1#A3.SS4.p1.1)：The Reasoner receives only the generated problem statement; all pedagogical metadata, reference solutions, and verification information are reserved for task validation and reward computation.
- 每轮生成32题，每个获准任务采样4条轨迹。Reasoner按正确性和格式获1、0.9或0奖励；合成器即时奖励为质量门控×可靠性门控×T(μ)，其中G(v)=clip((v−0.5)/0.5,0,1)，T(μ)=2min(μ,1−μ)。拒绝任务奖励−0.5，非空输出另加0.1。
  核验：原文支持；b00118、b00104支持任务数、轨迹数和三级奖励；b00105—b00110支持门控公式，所写min形式与原分段式等价；b00112支持拒绝惩罚和非空输出奖励。
  - [原文 C.3 Implementation Details · b00118](https://arxiv.org/html/2610.11345v1#A3.SS3.p1.1)：Each training iteration contains 32 synthesized tasks, and the Reasoner samples K=4 independent trajectories for every admitted task.
  - [原文 B.2 Reward and Verification Details · b00104](https://arxiv.org/html/2610.11345v1#A2.SS2.p2.1)：For the Reasoner, each rollout receives a correctness-based reward: 1.0 for a correct answer in the prescribed format, 0.9 for a correct answer recovered without that format, and 0 otherwise.
  - [原文 B.2 Reward and Verification Details · b00105](https://arxiv.org/html/2610.11345v1#A2.E23)：r_{S,t}^{\mathrm{imm}}=G_{q}\!\left(r_{t}^{\mathrm{quality}}\right)G_{r}\!\left(r_{t}^{\mathrm{reliability}}\right)T(\mu_{t}), (23)
  - [原文 B.2 Reward and Verification Details · b00107](https://arxiv.org/html/2610.11345v1#A2.E24)：G(v)=\operatorname{clip}\left(\frac{v-0.5}{0.5},0,1\right). (24)
  - [原文 B.2 Reward and Verification Details · b00110](https://arxiv.org/html/2610.11345v1#A2.E25)：T(\mu_{t})=\begin{cases}2\mu_{t},&\mu_{t}\leq 0.5,\\ 2(1-\mu_{t}),&\mu_{t}>0.5.\end{cases} (25)
  - [原文 B.2 Reward and Verification Details · b00112](https://arxiv.org/html/2610.11345v1#A2.SS2.p4.1)：Tasks rejected by the verifier receive an immediate Synthesizer reward of -0.5 and are excluded from Reasoner training. The training framework additionally applies a constant 0.1 bonus to non-empty model outputs.
- 从同一在线批次分别更新两个策略；交互信息及拒绝原因进入持续记忆，重建下一轮上下文，使策略和训练分布共同变化。
  核验：原文支持；b00021支持同批分别优化；b00045、b00046支持持续记忆及拒绝原因保留；b00051支持上下文和合成策略共同改变后续分布。
  - [原文 3.1 Problem Formulation: Agentic Data Synthesis Co-Training · b00021](https://arxiv.org/html/2610.11345v1#S3.SS1.p4.2)：Both policies are updated from the same online batch using agent-specific group-relative policy optimization, forming a unified co-training process rather than sequential synthesis and learning.
  - [原文 3.4 Closed-Loop Agent–Data Self-Evolution · b00045](https://arxiv.org/html/2610.11345v1#S3.SS4.p1.1)：To sustain self-evolution, each interaction batch is fed back into a persistent memory that reconstructs the learner state and conditions the next synthesis round.
  - [原文 Feedback-driven context renewal. · b00046](https://arxiv.org/html/2610.11345v1#S3.SS4.SSS0.Px1.p1.2)：Rejected tasks and their failure reasons are also retained to discourage repeated malformed, unreliable, or redundant generations.
  - [原文 Coupled evolution of agents and data. · b00051](https://arxiv.org/html/2610.11345v1#S3.SS4.SSS0.Px2.p1.2)：Compared with \widetilde{\mathcal{D}}_{t} , this distribution changes through both a renewed context and an updated synthesis policy.

## 作者声称的贡献

- 作者自述贡献：将任务合成与任务学习表述为耦合多智能体强化学习，在统一在线过程中联合优化Synthesizer与Reasoner；不据此确认创新优先权。
  核验：原文支持；b00007直接列出该贡献表述；结论明确限定为作者自述，没有据此确认创新优先权。
  - [原文 1 Introduction · b00007](https://arxiv.org/html/2610.11345v1#S1.I1.i1.p1.1)：We formulate agentic data synthesis and task learning as a coupled multi-agent reinforcement learning problem, and propose SynCo to jointly optimize a Synthesizer and a Reasoner within a unified online training process.
- 作者自述贡献：显式分析合成任务是否提供有效梯度信号，区分粗粒度难度、静态任务质量与当前学习者的实际优化效用。
  核验：原文支持；b00080明确声称分析合成任务是否承载梯度，并区分粗粒度难度、静态质量与当前Reasoner下的实际优化效用。
  - [原文 A.2 Self-Evolving LLMs and Agent–Data Co-Training · b00080](https://arxiv.org/html/2610.11345v1#A1.SS2.p3.1)：Beyond final performance, we explicitly analyze whether synthesized tasks are gradient-bearing, thereby distinguishing coarse difficulty and static data quality from the realized optimization utility observed under the current Reasoner.

## 本文报告的方法比较

- 8B主比较中，SynCo平均准确率78.72%，Frozen为75.85%，最强外部基线ScaleQuest-Math为74.96%；静态池GRPO、拒绝采样SFT和离线增强GRPO分别为71.75%、72.23%、73.13%。
  核验：原文支持；b00052界定8B八基准比较；b00053、b00055支持全部平均准确率及ScaleQuest-Math在所比较外部基线中的排名。
  - [原文 Coupled evolution of agents and data. · b00052](https://arxiv.org/html/2610.11345v1#S3.T1)：Reasoning accuracy (%) across eight mathematical reasoning benchmarks. Vanilla denotes the initial Qwen3-8B model.
  - [原文 4.1 RQ1: Does Co-Training Data Synthesis Improve Reasoning Performance? · b00055](https://arxiv.org/html/2610.11345v1#S4.SS1.p1.1)：among them, ScaleQuest-Math is the strongest with 74.96%, while the controlled Static-Pool GRPO, Reject-Sample SFT, and Offline-Augment GRPO baselines reach 71.75%, 72.23%, and 73.13%, respectively.
  - [原文 4.1 RQ1: Does Co-Training Data Synthesis Improve Reasoning Performance? · b00055](https://arxiv.org/html/2610.11345v1#S4.SS1.p1.1)：The frozen-Synthesizer baseline improves further to 75.85%, whereas SynCo reaches 78.72%, outperforming the strongest external baseline by 3.76 percentage points, Frozen by 2.87 points, and Vanilla by 6.36 points.
- 固定终点检查点下，仅汇总GSM-Hard、MATH-500、GSM8K、SVAMP四项：初始错误题SynCo解出283/878，Frozen为238/878；初始正确题保留2,533/2,560与2,522/2,560。相对Frozen的净增解出数为56，其中45（80.4%）来自初始错误子集。
  核验：原文支持；b00060、b00130、b00131支持四基准范围、固定终点检查点和全部计数；283−238=45、2533−2522=11，合计56，45/56约为80.4%。
  - [原文 D.3 Attributing Gains to Capability Acquisition · b00131](https://arxiv.org/html/2610.11345v1#A4.SS3.p2.1)：Figure 7 shows that this pattern holds consistently across all four benchmarks. On GSM-Hard, the Learn subset contributes +21 of the +27 net gain, compared with +6 from Retain. Similarly, Learn contributes +9 of +11 on MATH-500, +11 of +13 on GSM8K, and +4 of +5 on SVAMP.
  - [原文 D.3 Attributing Gains to Capability Acquisition · b00130](https://arxiv.org/html/2610.11345v1#A4.SS3.p1.1)：Both methods are evaluated at fixed terminal checkpoints, avoiding benchmark-specific checkpoint selection.
  - [原文 D.3 Attributing Gains to Capability Acquisition · b00130](https://arxiv.org/html/2610.11345v1#A4.SS3.p1.1)：On the 2,560 initially correct examples, the two variants remain close: SynCo retains 2,533 examples (98.95%), compared with 2,522 (98.52%) for the frozen variant, yielding 11 additional retained solutions.
  - [原文 D.3 Attributing Gains to Capability Acquisition · b00130](https://arxiv.org/html/2610.11345v1#A4.SS3.p1.1)：The difference is substantially larger on the 878 initially incorrect examples, where SynCo solves 283 (32.23%) compared with 238 (27.11%) for Frozen. Thus, the Learn subset contributes 45 of the 56 additional solved examples, accounting for 80.4% of the overall advantage.
- 离线重排既有任务池的最高四分位中，门控奖励、可教性排序的有效梯度任务比例为62.3%、64.6%，质量、新颖性排序为12.8%、12.0%，全池为16.2%。作者明确这属于诊断分析，并非因果训练消融。
  核验：原文支持；b00061明确统计离线重排后最高四分位；b00062支持全部比例，并明确限定为诊断分析而非因果训练消融。
  - [原文 4.4 RQ4: Which Synthesis Signals Align with Gradient-Bearing Tasks? · b00061](https://arxiv.org/html/2610.11345v1#S4.F3)：Tasks are reranked offline using different signals, and the proportion of gradient-bearing tasks in the top-ranked quartile is reported.
  - [原文 4.4 RQ4: Which Synthesis Signals Align with Gradient-Bearing Tasks? · b00062](https://arxiv.org/html/2610.11345v1#S4.SS4.p1.1)：Relative to the 16.2% gradient-bearing prevalence in the full task pool, ranking by the SynCo gated reward increases this proportion to 62.3%, while teachability alone reaches 64.6%. In contrast, quality and novelty alone yield only 12.8% and 12.0%, respectively, both below the pool prevalence.
  - [原文 4.4 RQ4: Which Synthesis Signals Align with Gradient-Bearing Tasks? · b00062](https://arxiv.org/html/2610.11345v1#S4.SS4.p1.1)：Because this analysis reranks an already collected task pool, it should be interpreted as a diagnostic analysis rather than a causal training ablation;

## 实验证据与条件

任务：GSM8K、SVAMP、ASDiv、GSM-Hard、MATH-500、AIME24、AIME25、Minerva数学推理
基础模型：两个独立参数的Qwen3-8B
比较基线：Vanilla、Frozen Synthesizer、ScaleQuest-Math及其他外部检查点和合成语料基线
指标：统一验证的答案准确率；八基准未加权平均
结果：SynCo 78.72%，Frozen 75.85%，ScaleQuest-Math 74.96%；较Vanilla提高6.36个百分点。
资源条件：每轮32题，每个获准任务4条轨迹；两个各8 GPU工作组。外部语料各采样2,940题，其下游GRPO、rollout、优化器及总优化预算与受控静态数据基线匹配。
- 八个数学基准主实验；外部发布检查点直接评估，合成语料比较则控制题数和下游优化设置，两类比较的预算控制范围不同。
  核验：原文支持；b00052、b00054、b00055支持评估范围、平均口径和结果；b00118支持模型及硬件、采样配置；b00116与b00117分别支持直接评估发布检查点和受控训练合成语料，结论未混同两类预算控制。
  - [原文 4 Experiments · b00054](https://arxiv.org/html/2610.11345v1#S4.p1.1)：We evaluate mathematical reasoning on eight benchmarks: GSM8K, SVAMP, ASDiv, GSM-Hard, MATH-500, AIME24, AIME25, and Minerva, reporting answer accuracy under a unified verification protocol.
  - [原文 Coupled evolution of agents and data. · b00052](https://arxiv.org/html/2610.11345v1#S3.T1)：Avg. is the unweighted average across all benchmarks.
  - [原文 4.1 RQ1: Does Co-Training Data Synthesis Improve Reasoning Performance? · b00055](https://arxiv.org/html/2610.11345v1#S4.SS1.p1.1)：The frozen-Synthesizer baseline improves further to 75.85%, whereas SynCo reaches 78.72%, outperforming the strongest external baseline by 3.76 percentage points, Frozen by 2.87 points, and Vanilla by 6.36 points.
  - [原文 4.1 RQ1: Does Co-Training Data Synthesis Improve Reasoning Performance? · b00055](https://arxiv.org/html/2610.11345v1#S4.SS1.p1.1)：among them, ScaleQuest-Math is the strongest with 74.96%
  - [原文 C.3 Implementation Details · b00118](https://arxiv.org/html/2610.11345v1#A3.SS3.p1.1)：We initialize the Synthesizer and the Reasoner as two independently parameterized copies of Qwen3-8B, and additionally repeat the main comparison with Qwen3-4B.
  - [原文 C.3 Implementation Details · b00118](https://arxiv.org/html/2610.11345v1#A3.SS3.p1.1)：Each training iteration contains 32 synthesized tasks, and the Reasoner samples K=4 independent trajectories for every admitted task.
  - [原文 C.3 Implementation Details · b00118](https://arxiv.org/html/2610.11345v1#A3.SS3.p1.1)：The Qwen3-8B experiments are distributed across two 8-GPU worker groups, one for each agent.
  - [原文 C.2 Baselines · b00116](https://arxiv.org/html/2610.11345v1#A3.SS2.p3.1)：For these baselines, we directly use the authors’ publicly released checkpoints without additional training or adaptation, and evaluate them using exactly the same mathematical evaluation protocol as SynCo.
  - [原文 C.2 Baselines · b00117](https://arxiv.org/html/2610.11345v1#A3.SS2.p4.1)：For each corpus, we sample exactly 2,940 unique synthetic problems, matching the number of verified training tasks used by SynCo, and train the same Qwen3 learner using the same GRPO implementation, rollout configuration, optimizer settings, and total optimization budget as our controlled static-data baseline.
任务：八个数学推理基准的跨规模评估
基础模型：Qwen3-4B
比较基线：Vanilla、Frozen Synthesizer、EnvScaler
指标：八基准未加权平均答案准确率
结果：SynCo 75.20%，Frozen 73.72%，Vanilla 70.14%；七项超过Frozen；EnvScaler在AIME24和AIME25更强。
资源条件：沿用8B训练协议及超参数，但采用骨干特定推理配置；4B专属硬件条件未明确。
- Qwen3-4B跨规模比较同样获得平均收益，但并非逐基准全面占优。
  核验：原文支持；b00122—b00124支持4B平均收益、七项超过Frozen及EnvScaler在两项AIME上更强；b00118支持训练设置及推理配置例外。所提供文本未明确4B专属硬件。
  - [原文 D.1 Generalization Across Model Scales · b00123](https://arxiv.org/html/2610.11345v1#A4.T4)：Reasoning accuracy (%) across eight mathematical reasoning benchmarks using Qwen3-4B.
  - [原文 D.1 Generalization Across Model Scales · b00123](https://arxiv.org/html/2610.11345v1#A4.T4)：Avg. is the unweighted average across all benchmarks.
  - [原文 D.1 Generalization Across Model Scales · b00122](https://arxiv.org/html/2610.11345v1#A4.SS1.p1.1)：conditioning a frozen Synthesizer on the evolving Reasoner raises the average accuracy from 70.14% to 73.72%, while jointly optimizing the Synthesizer further improves it to 75.20%.
  - [原文 D.1 Generalization Across Model Scales · b00122](https://arxiv.org/html/2610.11345v1#A4.SS1.p1.1)：SynCo improves over its frozen counterpart on seven of eight benchmarks
  - [原文 D.1 Generalization Across Model Scales · b00122](https://arxiv.org/html/2610.11345v1#A4.SS1.p1.1)：While EnvScaler attains stronger results on AIME24 and AIME25, SynCo performs more consistently across the broader benchmark suite
  - [原文 C.3 Implementation Details · b00118](https://arxiv.org/html/2610.11345v1#A3.SS3.p1.1)：The Qwen3-4B experiments follow the same training protocol and hyperparameters except for backbone-specific inference configurations.
任务：在线联合训练的耗时与有效任务产出
基础模型：未报告 / 未提取
比较基线：SynCo (Frozen Synth.)
指标：平均更新耗时、端到端单步耗时中位数、有效任务率及每批有效任务数
结果：SynCo/Frozen：更新45.1/45.8秒，端到端343.5/341.6秒，有效任务率14.5%/13.7%，每批4.64/4.38题；SynCo生成3,200题，验证通过2,940题。
资源条件：双方各100步，匹配Reasoner优化预算与每题rollout配置；产出统计限第13—70步；两次运行独立执行。
- 作者报告100步效率比较的计算成本相当；有效任务产出仅在双方共同有效日志区间统计，提升幅度有限。
  核验：原文支持；b00147、b00150—b00153支持100步、全部耗时与产出数字及13—70步统计窗口；b00067支持匹配预算。结论保留独立运行和收益有限的限制，未声称固有速度优势。
  - [原文 D.5 Why Ex-Ante Difficulty Does Not Predict Gradient Utility · b00147](https://arxiv.org/html/2610.11345v1#A4.T8.7)：SynCo (Frozen Synth.) 100 45.8 s 45.0 s 341.6 s SynCo 100 45.1 s 44.6 s 343.5 s
  - [原文 4.6 RQ6: How Efficient Is Online Synthesizer–Reasoner Co-Training? · b00067](https://arxiv.org/html/2610.11345v1#S4.SS6.p1.1)：Because both variants share the same Reasoner optimization budget and per-task rollout configuration, the comparison isolates the effect of adapting the synthesis policy itself.
  - [原文 D.5 Why Ex-Ante Difficulty Does Not Predict Gradient Utility · b00150](https://arxiv.org/html/2610.11345v1#A4.T8.10)：Productive-task statistics are computed over steps 13–70, the interval with valid logging for both variants.
  - [原文 D.6 Training Efficiency, Gradient Utilization, and Data Production · b00152](https://arxiv.org/html/2610.11345v1#A4.SS6.p2.1)：The productive-task rate increases from 13.7% under Frozen to 14.5% with SynCo , corresponding to 4.38 versus 4.64 productive tasks per batch of 32.
  - [原文 D.6 Training Efficiency, Gradient Utilization, and Data Production · b00151](https://arxiv.org/html/2610.11345v1#A4.SS6.p1.1)：Because the runs were executed independently, these small wall-clock differences should be interpreted as comparable computational profiles rather than evidence that either variant is intrinsically faster.
  - [原文 D.6 Training Efficiency, Gradient Utilization, and Data Production · b00153](https://arxiv.org/html/2610.11345v1#A4.SS6.p3.1)：Across 100 training steps, SynCo generates 3,200 task candidates, of which 2,940 pass verification, yielding a 91.9% acceptance rate.

## 原文支持的局限性

- 作者承认课程逐渐落后于能力边界：有效梯度任务比例从首桶31.3%降至末桶9.5%，全对比例从34.4%升至59.9%；质量和新颖性仍高，但优化价值下降。
  核验：原文支持；b00126直接支持首末桶比例、任务趋于全对及课程落后于能力边界的作者解释；b00056、b00057支持质量和新颖性仍高而优化效用下降。
  - [原文 D.2 How Does the Synthesized Curriculum Evolve During Co-Training? · b00126](https://arxiv.org/html/2610.11345v1#A4.SS2.p2.1)：Gradient-bearing tasks decrease from 31.3% in the earliest bucket to 9.5% in the final bucket, while the all-correct proportion rises from 34.4% to 59.9%.
  - [原文 D.2 How Does the Synthesized Curriculum Evolve During Co-Training? · b00126](https://arxiv.org/html/2610.11345v1#A4.SS2.p2.1)：Meanwhile, task quality remains high and novelty increases, showing that a curriculum can remain valid and diverse while progressively losing optimization value.
- 2,940个验证任务中仅475个（16.2%）产生非退化组相对反馈；“可学习”标签的预测相关性仅0.009。可教性在观察轨迹后计算，其高相关源于构造，不能作为事前预测能力的证据。
  核验：原文支持；b00125支持2940题中475题产生非退化反馈；b00144支持0.009相关性；b00145明确可教性在观察轨迹后计算且相关性源于构造，不能据此证明事前预测能力。
  - [原文 D.2 How Does the Synthesized Curriculum Evolve During Co-Training? · b00125](https://arxiv.org/html/2610.11345v1#A4.SS2.p1.1)：Table 5 provides a detailed decomposition of the 2,940 verified tasks collected during co-training.
  - [原文 D.2 How Does the Synthesized Curriculum Evolve During Co-Training? · b00125](https://arxiv.org/html/2610.11345v1#A4.SS2.p1.1)：Only 475 tasks (16.2%) satisfy this condition, compared with 994 (33.8%) that are uniformly incorrect and 1,471 (50.0%) that are uniformly correct.
  - [原文 D.5 Why Ex-Ante Difficulty Does Not Predict Gradient Utility · b00144](https://arxiv.org/html/2610.11345v1#A4.SS5.p3.1)：Treating the Synthesizer’s learnable label as a binary predictor of gradient-bearing tasks yields a correlation of only 0.009 , with 16.8% precision and 22.3% recall.
  - [原文 D.5 Why Ex-Ante Difficulty Does Not Predict Gradient Utility · b00145](https://arxiv.org/html/2610.11345v1#A4.SS5.p4.1)：By contrast, outcome-grounded teachability is computed after observing the Reasoner’s rollouts and is strongly aligned with the gradient-bearing indicator ( r=0.934 ) by construction.
- 课程分析未记录精确迭代编号，只能用生成顺序近似训练进度；效率比较独立运行，小幅耗时差异不能证明固有速度优势。
  核验：原文支持；b00056明确未记录精确迭代编号、以生成顺序近似进度；b00151明确独立运行的小幅耗时差异不能证明固有速度优势。
  - [原文 4.2 RQ2: How Does the Synthesized Curriculum Evolve During Co-Training? · b00056](https://arxiv.org/html/2610.11345v1#S4.F2)：Generation order approximates training progression because exact iteration indices were not recorded.
  - [原文 D.6 Training Efficiency, Gradient Utilization, and Data Production · b00151](https://arxiv.org/html/2610.11345v1#A4.SS6.p1.1)：Because the runs were executed independently, these small wall-clock differences should be interpreted as comparable computational profiles rather than evidence that either variant is intrinsically faster.

## 多智能体机制

- 角色与分工：两个独立参数智能体：Synthesizer生成训练任务，Reasoner学习解题；后者的实际行为反馈给前者。
  核验：原文支持；b00014直接支持两个独立参数智能体的角色划分，以及Reasoner实际行为反馈用于改进合成。
  - [原文 3.1 Problem Formulation: Agentic Data Synthesis Co-Training · b00014](https://arxiv.org/html/2610.11345v1#S3.SS1.p1.1)：We consider two independently parameterized agents: a Synthesizer \pi_{S}(\cdot;\theta_{S}) that generates training tasks and a Reasoner \pi_{R}(\cdot;\theta_{R}) that learns to solve them.
  - [原文 3.1 Problem Formulation: Agentic Data Synthesis Co-Training · b00014](https://arxiv.org/html/2610.11345v1#S3.SS1.p1.1)：The Synthesizer determines the Reasoner’s training experience, while the Reasoner’s realized behavior provides feedback for improving synthesis.
- 协作结构：同一在线交互批次提供两类奖励：轨迹级正确性优化Reasoner，任务级交互反馈优化Synthesizer；两者参数独立。
  核验：原文支持；b00080明确同批交互产生Reasoner轨迹级正确性奖励和Synthesizer任务级反馈，并更新两个独立参数策略。
  - [原文 A.2 Self-Evolving LLMs and Agent–Data Co-Training · b00080](https://arxiv.org/html/2610.11345v1#A1.SS2.p3.1)：the same online interaction batch produces rollout-level correctness rewards for the Reasoner and task-level, interaction-grounded rewards for the Synthesizer, after which both independently parameterized policies are updated within a unified multi-agent training process.
- 通信机制：Reasoner仅接收题目；任务池统计、近期能力诊断和拒绝反馈进入合成器下一轮上下文。
  核验：原文支持；b00119明确Reasoner仅接收题目，并说明每轮合成提示词使用任务池统计、近期能力诊断和拒绝反馈。
  - [原文 C.4 Agent Prompt Templates · b00119](https://arxiv.org/html/2610.11345v1#A3.SS4.p1.1)：At each synthesis iteration, the placeholders in the Synthesizer user prompt are populated using the current synthetic-pool statistics, the Reasoner’s recent capability diagnostics, and feedback from rejected tasks.
  - [原文 C.4 Agent Prompt Templates · b00119](https://arxiv.org/html/2610.11345v1#A3.SS4.p1.1)：The Reasoner receives only the generated problem statement; all pedagogical metadata, reference solutions, and verification information are reserved for task validation and reward computation.
- 共享记忆：系统维护交互记忆，保存近期任务、验证结果、解题轨迹和成功率、合成奖励及拒绝记录，并重建合成上下文；两个智能体是否均直接读写该存储未明确。
  核验：原文支持；b00023、b00045支持记忆内容及重建合成上下文；所提供文本未明确两个智能体是否均直接读写该存储，结论保留了这一信息边界。
  - [原文 Capability-conditioned synthesis context. · b00023](https://arxiv.org/html/2610.11345v1#S3.SS2.SSS0.Px1.p1.1)：Let \mathcal{M}_{t} denote the interaction memory before iteration t , containing recent tasks, validation outcomes, Reasoner rollouts and success rates, synthesis rewards, and rejection records.
  - [原文 3.4 Closed-Loop Agent–Data Self-Evolution · b00045](https://arxiv.org/html/2610.11345v1#S3.SS4.p1.1)：To sustain self-evolution, each interaction batch is fed back into a persistent memory that reconstructs the learner state and conditions the next synthesis round.
- 调度方式：每轮生成32个任务，对获准任务各采样4条Reasoner轨迹；两个策略在同一训练迭代内更新，未据此推断硬件并行执行。
  核验：原文支持；b00118支持每轮32题、每个获准任务4条轨迹；b00042支持同一训练迭代更新两策略。这些描述本身不确立硬件并行执行。
  - [原文 C.3 Implementation Details · b00118](https://arxiv.org/html/2610.11345v1#A3.SS3.p1.1)：Each training iteration contains 32 synthesized tasks, and the Reasoner samples K=4 independent trajectories for every admitted task.
  - [原文 Joint multi-agent update. · b00042](https://arxiv.org/html/2610.11345v1#S3.SS3.SSS0.Px3.p1.2)：Although their parameters and rewards remain separate, both policies are updated within the same training iteration:

## 自进化机制

- 改变对象：迭代更新解题策略、合成策略及生成上下文，进而改变后续训练分布。
  核验：原文支持；b00045支持更新解题和合成策略；b00051明确更新后的上下文与合成策略共同改变后续训练分布。
  - [原文 3.4 Closed-Loop Agent–Data Self-Evolution · b00045](https://arxiv.org/html/2610.11345v1#S3.SS4.p1.1)：The co-training procedure in Section 3.3 updates both the Reasoner and the policy that generates its training experience.
  - [原文 Coupled evolution of agents and data. · b00051](https://arxiv.org/html/2610.11345v1#S3.SS4.SSS0.Px2.p1.2)：Compared with \widetilde{\mathcal{D}}_{t} , this distribution changes through both a renewed context and an updated synthesis policy.
- 反馈来源：Reasoner获得正确性反馈；Synthesizer获得质量、可靠性及基于实际轨迹结果的可教性反馈。新颖性与诊断对齐仅用于分析，不直接进入主实验门控奖励。
  核验：原文支持；b00001支持两类智能体的反馈来源；b00112明确新颖性与诊断对齐仅记录用于分析，不直接进入主实验门控奖励。
  - [原文 摘要 · b00001](https://arxiv.org/html/2610.11345v1#abstract1.1)：Correctness feedback improves the Reasoner, while task quality, answer reliability, and outcome-grounded teachability guide the Synthesizer.
  - [原文 B.2 Reward and Verification Details · b00112](https://arxiv.org/html/2610.11345v1#A2.SS2.p4.1)：Novelty and diagnostic-alignment signals are logged for analysis but do not directly contribute to the gated Synthesizer reward used in the main experiments.
- 更新方式：通过UnityMAS-O对两个智能体分别执行GRPO，同一在线批次提供各自更新信号。
  核验：原文支持；b00118明确通过UnityMAS-O使用GRPO优化两个智能体；b00021明确同一在线批次提供各智能体的组相对优化信号。
  - [原文 C.3 Implementation Details · b00118](https://arxiv.org/html/2610.11345v1#A3.SS3.p1.1)：Both agents are optimized using GRPO through the UnityMAS-O [ Chen et al., 2026c ] training framework, with vLLM serving as the rollout backend.
  - [原文 3.1 Problem Formulation: Agentic Data Synthesis Co-Training · b00021](https://arxiv.org/html/2610.11345v1#S3.SS1.p4.2)：Both policies are updated from the same online batch using agent-specific group-relative policy optimization, forming a unified co-training process rather than sequential synthesis and learning.
- 发生阶段：自进化发生在在线训练阶段，通过生成任务、联合更新和重建课程形成闭环。
  核验：原文支持；b00013完整描述生成任务、在线联合更新及重塑未来课程的闭环，支持将所述自进化定位于在线训练过程。
  - [原文 3 Method · b00013](https://arxiv.org/html/2610.11345v1#S3.F1)：(2) The resulting interaction batch is then used to jointly update the Synthesizer and the Reasoner through online multi-agent co-training. (3) The updated agents in turn reshape the future curriculum and task distribution, forming an agent–data self-evolution loop.
- 保留范围：训练期间跨任务、跨迭代保留交互信息及拒绝原因，以近期窗口重建状态；训练结束后的持续性未交代。
  核验：原文支持；b00045、b00046、b00048支持跨迭代保留交互信息、拒绝原因及使用近期窗口重建状态；训练结束后的存储持续性在所提供文本中未交代。
  - [原文 3.4 Closed-Loop Agent–Data Self-Evolution · b00045](https://arxiv.org/html/2610.11345v1#S3.SS4.p1.1)：To sustain self-evolution, each interaction batch is fed back into a persistent memory that reconstructs the learner state and conditions the next synthesis round.
  - [原文 Feedback-driven context renewal. · b00046](https://arxiv.org/html/2610.11345v1#S3.SS4.SSS0.Px1.p1.2)：Rejected tasks and their failure reasons are also retained to discourage repeated malformed, unreliable, or redundant generations.
  - [原文 Feedback-driven context renewal. · b00048](https://arxiv.org/html/2610.11345v1#S3.SS4.SSS0.Px1.p1.3)：The recent interaction window emphasizes the Reasoner’s current behavior while retaining sufficient history to summarize task coverage, recurring weaknesses, and synthesis failures.
- 独立任务验证：使用标准测试划分和统一答案提取、验证流程；收益归因使用固定终点检查点，避免按基准挑选检查点。
  核验：原文支持；b00113明确标准测试划分及所有方法统一的答案提取、验证流程；b00130明确收益归因比较使用固定终点检查点。结论未将这一检查点条件扩大到全部实验。
  - [原文 C.1 Benchmarks · b00113](https://arxiv.org/html/2610.11345v1#A3.SS1.p1.1)：We use the standard test splits and report answer accuracy under the same answer-extraction and verification pipeline for all methods.
  - [原文 D.3 Attributing Gains to Capability Acquisition · b00130](https://arxiv.org/html/2610.11345v1#A4.SS3.p1.1)：Both methods are evaluated at fixed terminal checkpoints, avoiding benchmark-specific checkpoint selection.

## 系统分析与启发（推测）

- 系统分析：Frozen对照支持更新合成策略的收益，但其明确匹配的是Reasoner优化预算和每题rollout配置，不能直接证明双智能体优于总计算预算相等的单智能体（b00067、b00118）。
- 系统分析：可教性与有效梯度指标共享实际轨迹结果，高相关不能独立证明最终学习收益；离线重排序也不能替代重新训练的奖励消融（b00145、b00062）。
- 系统分析：四基准归因中的56是两个方法解出总数之差，45是初始错误子集上的净差；这些汇总计数不能识别恰好56道仅SynCo解出的题（b00130、b00131）。

## 待研究问题（系统分析）

- 系统分析：更长训练或动态调整每题轨迹数，能否缓解有效梯度任务比例下降，同时维持固定总计算预算？问题依据为b00126。
- 系统分析：在相同总GPU时间或总token预算下，双策略训练能否超过仅优化Reasoner的方案？当前预算控制边界见b00067、b00118。
- 系统分析：验证器与独立解共识检查的错误在联合优化中会被抑制还是放大？所给材料描述了检查机制，但未给出误判评估（b00103、b00108）。

## 缺失信息

- 所给原文块未展示验证器完整规则、精确组合系数和阈值、独立共识检查采样配置及误判评估；b00108将精确系数和阈值指向补充实现。
- 所给原文块未明确GPU型号、随机种子、重复实验次数、置信区间或显著性检验；4B专属硬件条件及效率实验明确对应的骨干型号未找到。
- 所给原文块未展示完整提示模板、能力诊断算法、记忆窗口大小和存储更新实现，也未明确两个智能体是否均直接读写记忆。
- 未在所给原文块中找到总计算预算匹配的单智能体比较；不能将冻结合成器对照直接等同于该比较。
- 未在所给原文块中找到超过所报告100步过程的长期自进化、训练结束后持续适应或跨领域迁移结果。
- b00129的难度组计数为630、1,926、363，系统核算合计2,919，比同表全池2,940少21；所给原文块未解释差额。
- 未提供前作原文，无法独立确认前作结论、首次提出或创新优先权；本次仅核验提供文本，未复现实验。

## 阅读范围

读取 4 / 4 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Self-evolving LLM agents promise to improve autonomously through continual interaction and learning, reducing their dependence on manually curated supervision. Realizing this promise requires not only updating the agent, but also evolving its training experience as its capabilities change. However, most existing pipelines rely on static datasets or separately updated synthesis models, causing previously useful tasks to become trivial while overly difficult tasks remain uninformative. This growing mismatch between agent capability and training experience limits sustained self-improvement. To address this problem, we propose SynCo, an agentic data synthesis co-training framework for self-evolving LLMs based on multi-agent reinforcement learning. SynCo jointly optimizes two independently parameterized agents: a Synthesizer that constructs training tasks from the Reasoner's evolving capability state, and a Reasoner that learns from the resulting experience. Each synthesized task induces multiple Reasoner rollouts whose outcomes provide complementary rewards to both agents. Correctness feedback improves the Reasoner, while task quality, answer reliability, and outcome-grounded teachability guide the Synthesizer. Their updates are fed back into subsequent synthesis rounds, allowing the task-solving policy and its training distribution to evolve together. Extensive experiments across eight mathematical reasoning benchmarks demonstrate that SynCo substantially outperforms a broad range of existing synthetic-data methods and controlled baselines, achieving the strongest overall performance while deriving most of its gains from previously unsolved problems.
