# Which Agent's Skill Should Change? Group-Relative Credit Assignment for Evolving Multi-Agent Teams

作者：Yanan Ma, Yang Wang, David Le, Chenhan Yuan, Yizheng Sun, Guangwei Zhang, Chenghao Xiao, Chenghua Lin, Imon Banerjee
原文：https://arxiv.org/abs/2610.27227v1
首次提交：2026-10-19T19:55:19Z · 版本更新：2026-10-19T19:55:19Z
版本：v1 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- GRSE针对团队奖励难以归因到具体技能的问题，通过同题多次执行对比、结构化诊断和验证门控更新技能；作者报告其在HotpotQA及LoCoMo非开放域类别优于MASkills，LoCoMo多跳F1分别提升6.7和3.2。
  核验：原文支持；b00071支持方法描述；b00001、b00047和b00051支持比较结果及多跳F1增益6.7、3.2。注意b00071结论段将例外写成multi-hop，与摘要及结果表矛盾；本结论符合摘要和表格。
  - [原文 6 Conclusion · b00071](https://arxiv.org/html/2610.27227v1#S6.p1.1)：GRSE executes each question several times under the same skill libraries, compares the executions agent by agent, and attributes the team’s outcome to individual agent–skill pairs. Structured diagnosis grounds each attribution in checked execution steps, and the resulting credit drives targeted, validated skill updates.
  - [原文 摘要 · b00001](https://arxiv.org/html/2610.27227v1#abstract1.1)：On HotpotQA and LoCoMo with two open-weight actors, GRSE outperforms MASkills, the closest prior method, on HotpotQA and every LoCoMo category except open-domain, with the largest gains on multi-hop questions ( +6.7 and +3.2 F1).

## 研究问题

- 作者指出，技能在成功轨迹中出现不等于促成成功；按出现情况分配信用，可能奖励实际有害的技能。
  核验：原文支持；b00001明确提出出现不等于责任，并以成功轨迹中的有害技能获得正信用为例；结论正确保留了作者观点的归属。
  - [原文 摘要 · b00001](https://arxiv.org/html/2610.27227v1#abstract1.1)：Existing methods credit the skills present in each trajectory, yet presence is not responsibility: a harmful skill active in successful runs still earns positive credit.
- 研究目标是在模型参数固定的协作团队中，将团队结果归因到智能体及其自然语言技能，支持针对性的技能更新。
  核验：原文支持；b00071明确限定参数固定、自然语言技能及智能体—技能对归因，并说明归因用于针对性更新。
  - [原文 6 Conclusion · b00071](https://arxiv.org/html/2610.27227v1#S6.p1.1)：We studied behavioral credit assignment in cooperative language-model teams whose agents keep fixed parameters and act through natural-language skills. GRSE executes each question several times under the same skill libraries, compares the executions agent by agent, and attributes the team’s outcome to individual agent–skill pairs.

## 方法怎样工作

- 固定技能库，为每题从新上下文采样团队执行，默认G=4；评论器结合绝对奖励、组内相对优势与执行证据比较轨迹，默认保留等奖励组。
  核验：原文支持；b00015、b00017及b00019分别支持同库新上下文采样、G=4、绝对奖励与相对优势结合执行证据，以及默认保留等奖励组。
  - [原文 3.1 Grouped Rollouts and Relative Feedback · b00015](https://arxiv.org/html/2610.27227v1#S3.SS1.p2.1)：For each question q in batch \mathcal{B}_{t} , we sample G complete team executions from a fresh context under the same libraries and form
  - [原文 3.1 Grouped Rollouts and Relative Feedback · b00017](https://arxiv.org/html/2610.27227v1#S3.SS1.p2.2)：We set G=4 consistently in our experiments.
  - [原文 3.1 Grouped Rollouts and Relative Feedback · b00019](https://arxiv.org/html/2610.27227v1#S3.SS1.p3.1)：The critic receives both absolute rewards r_{qg} and relative advantages A_{qg} to compare trajectories and draws on execution evidence to assess skill credit (§ 3.2 ). Groups with equal-reward carry no contrasts but still show which behaviors consistently fail or succeed, so they are kept by default.
- 评论器逐智能体比较执行，标注技能有益、冗余、有害或中性；结构化诊断核查引用步骤、智能体归属与编辑资格，工具故障或责任不明时不编辑，违规诊断退回修复一次。
  核验：原文支持；b00020、b00023、b00025及b00114支持逐智能体比较、四类标签、引用与编辑资格核查、禁止编辑的情形，以及一次诊断修复。
  - [原文 3.2 Group-Relative Behavioral Critic Assignment · b00020](https://arxiv.org/html/2610.27227v1#S3.SS2.p1.1)：The critic reads all G executions of a question together and compares them agent by agent.
  - [原文 Skill credit. · b00023](https://arxiv.org/html/2610.27227v1#S3.SS2.SSS0.Px1.p1.1)：v labels the skill as helped, redundant, harmful, or neutral; e gives supporting evidence; and \Delta suggests a refinement.
  - [原文 Attribution checks. · b00025](https://arxiv.org/html/2610.27227v1#S3.SS2.SSS0.Px3.p1.1)：The critic interface checks that step references exist, match the named agent, and cite non-full-reward executions for L^{-} and full-reward executions for L^{+} . Refinement additionally requires an owned skill recorded in the cited failed rollout and a matching credit.
  - [原文 Attribution checks. · b00025](https://arxiv.org/html/2610.27227v1#S3.SS2.SSS0.Px3.p1.1)：Tool failures and uncertain or unknown responsibility permit only no edit.
  - [原文 Structured failure diagnosis. · b00114](https://arxiv.org/html/2610.27227v1#A6.SS0.SSS0.Px4.p1.1)：Diagnoses that violate the constraints are returned to the critic once for repair.
- 跨题汇总信用后修订、剪枝、合并或新增技能；每个候选库单独替换到更新前团队，验证分数不低于原分数减δ才接受，全部测试后组合获准候选。
  核验：原文支持；b00026、b00034及b00036—b00038支持跨题聚合、四种编辑操作、相对于同一更新前团队逐库验证、容差接受条件和最后组合候选。
  - [原文 3.3 Cross-Question Credit Aggregation · b00026](https://arxiv.org/html/2610.27227v1#S3.SS3.p1.1)：We therefore aggregate credit across questions into edit direction for existing skills and evidence for new skills.
  - [原文 3.4 Credit-Guided Skill Evolution · b00034](https://arxiv.org/html/2610.27227v1#S3.SS4.p2.1)：The operators refine credited skills along \Gamma_{i} , prune skills with low utility, consolidate redundant ones, and induce new skills from E_{i} .
  - [原文 3.4 Credit-Guided Skill Evolution · b00036](https://arxiv.org/html/2610.27227v1#S3.SS4.p2.2)：Let b_{t}=S(\mathcal{K}^{t}) and \widehat{s}_{i}=S(\mathcal{K}^{t}_{i\leftarrow\widehat{K}_{i}}) , where only agent i ’s library is replaced.
  - [原文 3.4 Credit-Guided Skill Evolution · b00037](https://arxiv.org/html/2610.27227v1#S3.E8)：K_{i}^{t+1}=\begin{cases}\widehat{K}_{i},&\widehat{s}_{i}\geq b_{t}-\delta,\\[2.0pt] K_{i}^{t},&\text{otherwise}.\end{cases} (8)
  - [原文 3.4 Credit-Guided Skill Evolution · b00038](https://arxiv.org/html/2610.27227v1#S3.SS4.p2.3)：Accepted candidates are assembled after all agents are tested, and acceptance remains per agent.

## 作者声称的贡献

- 作者自述沿用MASkills的技能表示与编辑算子，贡献集中于同题执行比较，以及将失败连接到智能体、技能、步骤引用和受检查编辑动作的结构化诊断。
  核验：原文支持；b00011直接支持沿用MASkills表示和算子，以及作者所强调的归因方式变化；结论未将作者自述提升为已独立确认的创新。
  - [原文 2.2 Reusable Skill Discovery and Evolution · b00011](https://arxiv.org/html/2610.27227v1#S2.SS2.p1.1)：We retain its skill representation and editing operators and change how credit is formed: GRSE jointly compares same-question team executions, and structured diagnosis links each failure to an agent–skill target, cited execution steps, and a checked edit action.
- 作者将检索改善、多跳任务间技能迁移及污染技能库修复作为方法有效性的证据；这些机制解释属于作者主张。
  核验：原文支持；b00001将检索改善、跨任务迁移和污染库恢复用于论证有效性；结论明确将机制解释归于作者，未声称独立验证了因果机制。
  - [原文 摘要 · b00001](https://arxiv.org/html/2610.27227v1#abstract1.1)：Its gains rest on better-grounded retrieval rather than answers given without evidence, and its learned skills transfer between the multi-hop tasks.
  - [原文 摘要 · b00001](https://arxiv.org/html/2610.27227v1#abstract1.1)：GRSE is robust to corrupted libraries: starting from planted harmful skills, it credits every planted skill with the correct sign and recovers the score of a clean library ( +6.3 points), whereas MASkills misattributes two and falls below its starting point.

## 本文报告的方法比较

- HotpotQA中完整GRSE在两种actor上均超过MASkills，但均未超过对应列最好的单模型基线；这些比较是报告均值的比较。
  核验：原文支持；b00045显示Qwen列83.7高于80.6但低于84.1，Gemma列82.8高于82.3但低于83.3；b00046支持按报告均值解读，未证明统计显著性。
  - [原文 5.1 Main Results · b00045](https://arxiv.org/html/2610.27227v1#S5.T1.2)：CoT-SC 82.6 83.3 Self-Refine 84.1 81.1 Two agents, 5 iterations Empty library (iter. 0) 80.6 81.6 MASkills 80.6 \pm 0.6 82.3 \pm 0.2 GRSE (ours) 83.7 \pm 0.5 82.8 \pm 0.4
  - [原文 5.1 Main Results · b00046](https://arxiv.org/html/2610.27227v1#S5.T1)：Columns give the actor model (Qwen3.8-27B, Gemma-4-31B-it).
- LoCoMo结果段报告GRSE在非开放域类别均超过MASkills；完整上下文单模型直接读取全部对话，作者将其作为上界式参考，其输入条件与检索团队不同。
  核验：原文支持；b00051支持非开放域类别的比较，b00047数值与之相符；b00052明确说明完整上下文基线的参考定位及不同输入条件。
  - [原文 LoCoMo. · b00051](https://arxiv.org/html/2610.27227v1#S5.SS1.SSS0.Px2.p1.1)：GRSE improves over MASkills on every LoCoMo category except open-domain with both actors.
  - [原文 LoCoMo. · b00052](https://arxiv.org/html/2610.27227v1#S5.SS1.SSS0.Px2.p2.1)：The full-context baseline is an upper-bound-style reference rather than a competitor: it gives a single model the entire conversation, whereas the two-agent systems must first retrieve evidence and answer from that alone.
- 混合类别消融中GRSE的类别等权平均F1最高；全部问题汇总F1为59.8，低于DAPO过滤的60.7和标签变体的60.8。
  核验：原文支持；b00102显示GRSE的Avg. F1为最高的54.9，而All F1为59.8，低于60.7及60.8；b00103明确区分汇总指标与类别等权平均。
  - [原文 Both components help. · b00068](https://arxiv.org/html/2610.27227v1#S5.SS5.SSS0.Px1.p1.1)：GRSE has the best category average in F1 (54.9) and BLEU (42.2), +2.9 F1 over the empty library, with the largest gains on temporal and open-domain questions.
  - [原文 Appendix D Ablation Analysis · b00102](https://arxiv.org/html/2610.27227v1#A4.T10.2)：GRSE 52.3 44.0 73.1 51.5 33.9 22.3 60.2 50.9 59.8 47.9 54.9 42.2
  - [原文 Appendix D Ablation Analysis · b00102](https://arxiv.org/html/2610.27227v1#A4.T10.2)：DAPO filter 53.4 44.0 71.6 51.0 29.8 18.1 62.6 53.4 60.7 48.9 54.4 41.6 w/ label 49.2 40.4 70.5 49.8 27.2 18.7 64.9 55.6 60.8 49.2 53.0 41.1
  - [原文 Appendix D Ablation Analysis · b00103](https://arxiv.org/html/2610.27227v1#A4.T10)：Token F1 and smoothed BLEU ( \times 100) per question category, over all questions (All), and averaged over the four categories with equal weight (Avg.).

## 实验证据与条件

任务：HotpotQA distractor–hard；训练/验证/测试100/50/500题
基础模型：actor：Qwen3.8-27B或Gemma-4-31B-it；critic及optimizer：Qwen3.8-27B
比较基线：MASkills、空库、CoT-SC、Self-Refine
指标：答案token F1×100；三次运行均值±标准差
结果：Qwen：GRSE 83.7±0.5，MASkills 80.6±0.6，Self-Refine 84.1；Gemma：GRSE 82.8±0.4，MASkills 82.3±0.2，CoT-SC 83.3。
资源条件：双智能体；空库起始、5轮；GRSE/MASkills每题4/1条轨迹；贪心测试。CoT-SC采样5次，Self-Refine最多3轮反馈。
- HotpotQA主实验报告完整GRSE在两种actor上均优于MASkills。
  核验：原文支持；b00045—b00046支持全部所列分数、模型、指标和重复次数；b00077及b00041支持划分和训练条件。优势指报告均值，且已明确两方法轨迹预算不同。
  - [原文 Data and checkpoints. · b00077](https://arxiv.org/html/2610.27227v1#A1.T7.2)：HotpotQA : distractor setting, development set (all questions labeled hard ). Split: 100 training, 50 validation, and 500 test questions (indices 150–649).
  - [原文 5.1 Main Results · b00045](https://arxiv.org/html/2610.27227v1#S5.T1.2)：CoT-SC 82.6 83.3 Self-Refine 84.1 81.1 Two agents, 5 iterations Empty library (iter. 0) 80.6 81.6 MASkills 80.6 \pm 0.6 82.3 \pm 0.2 GRSE (ours) 83.7 \pm 0.5 82.8 \pm 0.4
  - [原文 5.1 Main Results · b00046](https://arxiv.org/html/2610.27227v1#S5.T1)：Table 1: HotpotQA test F1 ( \times 100) with a greedy actor on 500 test questions. Columns give the actor model (Qwen3.8-27B, Gemma-4-31B-it). Qwen3.8-27B is critic and optimizer throughout.
  - [原文 5.1 Main Results · b00046](https://arxiv.org/html/2610.27227v1#S5.T1)：Mean over three runs, with SD as a subscript. CoT-SC uses 5 samples, Self-Refine at most 3 feedback rounds.
  - [原文 4.1 Experimental Setup · b00041](https://arxiv.org/html/2610.27227v1#S4.SS1.p2.1)：All skill-evolution methods start from empty libraries and run for five iterations. GRSE samples four team trajectories per question, whereas MASkills samples one.
任务：LoCoMo多跳/时间/开放域/单跳；测试题数156/179/52/453
基础模型：actor：Qwen3.8-27B或Gemma-4-31B-it；critic及optimizer：Qwen3.8-27B
比较基线：MASkills
指标：类别token F1及平滑BLEU×100；三次运行均值及标准差
结果：多跳相对MASkills：Qwen提升6.7 F1、5.3 BLEU；Gemma提升3.2 F1、2.8 BLEU；两种actor开放域均落后。
资源条件：双智能体、5轮、贪心测试；GRSE训练temperature=1.0、top-p=0.95，Qwen/Gemma的top-k=20/64；MASkills在LoCoMo全程贪心。
- LoCoMo主实验中多跳增益较大，但两种actor的开放域结果均低于MASkills。
  核验：原文支持；b00047—b00048及b00051支持类别规模、多跳增益和开放域落后；b00040、b00079支持模型及解码差异。结论保留了GRSE训练采样与MASkills全程贪心这一条件。
  - [原文 5.1 Main Results · b00047](https://arxiv.org/html/2610.27227v1#S5.T2.2)：Task ( N ) Multi-hop (156) Temporal (179) Open-domain (52) Single-hop (453) Method F1 BLEU F1 BLEU F1 BLEU F1 BLEU
  - [原文 LoCoMo. · b00051](https://arxiv.org/html/2610.27227v1#S5.SS1.SSS0.Px2.p1.1)：GRSE improves over MASkills on every LoCoMo category except open-domain with both actors. On multi-hop, it gains +6.7 F1 and +5.3 BLEU with Qwen3.8 and +3.2 F1 and +2.8 BLEU with Gemma4.
  - [原文 LoCoMo. · b00051](https://arxiv.org/html/2610.27227v1#S5.SS1.SSS0.Px2.p1.1)：Open-domain, the smallest category (52 questions), favor MASkills with both actors.
  - [原文 5.1 Main Results · b00048](https://arxiv.org/html/2610.27227v1#S5.T2)：Table 2: LoCoMo test results per question category: token F1 and smoothed BLEU ( \times 100) with a greedy actor.
  - [原文 5.1 Main Results · b00048](https://arxiv.org/html/2610.27227v1#S5.T2)：The remaining rows use the two-agent system trained for 5 iterations. Empty library is this system before any skill is learned (iteration 0). Mean over three runs, with SD as a subscript. Qwen3.8-27B serves as critic and optimizer for both skill methods.
  - [原文 4.1 Experimental Setup · b00040](https://arxiv.org/html/2610.27227v1#S4.SS1.p1.1)：The agents are executed by one of two open-weight actors, Qwen3.8-27B ( Qwen Team, 2026 ) and Gemma-4-31B-it ( Gemma Team, 2026 ) , each conditioned on its own skill library.
  - [原文 Decoding. · b00079](https://arxiv.org/html/2610.27227v1#A1.SS0.SSS0.Px3.p1.1)：Training rollouts use each model’s default sampling parameters (temperature 1.0, top- p 0.95, top- k 20 for Qwen and 64 for Gemma), so that rollouts of the same question can differ.
  - [原文 Decoding. · b00079](https://arxiv.org/html/2610.27227v1#A1.SS0.SSS0.Px3.p1.1)：MASkills on LoCoMo follows its released per-category runner, which decodes the actor greedily throughout.
任务：LoCoMo单跳污染技能库修复，453道测试题
基础模型：Qwen3.8 actor
比较基线：MASkills、污染初始库、仅有益技能库
指标：token F1、平滑BLEU×100；有益/有害技能效用符号
结果：起始F1 60.6；GRSE 66.9（+6.3），MASkills 58.4（−2.2），仅有益技能66.7。5条有益/有害技能中GRSE符号全对，MASkills错2条。
资源条件：每方法1次训练、5轮、每轮24题；每智能体初始3技能、上限4；δ=0.02；贪心测试。
- 污染技能库实验报告GRSE恢复至仅有益技能参考水平，每方法仅训练一次。
  核验：原文支持；b00058—b00059支持恢复水平及分数，b00063支持五条有益或有害技能的符号判定，b00096支持初始化、容量及单次训练条件。五条不包含另一个无关技能。
  - [原文 5.3 Robustness Analysis · b00058](https://arxiv.org/html/2610.27227v1#S5.T4.2)：Perturbed (start) 60.6 52.1 – 9.7 Helpful skills only 66.7 57.4 +6.1 4.2 MASkills 58.4 49.3 -2.2 7.9 GRSE 66.9 57.4 \mathbf{+6.3} 4.6
  - [原文 5.3 Robustness Analysis · b00059](https://arxiv.org/html/2610.27227v1#S5.T4)：Table 4: Repairing a perturbed skill library on LoCoMo single-hop questions (Qwen3.8 actor, 453 test questions, greedy decoding, one run per method). Token F1 and smoothed BLEU ( \times 100) are measured with the final library.
  - [原文 5.3 Robustness Analysis · b00063](https://arxiv.org/html/2610.27227v1#S5.SS3.p3.1)：GRSE assigns the correct sign to all five helpful and harmful skills and separates the two kinds by 0.31 , whereas MASkills gets two of the five wrong and separates them by only 0.03 .
  - [原文 Setup and perturbed library. · b00096](https://arxiv.org/html/2610.27227v1#A3.SS0.SSS0.Px1.p1.1)：both GRSE and MASkills start from the same seed library of three skills per agent instead of an empty library (Figure 4 ). The library limit is four skills per agent, so one induction slot stays free.
  - [原文 Setup and perturbed library. · b00096](https://arxiv.org/html/2610.27227v1#A3.SS0.SSS0.Px1.p1.1)：All other settings follow the per-category runs (24 training questions per iteration, five iterations, \delta=0.02 , L=4 ), and each method is trained once.
任务：HotpotQA与LoCoMo多跳之间双向技能迁移
基础模型：Qwen3.8 actor
比较基线：目标任务空库、目标任务域内GRSE技能库
指标：测试F1×100；三次运行均值±标准差
结果：迁移到LoCoMo：51.5±0.6，空库50.2，域内53.4±0.8；迁移到HotpotQA：82.5±0.0，空库80.7，域内83.7±0.5。
资源条件：互换最终技能库，保持目标任务智能体角色；三次运行。
- 两个多跳任务互换最终技能库后，GRSE迁移分数均高于空库、低于域内训练。
  核验：原文支持；b00064—b00065支持双向迁移的全部数值、三次运行及角色保持条件；两个方向的迁移均值均介于对应空库与域内训练之间。
  - [原文 5.4 Cross-Task Transfer · b00064](https://arxiv.org/html/2610.27227v1#S5.T6.2)：Target LoCoMo MH HotpotQA Empty 50.2 80.7
  - [原文 5.4 Cross-Task Transfer · b00064](https://arxiv.org/html/2610.27227v1#S5.T6.2)：GRSE In-domain 53.4 \pm 0.8 83.7 \pm 0.5 Transfer 51.5 \pm 0.6 82.5 \pm 0.0
  - [原文 5.4 Cross-Task Transfer · b00065](https://arxiv.org/html/2610.27227v1#S5.T6)：Table 6: Transfer between the two multi-hop tasks (Qwen3.8 actor, test F1 \times 100, mean \pm SD over three runs). Transfer : final libraries from the other task (HotpotQA libraries on LoCoMo multi-hop questions and vice versa); each agent keeps the target task’s role.
任务：LoCoMo四类别共同学习技能库
基础模型：Qwen3.8 actor
比较基线：空库、无结构化诊断、G=1
指标：类别等权平均F1及平滑BLEU×100
结果：完整GRSE为54.9 F1/42.2 BLEU；相对空库+2.9 F1；去结构化、G=1分别降低1.0、0.8 F1。
资源条件：每设置1次运行；贪心测试；原文报告842道测试题。
- 混合类别消融中，移除结构化诊断或组采样均降低类别平均F1；每设置仅一次运行。
  核验：原文支持；b00102—b00103及b00068支持54.9/42.2、相对空库增加2.9，以及两项消融分别降低1.0和0.8 F1；单次运行和原文报告的842题均已明确。
  - [原文 Appendix D Ablation Analysis · b00103](https://arxiv.org/html/2610.27227v1#A4.T10)：Ablation on LoCoMo with one shared library learned on all four categories together (Qwen3.8 actor, greedy decoding, one run per setting, 842 test questions).
  - [原文 Both components help. · b00068](https://arxiv.org/html/2610.27227v1#S5.SS5.SSS0.Px1.p1.1)：GRSE has the best category average in F1 (54.9) and BLEU (42.2), +2.9 F1 over the empty library, with the largest gains on temporal and open-domain questions. Removing structured diagnosis or group sampling ( G{=}1 ) lowers the average F1 by 1.0 and 0.8 respectively.
任务：LoCoMo空库到最终库的答案状态及引用证据变化
基础模型：Gemma4 actor
比较基线：空库、MASkills
指标：F1变化、拒答转正确数量、无证据占比；非拒答答案的正确阈值F1≥0.5
结果：GRSE总增益+7.4 F1，其中拒答转正确贡献+6.0；无证据比例22%降至14%。GRSE的61道拒答转正确中5道无证据；MASkills对应34道中9道。
资源条件：取各方法的第一次运行，分析空库至最终库的变化；各类别独立技能库；贪心解码。
- 答案转移分析为检索改善提供观察性支持；证据判定要求轮次引用，并将NO_EVIDENCE、未执行的grep调用或无可用输出计为无证据。
  核验：原文支持；b00053—b00055支持增益、转移数量及无证据比例；b00084—b00085支持首次运行、贪心解码与判定规则。结论限定为观察性支持，没有把引用存在等同于检索正确性或因果证明。
  - [原文 5.2 Analysis of Learned Skills · b00054](https://arxiv.org/html/2610.27227v1#S5.T3)：Table 3: Answer transitions from the empty to the final library.
  - [原文 5.2 Analysis of Learned Skills · b00054](https://arxiv.org/html/2610.27227v1#S5.T3)：All rows use the first run of each method; on LoCoMo, each category has its own library, and empty-library answers come from iteration 0 of the same GRSE run.
  - [原文 Where do the gains come from? · b00055](https://arxiv.org/html/2610.27227v1#S5.SS2.SSS0.Px1.p1.1)：With the Gemma4 actor on LoCoMo, declined questions that become correct account for most of GRSE’s gain ( +6.0 of +7.4 ), and the last two columns show how they are fixed.
  - [原文 Where do the gains come from? · b00055](https://arxiv.org/html/2610.27227v1#S5.SS2.SSS0.Px1.p1.1)：MASkills reduces declines without improving retrieval: the share of questions with no cited evidence stays at 22%, and 9 of its 34 D \to C lack evidence. GRSE lowers this share to 14%, with only 5 of 61 lacking evidence, consistent with crediting Agent 1’s search rather than Agent 2’s answer.
  - [原文 Answer states. · b00085](https://arxiv.org/html/2610.27227v1#A2.SS0.SSS0.Px1.p1.1)：Otherwise it is correct if its F1 score is at least 0.5 and wrong if not.
  - [原文 Answer states. · b00085](https://arxiv.org/html/2610.27227v1#A2.SS0.SSS0.Px1.p1.1)：On LoCoMo, a question has evidence if the retriever’s output cites at least one dialogue turn ( [D session : turn ] ). Outputs that say NO_EVIDENCE , print a grep call instead of running it, or return nothing usable count as no evidence.
  - [原文 Appendix B Learned Skills Analysis · b00084](https://arxiv.org/html/2610.27227v1#A2.p1.1)：All analyses use the first run of each configuration and greedy decoding.
任务：HotpotQA及LoCoMo主实验训练成本评估
基础模型：Qwen3.8及Gemma4 actor
比较基线：MASkills
指标：actor输入输出token、墙钟时间
结果：附录报告训练轨迹token为3.8–4.3倍，含验证为1.7–3.0倍，耗时为1.2–1.5倍；LoCoMo/Qwen含验证45.4M对26.6M token。
资源条件：3次运行、每次5轮；组内执行并行；部分共享服务器；排除未记录的critic和optimizer token。
- 成本附录报告GRSE增加actor token及耗时，统计不包含critic和optimizer token。
  核验：原文支持；b00105—b00109支持所列成本、倍数及统计条件；排除critic和optimizer仅指token统计。b00072给出的倍数范围与附录不同，但本结论明确归于成本附录，转述准确。
  - [原文 Appendix E Runtime Analysis · b00106](https://arxiv.org/html/2610.27227v1#A5.T11)：Training cost of the main-result runs (mean \pm SD over three runs of five iterations; LoCoMo sums the four per-category runs). Actor tokens are the input and output tokens of both agents; critic and optimizer tokens are not logged and are excluded.
  - [原文 Appendix E Runtime Analysis · b00105](https://arxiv.org/html/2610.27227v1#A5.T11.2)：HotpotQA LoCoMo Qwen3.8 Gemma4 Qwen3.8 Gemma4 Wall-clock training time (h)
  - [原文 Token usage. · b00108](https://arxiv.org/html/2610.27227v1#A5.SS0.SSS0.Px1.p1.1)：GRSE executes each training question G{=}4 times, so its training rollouts use 3.8–4.3 \times the actor tokens of MASkills (e.g., 23.3M vs. 6.1M on LoCoMo with Qwen3.8).
  - [原文 Token usage. · b00108](https://arxiv.org/html/2610.27227v1#A5.SS0.SSS0.Px1.p1.1)：Validation costs about the same for both methods, which reduces the overall overhead to 1.7–3.0 \times (45.4M vs. 26.6M).
  - [原文 Wall-clock time. · b00109](https://arxiv.org/html/2610.27227v1#A5.SS0.SSS0.Px2.p1.1)：Training time grows by only 1.2–1.5 \times , because the executions of a group run in parallel. Times are approximate, since some runs shared servers with other jobs.

## 原文支持的局限性

- 作者明确限定评估范围为两个问答基准、两种actor、一个critic和双智能体顺序团队；更大团队、非顺序通信、长程工具任务及其他critic尚待测试。
  核验：原文支持；b00072明确列出两个基准、两种actor、一个critic及双智能体顺序团队，并列举尚待测试的扩展范围。
  - [原文 Limitations · b00072](https://arxiv.org/html/2610.27227v1#Sx1.p1.1)：we evaluate two-agent sequential teams on two question-answering benchmarks with two open-weight actors and one critic model. Larger teams, non-sequential communication, longer tool-heavy tasks, and other critic models remain to be tested in the future.
- 作者承认检查只保证引用和动作一致性，解释仍属观察性判断；没有成功对照的纠正标为假设。
  核验：原文支持；b00025明确将检查限定为引用和动作一致性，将解释称为观察性评估，并要求无成功对照的纠正标为假设。
  - [原文 Attribution checks. · b00025](https://arxiv.org/html/2610.27227v1#S3.SS2.SSS0.Px3.p1.1)：A correction without a successful comparison is marked as a hypothesis. These checks enforce reference and action consistency. The explanation remains an observational assessment.
- 成本统计排除未记录的critic及optimizer token；部分运行共享服务器，墙钟时间仅为近似值。
  核验：原文支持；b00106明确排除未记录的critic和optimizer token；b00109明确说明共享服务器导致时间仅为近似值。
  - [原文 Appendix E Runtime Analysis · b00106](https://arxiv.org/html/2610.27227v1#A5.T11)：Actor tokens are the input and output tokens of both agents; critic and optimizer tokens are not logged and are excluded.
  - [原文 Wall-clock time. · b00109](https://arxiv.org/html/2610.27227v1#A5.SS0.SSS0.Px2.p1.1)：Times are approximate, since some runs shared servers with other jobs.

## 多智能体机制

- 角色与分工：两个智能体角色固定：HotpotQA中Agent 1读取问题及篇章，Agent 2结合其响应给出最终答案；LoCoMo中Agent 1检索，Agent 2仅据检索证据作答。
  核验：原文支持；b00111直接支持固定角色、HotpotQA的输入与交接，以及LoCoMo检索后仅据检索证据作答的安排。
  - [原文 Agent roles. · b00111](https://arxiv.org/html/2610.27227v1#A6.SS0.SSS0.Px1.p1.1)：Roles do not change during training. On HotpotQA (Figure 7 ), the two agents act in sequence: Agent 1 sees the question and passages, and Agent 2 additionally sees Agent 1’s response and gives the final answer.
  - [原文 Agent roles. · b00111](https://arxiv.org/html/2610.27227v1#A6.SS0.SSS0.Px1.p1.1)：On LoCoMo (Figures 8 and 9 ), Agent 1 searches the conversation with <grep> calls (at most three, each returning up to 20 matching turns), and Agent 2 answers from the retrieved evidence only.
- 协作结构：固定Qwen3.8-27B充当评论器和技能优化器；评论器逐智能体比较执行，技能按信用更新，参数及角色保持固定。
  核验：原文支持；b00040明确指定固定Qwen3.8-27B担任critic和optimizer，参数与角色保持固定；b00020支持逐智能体比较执行。
  - [原文 4.1 Experimental Setup · b00040](https://arxiv.org/html/2610.27227v1#S4.SS1.p1.1)：A fixed Qwen3.8-27B model serves as critic and skill optimizer for all methods. Model parameters and agent roles stay fixed. The agents change only through their skills, which are revised according to the assigned credit.
  - [原文 3.2 Group-Relative Behavioral Critic Assignment · b00020](https://arxiv.org/html/2610.27227v1#S3.SS2.p1.1)：The critic reads all G executions of a question together and compares them agent by agent.
- 通信机制：顺序交接：Agent 2接收Agent 1响应或检索证据，再生成最终回答。
  核验：原文支持；b00111明确描述HotpotQA中Agent 2接收Agent 1响应，以及LoCoMo中Agent 2依据检索证据作答。
  - [原文 Agent roles. · b00111](https://arxiv.org/html/2610.27227v1#A6.SS0.SSS0.Px1.p1.1)：On HotpotQA (Figure 7 ), the two agents act in sequence: Agent 1 sees the question and passages, and Agent 2 additionally sees Agent 1’s response and gives the final answer.
  - [原文 Agent roles. · b00111](https://arxiv.org/html/2610.27227v1#A6.SS0.SSS0.Px1.p1.1)：On LoCoMo (Figures 8 and 9 ), Agent 1 searches the conversation with <grep> calls (at most three, each returning up to 20 matching turns), and Agent 2 answers from the retrieved evidence only.
- 调度方式：单次团队执行内顺序通信，同题的多条执行并行；候选库分别验证，全部测试后组合。
  核验：原文支持；b00040支持执行内部顺序通信，b00109支持组内执行并行，b00034—b00038支持候选库分别验证及测试完成后组合。
  - [原文 4.1 Experimental Setup · b00040](https://arxiv.org/html/2610.27227v1#S4.SS1.p1.1)：Each method consists of two agents with task-specific roles that communicate sequentially, and the second agent produces the final answer.
  - [原文 Wall-clock time. · b00109](https://arxiv.org/html/2610.27227v1#A5.SS0.SSS0.Px2.p1.1)：Training time grows by only 1.2–1.5 \times , because the executions of a group run in parallel.
  - [原文 3.4 Credit-Guided Skill Evolution · b00038](https://arxiv.org/html/2610.27227v1#S3.SS4.p2.3)：Accepted candidates are assembled after all agents are tested, and acceptance remains per agent.

## 自进化机制

- 改变对象：更新各智能体的自然语言技能库，技能正文接在固定角色提示词后；模型参数及角色不变。
  核验：原文支持；b00071支持固定参数和自然语言技能；b00111明确技能正文接在固定角色及Skills标题后，并说明角色不变。
  - [原文 6 Conclusion · b00071](https://arxiv.org/html/2610.27227v1#S6.p1.1)：We studied behavioral credit assignment in cooperative language-model teams whose agents keep fixed parameters and act through natural-language skills.
  - [原文 Agent roles. · b00111](https://arxiv.org/html/2610.27227v1#A6.SS0.SSS0.Px1.p1.1)：Each agent’s system prompt is its fixed role followed by its current skill library: the role, a heading ## Skills , and the bodies of all skills in the library. Roles do not change during training.
- 反馈来源：HotpotQA训练奖励为token F1，LoCoMo为类别token F1与平滑BLEU的均值；评论器结合绝对奖励、相对优势及执行证据形成信用。
  核验：原文支持；b00080明确规定两个任务的训练奖励；b00019明确评论器结合绝对奖励、相对优势与执行证据评估信用。
  - [原文 Hyperparameters. · b00080](https://arxiv.org/html/2610.27227v1#A1.SS0.SSS0.Px4.p1.1)：For skill evolution methods, we use the mean of category-specific token F1 and the smoothed BLEU as training reward on LoCoMo to reflect both answer content and exact wording; token F1 on HotpotQA.
  - [原文 3.1 Grouped Rollouts and Relative Feedback · b00019](https://arxiv.org/html/2610.27227v1#S3.SS1.p3.1)：The critic receives both absolute rewards r_{qg} and relative advantages A_{qg} to compare trajectories and draws on execution evidence to assess skill credit (§ 3.2 ).
- 更新方式：每轮修订和归纳，每两轮合并；HotpotQA每两轮、LoCoMo每三轮剪枝。现有技能采用锚定编辑，新技能从归纳证据创建。
  核验：原文支持；b00080支持全部操作频率；b00115支持修订现有技能时采用锚定编辑，以及从归纳证据创建新技能。锚定编辑对应refinement，不能据此概括剪枝和合并的实现。
  - [原文 Hyperparameters. · b00080](https://arxiv.org/html/2610.27227v1#A1.SS0.SSS0.Px4.p1.1)：The operator schedule \Omega applies refinement and induction every iteration, consolidation every second iteration, and pruning every second (HotpotQA) or third (LoCoMo) iteration.
  - [原文 Skill update operators. · b00115](https://arxiv.org/html/2610.27227v1#A6.SS0.SSS0.Px5.p1.1)：Induction creates a new skill from the induction evidence collected for an agent, refinement applies anchored edits to an existing skill, and consolidation merges overlapping skills (Figure 13 ).
- 发生阶段：更新发生于训练阶段；常规实验从空库迭代5轮，最终技能库用于贪心测试。
  核验：原文支持；b00080及b00079支持常规技能演化实验从空库训练五轮、最终库贪心测试；结论的常规实验限定避免涵盖b00096中的污染库初始化例外。
  - [原文 Hyperparameters. · b00080](https://arxiv.org/html/2610.27227v1#A1.SS0.SSS0.Px4.p1.1)：GRSE samples G=4 team trajectories per question and MASkills one. Both start from empty libraries and run five iterations.
  - [原文 Decoding. · b00079](https://arxiv.org/html/2610.27227v1#A1.SS0.SSS0.Px3.p1.1)：All reported test scores evaluate the final (iteration-5) libraries with greedy decoding.
- 保留范围：技能在同一任务的训练迭代间保留并继续更新；另有最终库跨任务迁移实验，支持跨任务复用。
  核验：原文支持；b00063描述同一技能跨迭代更新并在第三轮剪枝；b00064—b00065支持最终库在两个指定多跳任务间复用。支持范围限于这些迁移实验。
  - [原文 5.3 Robustness Analysis · b00063](https://arxiv.org/html/2610.27227v1#S5.SS3.p3.1)：MASkills credits it positively and keeps raising its utility over the next two iterations, consistent with crediting a skill for successes in which it is merely present. GRSE instead marks it harmful and prunes it in iteration 3.
  - [原文 5.4 Cross-Task Transfer · b00065](https://arxiv.org/html/2610.27227v1#S5.T6)：Transfer : final libraries from the other task (HotpotQA libraries on LoCoMo multi-hop questions and vice versa); each agent keeps the target task’s role.
- 独立任务验证：候选库在固定验证集上评分，逐智能体接受或回退；表8规定所有设置H=1。HotpotQA有50道验证题；LoCoMo按对话划分，避免同一对话跨集合。
  核验：原文支持；b00034—b00037支持固定验证集及逐智能体接受或保留旧库；b00081各列H均为1，b00077支持HotpotQA的50道验证题，b00076支持LoCoMo按对话隔离划分。
  - [原文 3.4 Credit-Guided Skill Evolution · b00034](https://arxiv.org/html/2610.27227v1#S3.SS4.p2.1)：Each candidate is validated against the same pre-update team, so that an update whose attribution was wrong is not kept. For fixed validation set \mathcal{V} and H executions per question, define
  - [原文 3.4 Credit-Guided Skill Evolution · b00037](https://arxiv.org/html/2610.27227v1#S3.E8)：K_{i}^{t+1}=\begin{cases}\widehat{K}_{i},&\widehat{s}_{i}\geq b_{t}-\delta,\\[2.0pt] K_{i}^{t},&\text{otherwise}.\end{cases} (8)
  - [原文 Hyperparameters. · b00081](https://arxiv.org/html/2610.27227v1#A1.T8.2)：Validation executions H 1 1 1
  - [原文 Data and checkpoints. · b00077](https://arxiv.org/html/2610.27227v1#A1.T7.2)：Split: 100 training, 50 validation, and 500 test questions (indices 150–649).
  - [原文 Data and checkpoints. · b00076](https://arxiv.org/html/2610.27227v1#A1.SS0.SSS0.Px2.p1.1)：LoCoMo is split by conversation, so no conversation appears in two splits.

## 系统分析与启发（推测）

- 系统分析：同题对比和引用检查提供可审计的归因路径，但不足以证明因果责任；作者也将解释限定为观察性判断（b00020、b00025）。
- 系统分析：各候选分别在旧团队中获准，不能保证组合后的性能不降；δ还允许单项验证分数小幅下降（b00036—b00038）。
- 系统分析：主比较同时涉及轨迹数量、LoCoMo训练解码和训练成本差异，不能仅凭主结果隔离信用算法本身的净收益（b00041、b00079、b00108）。
- 系统分析：轮次引用加无效输出排除规则衡量的是证据可用性，不能单独证明引用充分支持答案；检索改善结论应受该指标定义约束（b00085）。

## 待研究问题（系统分析）

- 系统分析：匹配完整token预算、采样数量和解码设置后，GRSE相对MASkills及单智能体方法的优势是否保留？
- 系统分析：对所有获准候选再做联合验证，是否能缓解技能交互导致的退化？
- 系统分析：增加critic模型、团队规模及污染修复实验的随机种子后，归因符号准确率和修复收益是否稳定？

## 缺失信息

- 提供文本未包含提示词图中的完整正文；不能据此恢复全部实验提示词。表8已提供H=1、ε=10^-8，不应再列为缺失。
- 提供文本未明确建立跨智能体共享运行时记忆，也未发现等预算单智能体比较；跨类别共享技能库不等于跨智能体共享记忆。
- 提供文本展示训练迭代保留和最终技能库迁移，未交代部署后跨任务持续在线更新机制。
- 内部冲突：b00071写“except multi-hop”，而b00001、b00051写“except open-domain”；本卡片采用与主表一致的后者。
- 内部冲突：Gemma的HotpotQA无结构版在b00045为83.3±0.4，在b00050为83.1；Qwen的LoCoMo单跳无结构版在b00047为67.7，在b00051为67.4。
- 样本口径待澄清：b00077四类别测试题数合计840，但同块及b00103报告混合设置842题。
- 成本口径待澄清：b00072报告actor-token为1.6–2.9倍、时间1.3–1.8倍；b00108—b00109报告含验证token为1.7–3.0倍、时间1.2–1.5倍。
- critic及optimizer token明确未记录（b00106），无法核算完整训练token成本；所给文本未发现统计显著性检验。
- 未阅读所引前作，无法独立确认创新优先权或作者对前作的概括；本卡片仅依据提供的全文分块，未复现实验。

## 阅读范围

读取 3 / 3 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Cooperative language-model agents can improve without weight updates by revising reusable skills, but only if a shared team reward is traced to the responsible agent and skill. Existing methods credit the skills present in each trajectory, yet presence is not responsibility: a harmful skill active in successful runs still earns positive credit. We present \textbf{GRSE}, \textbf{G}roup-\textbf{R}elative \textbf{S}kill \textbf{E}volution, which assigns behavioral credit by comparison: inspired by GRPO, it executes each question several times under the same skill libraries and contrasts the executions to credit agent--skill pairs, with structured diagnosis of failures. On HotpotQA and LoCoMo with two open-weight actors, GRSE outperforms MASkills, the closest prior method, on HotpotQA and every LoCoMo category except open-domain, with the largest gains on multi-hop questions ($+6.7$ and $+3.2$ F1). Its gains rest on better-grounded retrieval rather than answers given without evidence, and its learned skills transfer between the multi-hop tasks. GRSE is robust to corrupted libraries: starting from planted harmful skills, it credits every planted skill with the correct sign and recovers the score of a clean library ($+6.3$ points), whereas MASkills misattributes two and falls below its starting point.
