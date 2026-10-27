# Who Is the Influencer? Consensus Dynamics in Multi-Agent Systems

作者：Gouki Minegishi, Jingyuan Feng, Hiroki Furuta, Takeshi Kojima, Yusuke Iwasawa, Yutaka Matsuo
原文：https://arxiv.org/abs/2610.31105v1
首次提交：2026-10-22T11:15:49Z · 版本更新：2026-10-22T11:15:49Z
版本：v1 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- 本文用无正确答案的命名游戏研究异构多智能体最终采纳谁的意见，作者报告七个模型家族中较强模型的标签最常获胜，并提出加权粒子能量解释；能量验证限于同批运行的一致性。
  核验：原文支持；b00006、b00007支持无正确答案的命名游戏及七家族内较强模型标签最常获胜的作者报告；b00011支持加权粒子解释，b00105明确限定为同批运行的一致性检查。
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.31105v1#S1.p4.1)：The labels (e.g., fmhja , hdsad , and vokhg ) carry no meaning, so there is no right answer.
  - [原文 1 Introduction · b00007](https://arxiv.org/html/2610.31105v1#S1.p5.1)：We run this experiment on seven model families: GPT-5, GPT-4.1, Claude 5, Gemini, Gemma 4, Qwen 3.5, and Qwen 2.5. In every family, the population most often converges to the label of the stronger model.
  - [原文 1 Introduction · b00011](https://arxiv.org/html/2610.31105v1#S1.I1.i3.p1.1)：To understand these observations, we propose a physics-inspired framework that models the models as a system of interacting particles with varying weights, and show that this intuitively aligns with our empirical results.
  - [原文 Measurement. · b00105](https://arxiv.org/html/2610.31105v1#A10.SS0.SSS0.Px2.p1.1)：The agreement is therefore a test of consistency, not an out-of-sample prediction.

## 研究问题

- 研究问题是混合不同模型时群体最终采纳谁的意见；作者指出所述前作多研究同质群体或双智能体对话。本文用无意义标签分离共识动力学与预训练知识的影响。
  核验：原文支持；b00004明确提出混合模型群体最终采纳谁的意见，并由作者概括所述前作的范围；b00006说明无意义标签的分离目的。结论未将作者对前作的概括视为独立核实的文献事实。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2610.31105v1#S1.p3.1)：However, for simplicity, these studies consider either homogeneous populations, in which every agent is the same model, or conversations between only two agents.
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2610.31105v1#S1.p3.1)：In other words, when a system mixes different models, whose view does the population finally adopt?
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.31105v1#S1.p4.1)：Therefore, the game separates the dynamics of reaching a common opinion from the knowledge that the models acquired in pretraining.

## 方法怎样工作

- 构造无意义五字母标签任务，不提示一致目标或奖励；各类模型以独有标签填满初始记忆，每次查询打乱候选标签顺序。
  核验：原文支持；b00013明确说明五字母无意义标签、无一致目标或奖励、每次查询打乱候选顺序；b00019明确说明按模型分配独有标签并填满初始记忆。
  - [原文 2.1 Agent Protocol · b00013](https://arxiv.org/html/2610.31105v1#S2.SS1.p1.1)：The prompt says only that players choose a label for the same referent in repeated interactions. It mentions no goal of agreement, no reward, and nothing about the other agents or the experiment. The labels are meaningless five-letter strings.
  - [原文 2.3 Heterogeneous Populations · b00019](https://arxiv.org/html/2610.31105v1#S2.SS3.p1.1)：Each model is assigned its own label. Every agent of that model starts with a memory filled with that label.
  - [原文 2.1 Agent Protocol · b00013](https://arxiv.org/html/2610.31105v1#S2.SS1.p1.1)：The order of the candidate labels is shuffled at every query.
- 均匀抽取有序说者—听者对，仅听者更新有限FIFO记忆；以记忆组成近似输出概率，并按标签集合与分配聚类统计，未决试验对所有类别计为失败。
  核验：原文支持；b00014支持均匀抽样有序说者—听者对及仅听者更新FIFO记忆；b00015支持记忆组成代理；b00069支持按标签集合与分配聚类统计、未决试验计为所有类别失败。
  - [原文 2.2 Speaker–Listener Interactions · b00014](https://arxiv.org/html/2610.31105v1#S2.SS2.p1.1)：In each interaction, we draw an ordered pair (j,i) , j\neq i , uniformly from the N(N-1) ordered pairs. Agent j is the speaker and agent i is the listener. The speaker outputs one label. The listener appends it to the right end of its memory and drops the oldest entry. The speaker’s memory does not change.
  - [原文 2.2 Speaker–Listener Interactions · b00015](https://arxiv.org/html/2610.31105v1#S2.SS2.p2.1)：Therefore, we approximate it by the agent’s memory composition, the fraction of its memory taken by each label:
  - [原文 Appendix D Statistical procedure · b00069](https://arxiv.org/html/2610.31105v1#A4.p1.1)：A family’s trials are grouped into cells of (label set, label assignment), within which only the random seed differs, so trials are not independent.
  - [原文 Appendix D Statistical procedure · b00069](https://arxiv.org/html/2610.31105v1#A4.p1.1)：All intervals are 95\% cluster-bootstrap intervals over cells ( 3000 replicates), and the whiskers in Figure 3 are the bootstrap standard error. Unresolved trials count as a loss for every class.
- 按类别汇集主条件108次试验的发言，拟合主张强度w与最近标签回声项；构建加权能量及复制子流。能量分析仅用于开放权重家族，检验属于同批运行的一致性检查。
  核验：原文支持；b00093—b00095支持按类别汇集主条件108次试验的发言，拟合w与最近标签回声项；b00038、b00041支持能量及复制子流；b00097、b00105支持开放权重家族与同批运行的适用限制。
  - [原文 The fit. · b00093](https://arxiv.org/html/2610.31105v1#A8.SS0.SSS0.Px2.p1.1)：we fit, separately for each class and pooling all utterances of the 108 trials of the main condition,
  - [原文 The fit. · b00095](https://arxiv.org/html/2610.31105v1#A8.SS0.SSS0.Px2.p1.2)：The echo term r captures repeating that label; without it, part of the echo would be absorbed into w .
  - [原文 4.2 A Consensus Energy · b00038](https://arxiv.org/html/2610.31105v1#S4.E2)：E(\bar{\bm{x}})=-\frac{1}{2}\sum_{k}w_{c(k)}\,\bar{x}_{k}^{2}. (2)
  - [原文 4.2 A Consensus Energy · b00041](https://arxiv.org/html/2610.31105v1#S4.E3)：\frac{d\bar{x}_{k}}{d\tau}=\bar{x}_{k}\Big(w_{c(k)}\,\bar{x}_{k}-\sum_{l}w_{c(l)}\,\bar{x}_{l}^{2}\Big), (3)
  - [原文 The fit. · b00097](https://arxiv.org/html/2610.31105v1#A8.SS0.SSS0.Px2.p3.1)：We restrict the energy to the open-weight families; in the API families the same regression does not separate the large and medium models.
  - [原文 Measurement. · b00105](https://arxiv.org/html/2610.31105v1#A10.SS0.SSS0.Px2.p1.1)：The agreement is therefore a test of consistency, not an out-of-sample prediction.

## 作者声称的贡献

- 作者自述贡献为构造排除预训练知识作用的异构群体任务，并展示较强、较大模型的影响力优势；此处仅记录作者声明。
  核验：原文支持；b00009、b00010直接列出这两项贡献声明。结论明确仅记录作者自述，没有把排除预训练知识作用或创新性视为独立证实的事实。
  - [原文 1 Introduction · b00009](https://arxiv.org/html/2610.31105v1#S1.I1.i1.p1.1)：We design a novel task for studying the behavior of heterogeneous multi-agent systems, carefully constructed so that the knowledge acquired during pretraining plays no role.
  - [原文 1 Introduction · b00010](https://arxiv.org/html/2610.31105v1#S1.I1.i2.p1.1)：We experimentally demonstrate that, even when pretrained knowledge is rendered irrelevant, stronger and larger models inherently exert a greater influence on the system’s dynamics.
- 作者自述新意包括由实测主张强度决定势阱的能量解释；作者将多数放大的行为一致性联系到上下文学习，但明确称该联系为猜想。
  核验：原文支持；b00052将实测主张强度决定势阱列为作者声称的新意；b00047描述多数放大，b00048明确将其一致性来源于上下文学习称为猜想。
  - [原文 Susceptibility and influence. · b00052](https://arxiv.org/html/2610.31105v1#S5.SS0.SSS0.Px4.p1.1)：What is new here is a population of unscripted agents that differ only by model, and an energy whose wells are set by a measured property of each model, its assertion strength.
  - [原文 Why a large w steers the population. · b00047](https://arxiv.org/html/2610.31105v1#S4.SS3.SSS0.Px1.p1.1)：A large w means that a model amplifies the majority of its own memory.
  - [原文 Why a large w steers the population. · b00048](https://arxiv.org/html/2610.31105v1#S4.SS3.SSS0.Px1.p2.1)：We conjecture that this consistency comes from in-context learning.

## 本文报告的方法比较

- 作者报告七家族内均呈large > medium > small的获胜频率排序。“更强”按标准基准表现定义，Gemini梯队按代际排序，不能统一视为已知参数量比较。
  核验：原文支持；b00024明确报告每个家族均满足large > medium > small；b00020按标准基准定义更强并说明Gemini按代际排序，b00007也区分API性能与开放权重模型规模，支持不能统一解释为已知参数量比较。
  - [原文 3.1 Stronger Models Drive Consensus · b00024](https://arxiv.org/html/2610.31105v1#S3.SS1.p2.1)：The full ordering large > medium > small also holds in every family.
  - [原文 2.3 Heterogeneous Populations · b00020](https://arxiv.org/html/2610.31105v1#S2.SS3.p2.1)：Within a family, we call a model stronger when it scores higher on standard benchmarks such as MMLU-Pro; the model identifiers and the benchmark scores are listed in Appendix A .
  - [原文 2.3 Heterogeneous Populations · b00020](https://arxiv.org/html/2610.31105v1#S2.SS3.p2.1)：Gemini (3.8, 3.5, and 2.5 Flash, a ladder ordered by generation)
- 跨家族近似等规模比较中，Gemma 4 31B、Qwen 2.5 32B、Qwen 3.5 27B胜率依次为0.39、0.36、0.25；作者未认定存在明确主导者。
  核验：原文支持；b00029按所列模型顺序报告0.39、0.36、0.25，并明确表示不能认定任何单个模型具有确定的主导影响。
  - [原文 3.1 Stronger Models Drive Consensus · b00029](https://arxiv.org/html/2610.31105v1#S3.SS1.p5.1)：We build a population from three open-weight models of nearly the same size, each from a different family: Gemma 4 31B, Qwen 2.5 32B, and Qwen 3.5 27B.
  - [原文 3.1 Stronger Models Drive Consensus · b00029](https://arxiv.org/html/2610.31105v1#S3.SS1.p5.1)：The three models win 0.39 , 0.36 , and 0.25 .
  - [原文 3.1 Stronger Models Drive Consensus · b00029](https://arxiv.org/html/2610.31105v1#S3.SS1.p5.1)：Consequently, we cannot conclude that any single model exerts a definitively dominant influence.
- 小模型获胜时，原能量下降比例较低；让各智能体的强度作用于当前输出标签可提高下降比例并保留局部吻合，但所有顶点等深，失去胜者区分能力。
  核验：原文支持；b00103报告小模型获胜时原能量下降轮次比例较低；b00104说明替代能量将该比例提高至78—82%、保留局部相关，但所有顶点等深，不能再区分胜者。
  - [原文 Appendix I Energy results for all open-weight families · b00103](https://arxiv.org/html/2610.31105v1#A9.p2.1)：By the winning class, the energy falls in 88 – 91\% of the rounds of trials won by the large model, 81 – 84\% for the medium model, and 42 – 72\% for the small model ( Figure 13 ).
  - [原文 Trials won by the small model. · b00104](https://arxiv.org/html/2610.31105v1#A10.SS0.SSS0.Px1.p1.1)：Letting each agent’s assertion strength act on the labels that agent is saying,
  - [原文 Trials won by the small model. · b00104](https://arxiv.org/html/2610.31105v1#A10.SS0.SSS0.Px1.p1.1)：restores descent in these trials ( 78 – 82\% of rounds) and keeps the local agreement ( r=0.65 – 0.66 ), but every vertex then has the same depth -\bar{w}/2 , so this version no longer says which label wins.

## 实验证据与条件

任务：无正确答案的三标签命名游戏
基础模型：GPT-5、GPT-4.1、Claude 5、Gemini、Gemma 4、Qwen 3.5、Qwen 2.5家族
比较基线：同家族不同档位模型；机会水平1/3
指标：各类标签成为群体惯例的试验比例
结果：七个家族均由最强模型取得最高获胜频率
资源条件：每家族108次试验、18个聚类单元；默认N=24、H=20、K=3，最多60N次交互
- 七家族三标签主实验中，作者报告较强模型的标签最常成为群体惯例。
  核验：原文支持；b00007、b00024支持七家族内最强模型标签获胜频率最高；b00021支持每家族108次试验、18个聚类单元及1/3机会水平；b00014支持K=3、H=20、N=24及最多60N次交互。
  - [原文 1 Introduction · b00007](https://arxiv.org/html/2610.31105v1#S1.p5.1)：We run this experiment on seven model families: GPT-5, GPT-4.1, Claude 5, Gemini, Gemma 4, Qwen 3.5, and Qwen 2.5.
  - [原文 3.1 Stronger Models Drive Consensus · b00021](https://arxiv.org/html/2610.31105v1#S3.F3)：Fraction of the 108 trials per family in which each class’s label becomes the population’s convention. Whiskers are one standard error from a cluster bootstrap over the 18 cells; the dashed line is chance ( 1/3 ).
  - [原文 3.1 Stronger Models Drive Consensus · b00024](https://arxiv.org/html/2610.31105v1#S3.SS1.p2.1)：In every family, the population most often converges to the label of the most capable model, such as Opus 5 for Claude.
  - [原文 2.2 Speaker–Listener Interactions · b00014](https://arxiv.org/html/2610.31105v1#S2.SS2.p1.1)：By default, we use K=3 , H=20 , and N=24 , and each trial runs for T=60N interactions.
任务：两类模型的两标签共识竞争
基础模型：GPT-5、Opus 5、Gemma 4 31B、Qwen 3.5 122B-A10B
比较基线：分别对比mini、Haiku 4.5、E4B、35B-A3B
指标：较大模型标签胜率、胜负计数及报告的p值
结果：b00067报告GPT-5为32/16（0.67，p=0.029）、Opus为39/9（0.81，p=1.5×10⁻⁵）、Qwen为40/8（0.83，p=3.3×10⁻⁶），无未决。Gemma在b00067为32/16（0.67，p=0.029），b00068同一H=6条件为0.73，精确胜率待核实。
资源条件：H=6，每类12个智能体；12对标签、两种分配、每种分配两个种子。原文另写“48 trials per cell”，与设计乘积及胜负总数的口径有歧义，试验总数不作确定填写。
- 两标签比较支持较大模型胜率超过1/2；Gemma 4在H=6的精确胜率存在相邻段落冲突，试验次数措辞也有歧义。
  核验：原文支持；b00067支持所列胜负计数、胜率、p值与无未决试验；b00068确实将Gemma同一H=6条件记为0.73，与b00067的0.67冲突。设计乘积为48次，而原文写每单元48次并列24个单元，结论保留歧义合理。超过1/2仅是所列试验的报告结果。
  - [原文 Appendix C Two-label populations · b00067](https://arxiv.org/html/2610.31105v1#A3.p1.1)：Before the three-class design we ran populations of two classes, 12 agents each, on 12 label pairs, with both label assignments and two seeds per assignment ( 48 trials per cell, 24 cells of label pair \times assignment for the cluster bootstrap).
  - [原文 Appendix C Two-label populations · b00067](https://arxiv.org/html/2610.31105v1#A3.p1.1)：Figure 5 in the main text shows the contest at H=6 .
  - [原文 Appendix C Two-label populations · b00067](https://arxiv.org/html/2610.31105v1#A3.p1.1)：GPT-5 vs. mini 32/16 ( 0.67 , p=0.029 ), Opus 5 vs. Haiku 4.5 39/9 ( 0.81 , p=1.5\times 10^{-5} ), Gemma 4 31B vs. E4B 32/16 ( 0.67 , p=0.029 ), and Qwen 3.5 122B-A10B vs. 35B-A3B 40/8 ( 0.83 , p=3.3\times 10^{-6} ), with no trial unresolved.
  - [原文 Appendix C Two-label populations · b00068](https://arxiv.org/html/2610.31105v1#A3.p2.1)：The larger model’s win rate is, for H=6 , 10 , 20 , and 40 : Gemma 4 31B vs. E4B 0.73 , 0.83 , 0.90 , 0.88 ;
任务：近似等规模、不同家族模型的共识竞争
基础模型：Gemma 4 31B、Qwen 2.5 32B、Qwen 3.5 27B
比较基线：三者相互比较
指标：标签获胜比例
结果：依次为0.39、0.36、0.25；作者未认定明确主导者
资源条件：未报告 / 未提取
- 跨家族近似等规模对照未得到明确的单模型支配结论。
  核验：原文支持；b00029完整支持三种近似等规模模型、对应胜率及未得到明确单模型支配结论；结论未将其扩大为三者统计等效或影响力相同。
  - [原文 3.1 Stronger Models Drive Consensus · b00029](https://arxiv.org/html/2610.31105v1#S3.SS1.p5.1)：We build a population from three open-weight models of nearly the same size, each from a different family: Gemma 4 31B, Qwen 2.5 32B, and Qwen 3.5 27B.
  - [原文 3.1 Stronger Models Drive Consensus · b00029](https://arxiv.org/html/2610.31105v1#S3.SS1.p5.1)：The three models win 0.39 , 0.36 , and 0.25 .
  - [原文 3.1 Stronger Models Drive Consensus · b00029](https://arxiv.org/html/2610.31105v1#S3.SS1.p5.1)：Consequently, we cannot conclude that any single model exerts a definitively dominant influence.
任务：测量记忆组成与标签输出概率的关系
基础模型：18个模型，包括开放权重模型及GPT-5、Claude、Gemini模型
比较基线：记忆中标签占比
指标：Pearson及Spearman相关
结果：Pearson为0.83—0.93，Spearman为0.82—0.96
资源条件：三标签、20槽记忆、步长2槽，共66种组成；开放权重模型读取对数概率，所列API模型每种记忆采样20次
- 独立查询探测支持将记忆占比作为输出概率的近似代理。
  核验：原文支持；b00070支持18个模型、66种记忆组成、相关系数范围及概率估计方式；b00071支持以记忆占比作为代理的解释。结论保留了近似性质，没有声称记忆占比等于输出概率。
  - [原文 Appendix E Memory share and output probability · b00070](https://arxiv.org/html/2610.31105v1#A5.F10)：Each point is one of the 66 compositions of a 20 -slot memory over three labels (in steps of two slots) and one label: its share of the memory against the probability that the model, queried in isolation, says it. Pearson r=0.83 – 0.93 and Spearman 0.82 – 0.96 across the 18 models.
  - [原文 Appendix E Memory share and output probability · b00070](https://arxiv.org/html/2610.31105v1#A5.F10)：Open-weight values are read from log-probabilities; GPT-5, Claude, and Gemini values are estimated from 20 samples per memory.
  - [原文 Appendix E Memory share and output probability · b00071](https://arxiv.org/html/2610.31105v1#A5.p1.1)：Figure 10 justifies using memory composition as the agents’ position in the experiments: output probability rises monotonically with memory share for every model.
任务：三类命名游戏的群体规模与记忆长度消融
基础模型：Gemma 4三类模型
比较基线：不同N、H条件；机会水平1/3
指标：31B模型标签胜率
结果：N=24、H=6/10/20/40时为0.42/0.72/0.83/0.78；N=6、H=40时为0.56
资源条件：N∈{3,6,12,24}，H∈{6,10,20,40}；每格36次试验，均达到固定状态
- Gemma 4规模与记忆消融表列出了不同条件下31B模型的获胜比例。
  核验：原文支持；b00072支持三类Gemma 4群体、每格36次试验、均达到固定状态及1/3机会水平；b00073的行列对应支持全部所列N、H条件和抽取的胜率数值。
  - [原文 Appendix F Population size and memory length · b00072](https://arxiv.org/html/2610.31105v1#A6.T3)：Fraction of trials won by the large model (31B) in the three-class Gemma 4 population, across population size N and memory length H ; chance is 1/3 . Each cell has 36 trials (six label sets, three cyclic assignments, two seeds), all of which fixated.
  - [原文 Appendix F Population size and memory length · b00073](https://arxiv.org/html/2610.31105v1#A6.T3.2)：N\backslash H 6 10 20 40 3 0.50 0.64 0.69 0.72 6 0.53 0.50 0.50 0.56 12 0.39 0.61 0.53 0.67 24 0.42 0.72 0.83 0.78
任务：拟合并检查加权能量及群体动力学模型
基础模型：Gemma 4、Qwen 3.5、Qwen 2.5
比较基线：实测局部变化与试验胜率
指标：局部相关、能量下降轮次比例、w与胜率排序相关
结果：三个家族局部r依次为0.65/0.55/0.57，下降轮次为85%/86%/85%；9个家族内类别对排序一致，Pearson 0.66、Spearman 0.69；323/324次到达顶点
资源条件：三个家族共324次试验；拟合与评估使用相同运行数据
- 能量模型在三个开放权重家族中获得局部与排序一致性，但使用同批运行拟合和评估。
  核验：原文支持；b00102支持三个家族的局部相关及能量下降比例；b00103支持九个家族内类别对排序一致、两项相关系数及323/324次到达顶点；b00105明确拟合与评估使用同批运行。
  - [原文 Appendix I Energy results for all open-weight families · b00102](https://arxiv.org/html/2610.31105v1#A9.p1.1)：well depth -w_{c(k)}/2 start basin of local rounds with Family large medium small E(\bm{c}) large r \Delta E<0 Gemma 4 -1.72 -1.59 -1.26 -0.51 39\% 0.65 85\% Qwen 3.5 -1.46 -0.78 -0.11 -0.26 64\% 0.55 86\% Qwen 2.5 -1.51 -0.96 -0.40 -0.32 56\% 0.57 85\%
  - [原文 Appendix I Energy results for all open-weight families · b00103](https://arxiv.org/html/2610.31105v1#A9.p2.1)：323 of the 324 trials end at a vertex; the remaining Qwen 2.5 trial runs out of time. The order of w matches the order of win rates in all nine within-family pairs of classes ( Figure 14 ; Pearson 0.66 , Spearman 0.69 ).
  - [原文 Measurement. · b00105](https://arxiv.org/html/2610.31105v1#A10.SS0.SSS0.Px2.p1.1)：The assertion strengths w and the outputs \bm{x}_{i} used to evaluate the energy are estimated from the same population runs whose outcomes they are compared with.

## 原文支持的局限性

- 作者明确指出，从实际交互到群体流的闭合是启发式的：两项近似无法贯穿整个运行成立，因此能量属于待检验的假设模型。
  核验：原文支持；b00083明确称闭合为启发式，解释两项近似分别在记忆混合后与混合前才精确，不能贯穿整个运行，并将能量视为需直接检验的假设。
  - [原文 Motivation from the interaction rule. · b00083](https://arxiv.org/html/2610.31105v1#A7.SS0.SSS0.Px3.p1.1)：This closure is heuristic. The first approximation is exact only once the memories have mixed, and the second only before they have, so neither holds throughout a run. We therefore treat Equation 2 as a posited energy and test it directly in Section 4.3 .
- 能量评估不是样本外预测；同一回归不能区分API家族的大、中模型，因此能量分析限于开放权重家族。
  核验：原文支持；b00105直接否定样本外预测的解释；b00097明确说明同一回归不能区分API家族的大、中模型，因此仅对开放权重家族开展该能量分析。
  - [原文 Measurement. · b00105](https://arxiv.org/html/2610.31105v1#A10.SS0.SSS0.Px2.p1.1)：The agreement is therefore a test of consistency, not an out-of-sample prediction.
  - [原文 The fit. · b00097](https://arxiv.org/html/2610.31105v1#A8.SS0.SSS0.Px2.p3.1)：We restrict the energy to the open-weight families; in the API families the same regression does not separate the large and medium models.
- 作者限定实验为充分混合群体的单标签交换，未研究结构化网络或自由文本；对于有客观正确答案的场景，尚未验证哪个模型掌握影响力。
  核验：原文支持；b00053明确限定充分混合群体与单标签交换，并明确声明未研究结构化网络或自由文本，也未验证存在客观正确答案时哪个模型掌握影响力。
  - [原文 Limitations. · b00053](https://arxiv.org/html/2610.31105v1#S5.SS0.SSS0.Px5.p1.1)：Our populations are well mixed and exchange single labels. We do not study structured networks or free-form text.
  - [原文 Limitations. · b00053](https://arxiv.org/html/2610.31105v1#S5.SS0.SSS0.Px5.p1.1)：nor have we verified which model holds influence in settings where an objective ground-truth answer exists.

## 多智能体机制

- 角色与分工：智能体按基础模型分组；每次交互临时分为说者和听者。
  核验：原文支持；b00019按基础模型划分群体并给出各类8个智能体的例子；b00014说明每次交互抽取有序对并分配说者、听者角色，支持角色随交互临时确定。
  - [原文 2.3 Heterogeneous Populations · b00019](https://arxiv.org/html/2610.31105v1#S2.SS3.p1.1)：For example, if the total number of agents is N=24 and there are K=3 classes, the population will consist of 8 Opus, 8 Sonnet, and 8 Haiku agents.
  - [原文 2.2 Speaker–Listener Interactions · b00014](https://arxiv.org/html/2610.31105v1#S2.SS2.p1.1)：Agent j is the speaker and agent i is the listener.
- 协作结构：各类从不同标签出发，通过重复交互形成群体惯例；提示不设置一致目标或奖励。
  核验：原文支持；b00019支持各类以不同标签初始化，b00006描述重复交互形成共同惯例，b00013明确无一致目标或奖励。这是过程描述；不应理解为所有有限时长试验均收敛，b00103记录了一次超时。
  - [原文 2.3 Heterogeneous Populations · b00019](https://arxiv.org/html/2610.31105v1#S2.SS3.p1.1)：Each model is assigned its own label. Every agent of that model starts with a memory filled with that label.
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.31105v1#S1.p4.1)：Over many interactions, the whole population comes to agree on a single label ( Tanaka, 2026 ) .
  - [原文 2.1 Agent Protocol · b00013](https://arxiv.org/html/2610.31105v1#S2.SS1.p1.1)：It mentions no goal of agreement, no reward, and nothing about the other agents or the experiment.
- 通信机制：消息为单个标签；仅听者追加消息并删除最旧记忆，说者记忆不变。
  核验：原文支持；b00014直接支持单标签消息、仅听者追加并删除最旧记忆、说者记忆不变的交互规则。
  - [原文 2.2 Speaker–Listener Interactions · b00014](https://arxiv.org/html/2610.31105v1#S2.SS2.p1.1)：The speaker outputs one label. The listener appends it to the right end of its memory and drops the oldest entry. The speaker’s memory does not change.
- 调度方式：从全部不同智能体有序对中均匀抽样，逐次执行两两交互；默认24个智能体，最多60轮。
  核验：原文支持；b00014明确从N(N−1)个不同智能体有序对中均匀抽样，默认N=24，并将连续N次交互定义为一轮、每次试验最多60轮。
  - [原文 2.2 Speaker–Listener Interactions · b00014](https://arxiv.org/html/2610.31105v1#S2.SS2.p1.1)：In each interaction, we draw an ordered pair (j,i) , j\neq i , uniformly from the N(N-1) ordered pairs.
  - [原文 2.2 Speaker–Listener Interactions · b00014](https://arxiv.org/html/2610.31105v1#S2.SS2.p1.1)：By default, we use K=3 , H=20 , and N=24 , and each trial runs for T=60N interactions. We call N consecutive interactions a round , so a trial lasts at most 60 rounds.

## 系统分析与启发（推测）

- 系统分析：b00048将上下文学习解释称为猜想；结合b00105的同批运行验证边界，不能把多数放大与胜率的一致性当作因果机制已获验证。
- 系统分析：b00067与b00068对Gemma 4两标签H=6分别报告0.67和0.73；b00067的“48 trials per cell”与设计乘积及胜负总数也有口径歧义，应保留冲突，不能自行校正。
- 系统分析：b00073中N=24的胜率从H=20的0.83降至H=40的0.78，N=6、H=40仅为0.56；因此b00074的长记忆概括不能解释为所有规模下都单调升至0.7—0.8。
- 系统分析：b00014描述任务内有限记忆更新，仅凭此不足以将论文归为持续自进化研究；b00006的无正确答案任务也不足以判断影响力是否改善任务准确率。

## 待研究问题（系统分析）

- 系统分析：针对b00105的验证边界，能否在独立运行中估计w，再预测留出标签集合及模型组合的胜者？
- 系统分析：针对b00048的机制猜想，如何通过干预多数偏好、最近标签回声或上下文学习行为，区分影响力的因果来源？
- 系统分析：针对b00053承认的范围限制，结构化通信、自由文本及有正确答案任务中的影响力排序是否仍成立，是否与正确性一致？

## 缺失信息

- 所提供原文块未列全七家族三标签实验的逐类胜率、标准误、完整模型配置及基准分数。
- 所提供原文块未明确共识停止阈值、全部采样参数、硬件、token消耗与费用；默认交互上限不能补全运行成本。
- 跨家族近似等规模对照的试验次数与专属资源配置未在提供块中明确，resource_conditions置null。
- 两标签p值的具体检验方法及置信区间数值未在提供块中明确。
- b00067与b00068的Gemma 4两标签H=6胜率冲突未获解释；b00067的试验次数口径亦待核实，未将推算的48次作为确定总数。
- 提供块未给出共享记忆机制或等预算单智能体比较，相应字段置null；这不等于确认全文未报告。
- 提供块未显示模型参数更新或跨运行持续学习机制，self_evolution置null；任务内记忆更新不据此视为自进化。
- 能量评估明确为同批运行的一致性检验，独立样本外预测效果未知。
- 未阅读被引前作，不能独立确认首创性或作者对相关工作的概括；本次未复现实验。

## 阅读范围

读取 2 / 2 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Multi-agent LLM systems are increasingly used in practice, but their behavior is complex and hard to understand. We design a simple task to ask which model has the most influence on the final consensus when several models are mixed in one system. Experimentally, across seven model families, we find that the opinions of the other models are absorbed into the opinion of the stronger model, the one with more parameters. This happens even though the task requires no pretraining knowledge and has no correct answer. To understand this phenomenon, we interpret the agents as weighted particles moving on a simplex. Larger models carry a larger weight and therefore occupy a deeper well in the energy landscape. A large weight means strong in-context learning: a model with a large weight amplifies the majority of its context. Larger models are generally better at in-context learning, and this is what makes the larger model the influencer. We hope that this work helps to interpret multi-agent systems, whose behavior is becoming too complex for humans to understand.
