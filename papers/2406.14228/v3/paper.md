# EvoAgent: Towards Automatic Multi-Agent Generation via Evolutionary Algorithms

作者：Siyu Yuan, Kaitao Song, Jiangjie Chen, Xu Tan, Dongsheng Li, Deqing Yang
原文：https://arxiv.org/abs/2406.14228v3
首次提交：2024-06-20T11:49:23Z · 版本更新：2025-03-10T02:42:01Z
版本：v3 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- 针对人工设计限制智能体扩展的问题，EvoAgent 用 LLM 模拟进化算子，生成专业智能体并整合答案；作者报告多任务表现改善，例如 ScienceWorld 的 GPT-4 总体得分由27.97升至30.42。
  核验：原文支持；b00004、b00015、b00019支持问题动机、LLM模拟进化算子及答案整合；b00006报告多任务改善，b00038中GPT-4总体得分确为27.97→30.42。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2406.14228v3#S1.p2.1)：it also limits scaling up the number of agents to further improve performance due to expensive human labor.
  - [原文 3.2 EvoAgent · b00015](https://arxiv.org/html/2406.14228v3#S3.SS2.p1.1)：Thus, we can employ LLM to simulate evolutionary operators to update the system settings of agents and create new agents.
  - [原文 STEP 4: Results Update · b00019](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px4.p1.1)：we ask each child agent to generate candidate results and then use LLMs to integrate these candidates with the result from the previous iteration into a new result
  - [原文 Benchmark · b00038](https://arxiv.org/html/2406.14228v3#S4.T2.2)：GPT-4 27.97 10.58 36.00 42.41 w/ EvoAgent (1,1) 30.42 11.38 36.17 48.67

## 研究问题

- 作者指出，已有智能体框架依赖人工设计角色、任务范围、技能和提示词，增加智能体数量需要昂贵人力；研究目标是自动将已有专业智能体扩展为多智能体系统。
  核验：原文支持；b00004明确将人工设置和扩展人力成本列为问题；b00005描述从初始专业智能体自动生成多个智能体。此处属于作者对研究动机和目标的陈述。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2406.14228v3#S1.p2.1)：their designs heavily depend on handcrafted settings, including character roles, task scopes, skills, and prompt settings.
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2406.14228v3#S1.p2.1)：it also limits scaling up the number of agents to further improve performance due to expensive human labor.
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2406.14228v3#S1.p3.1)：With a series operation of EAs (e.g., selection, crossover, mutation), EvoAgent can automatically create multiple evolutionary agents based on the initial specialized agent.

## 方法怎样工作

- 以预定义框架中的智能体为初始父代，将角色、技能、提示词等语言设置作为进化变量，由 LLM 模拟进化算子。
  核验：原文支持；b00016支持以预定义框架中的智能体为初始父代，b00005列出角色、技能和提示词等进化变量，b00015明确由LLM模拟进化算子。
  - [原文 STEP 1: Initialization · b00016](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px1.p1.1)：Here, we enable EvoAgent to start from a pre-defined agent framework (e.g., MetaGPT Hong et al. (2024) and AutoGen Wu et al. (2023) ), which serves as the initial (parent) agents.
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2406.14228v3#S1.p3.1)：EvoAgent can be considered as a one-shot agent generation method that starts from a specialized agent as the initial agent, and then considers its settings (e.g., role, skills, prompts, and so on) as the variables to be evolved.
  - [原文 3.2 EvoAgent · b00015](https://arxiv.org/html/2406.14228v3#S3.SS2.p1.1)：Thus, we can employ LLM to simulate evolutionary operators to update the system settings of agents and create new agents.
- 交叉依据父代回答检查并更新技能；变异要求增加父子代差异并保持求解能力；LLM 质量检查关注特征继承与差异性，每轮选择 N 个子代。
  核验：原文支持；b00017分别描述依据父代结果更新技能的交叉操作，以及保持求解能力并增加差异的变异操作；b00018支持质量检查内容及每轮选择N个子代。
  - [原文 STEP 2: Crossover & Mutation · b00017](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px2.p1.1)：For Crossover , we first enable the parent agents to generate results based on user requests. Then, based on the generated results, we ask LLMs to check which skills should be improved and then update them.
  - [原文 STEP 2: Crossover & Mutation · b00017](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px2.p1.1)：we design a Mutation operation that requires LLMs to compare the child agents and parent agents and then modify the child agents to make them distinct from their parents while maintaining their task-solving capability.
  - [原文 STEP 3: Selection · b00018](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px3.p1.1)：Here, we conduct a quality-check module with an LLM to detect whether the generated agents can satisfy it has inherited the characteristics and maintained differences from parent agents. We will select N child agents as the evolved agents in each iteration.
- 子智能体生成候选答案，LLM 将候选与上一轮结果整合；上一代生成的智能体加入下一轮，重复进化、选择与结果更新，直到达到目标数量。
  核验：原文支持；b00019明确整合子代候选与上一轮结果，并重复步骤直至达到目标数量；b00017明确将上一代生成的全部智能体加入下一轮。
  - [原文 STEP 4: Results Update · b00019](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px4.p1.1)：we ask each child agent to generate candidate results and then use LLMs to integrate these candidates with the result from the previous iteration into a new result, akin to a natural selection processing stage.
  - [原文 STEP 2: Crossover & Mutation · b00017](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px2.p1.1)：Besides, as we also need to conduct multiple iterations, we will append all agents generated in the previous generation into the next iteration.
  - [原文 STEP 4: Results Update · b00019](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px4.p1.1)：Moreover, we can automatically generate more agents by repeating the operations from step 2 to step 4 until the number of agents has fulfilled our targets.

## 作者声称的贡献

- 作者自述提出通用的进化式多智能体生成方法，无需额外人工监督即可产生智能体种群，并声称适用于任意智能体框架。
  核验：原文支持；b00007、b00008直接支持通用生成方法、无需额外人工监督和适用于任意框架的作者自述。结论未将这些主张表述为经独立核实的普适性或创新性。
  - [原文 1 Introduction · b00007](https://arxiv.org/html/2406.14228v3#S1.I1.i1.p1.1)：We introduce EvoAgent , a simple and generic multi-agent generation method to improve the effectiveness of LLM-based agents in solving tasks. EvoAgent can automatically generate new specialized agents and is applicable to any agent framework.
  - [原文 1 Introduction · b00008](https://arxiv.org/html/2406.14228v3#S1.I1.i2.p1.1)：We formulate the agent generation processing as an evolutionary pipeline, that encompasses multiple operators (e.g., selection, crossover, mutation) to generate agent population without additional human supervision.

## 本文报告的方法比较

- 表1的 GPT-4 分组中，EvoAgent 的 Logic／Writing／Code 得分为77.00／84.40／84.53，高于 AutoAgents 的69.00／82.00／83.56及 AgentVerse 的66.50／78.00／80.41。
  核验：原文支持；b00023的GPT-4分组逐项列出所述九个分数，EvoAgent在三个指标上均高于所列AutoAgents和AgentVerse结果。
  - [原文 4.1 NLP and Multi-Modal Tasks · b00023](https://arxiv.org/html/2406.14228v3#S4.T1.12)：Model Method Logic Writing Code
  - [原文 4.1 NLP and Multi-Modal Tasks · b00023](https://arxiv.org/html/2406.14228v3#S4.T1.12)：GPT-4 Direct 60.50 75.40 79.38 CoT 65.50 74.00 80.41 SPP 64.50 79.20 78.35 Self-Refine 3 64.50 74.60 79.38 AgentVerse 66.50 78.00 80.41 AutoAgents 69.00 82.00 83.56 EvoAgent (1,3) 77.00 84.40 84.53
- TravelPlanner 消融中，EvoAgent (1,3) 的 Com./Hard 为68.9/14.0，Direct 为59.5/13.7，Suggest 3 为61.7/8.4，Overgen 3 为61.4/10.7，PromptRefine 3 为63.0/13.8；结果为两种模型的平均值。
  核验：原文支持；b00054逐项支持五种方法的Com./Hard数值；b00057说明该消融汇总GPT-3.5和Gemini-Pro的平均结果。
  - [原文 4.4 Ablation Studies · b00054](https://arxiv.org/html/2406.14228v3#S4.T4.6)：Direct - - 59.5 13.7 Suggest 3 - - 61.7 8.4 Overgen 3 - - 61.4 10.7 PromptRefine 3 - - 63.0 13.8 Different Population Size EvoAgent (1,3) 68.9 14.0 68.9 14.0
  - [原文 Result & Analysis · b00057](https://arxiv.org/html/2406.14228v3#S4.SS4.SSS0.Px2.p1.1)：To obtain stable findings, we first obtain results from GPT-3.5 and Gemini-Pro across different population sizes and selection strategies. We then average their results over various metrics to clearly compare the strengths and weaknesses of these variants.
- 作者报告 MMMU 上 Self-Refine 和 SPP 相对 CoT 表现下降，而 EvoAgent 改善不同难度的科学问答表现。
  核验：原文支持；b00035明确报告Self-Refine和SPP相对CoT下降，并称EvoAgent改善不同难度的多模态科学问答表现。结论保留了作者报告的性质。
  - [原文 Result & Analysis · b00035](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px4.p1.2)：In addition, Figure 2 shows that Self-Refine (SR) and SPP degrade performance compared to CoT prompting in MMMU task. However, EvoAgent can generate multiple domain-specific agents and thus improve multi-modal models in addressing scientific questions across various difficulty levels.

## 实验证据与条件

任务：Logic Grid Puzzle：200题；Trivia Creative Writing：100例；Codenames Collaborative：50例。
基础模型：LLama2-13B-Chat、GPT-3.5、GPT-4。
比较基线：Direct、CoT、SPP、Self-Refine、AgentVerse、AutoAgents。
指标：依次为答案准确率、正确提及问答答案的比例、猜测词与目标词的重叠比例。
结果：GPT-4 下 EvoAgent 三项得分为77.00／84.40／84.53；AutoAgents 为69.00／82.00／83.56；AgentVerse 为66.50／78.00／80.41。
资源条件：N=1、T=3；每个样本新增3个专业智能体与初始智能体协作；迭代数用于对齐 Self-Refine。
- 三个 NLP 任务的主实验；Code 指 Codenames Collaborative。
  核验：原文支持；b00022、b00025—b00030支持任务名称、规模、模型、基线和指标；b00023支持所列GPT-4结果，b00032支持N=1、T=3及新增三个智能体的条件。Code确指Codenames Collaborative。
  - [原文 4.1 NLP and Multi-Modal Tasks · b00022](https://arxiv.org/html/2406.14228v3#S4.T1)：Results of LLMs with different methods on Logic Grid Puzzle ( Logic ), Trivia Creative Writing ( Writing ) and Codenames Collaborative ( Code ).
  - [原文 Benchmarks · b00025](https://arxiv.org/html/2406.14228v3#S4.I1.i1.p1.1)：Logic Grid Puzzle is a reasoning task with 200 puzzles featuring 2 to 5 unique occupants in different houses.
  - [原文 Benchmarks · b00026](https://arxiv.org/html/2406.14228v3#S4.I1.i2.p1.1)：Trivia Creative Writing is a knowledge-intensive task consisting of 100 instances.
  - [原文 Benchmarks · b00027](https://arxiv.org/html/2406.14228v3#S4.I1.i3.p1.1)：Codenames Collaborative is a reasoning-intensive task with 50 instances.
  - [原文 Baselines · b00029](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px2.p1.1)：For NLP tasks, we select LLama2-13B-Chat Touvron et al. (2023) , GPT-3.5 OpenAI (2022) and GPT-4 OpenAI (2023) as our backbone networks.
  - [原文 4.1 NLP and Multi-Modal Tasks · b00023](https://arxiv.org/html/2406.14228v3#S4.T1.12)：GPT-4 Direct 60.50 75.40 79.38 CoT 65.50 74.00 80.41 SPP 64.50 79.20 78.35 Self-Refine 3 64.50 74.60 79.38 AgentVerse 66.50 78.00 80.41 AutoAgents 69.00 82.00 83.56 EvoAgent (1,3) 77.00 84.40 84.53
  - [原文 Evaluation Metrics · b00030](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px3.p1.1)：Specifically, for Logic Grid Puzzle and MMMU tasks, we report the accuracy of all questions.
  - [原文 Evaluation Metrics · b00030](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px3.p1.1)：For Trivia Creative Writing, we measure the ratio of correctly mentioned answers in the trivia questions. For Codenames Collaborative, we calculate the overlapping ratio between the predicted words from the Guesser and the target words as the metric.
  - [原文 Result & Analysis · b00032](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px4.p1.1)：Here, to align with Self-Refine, we set N as 1 and T as 3, which means we conduct three iterations, each of which generates a new specialized agent. Thus, for each data sample, EvoAgent extends 3 different specialized agents to collaborate with the initial agent.
任务：MMMU 验证集847道选择题，覆盖30个领域及简单、中等、困难三级。
基础模型：GPT-4V、Gemini-Pro。
比较基线：CoT、Self-Refine、SPP。
指标：答案准确率。
结果：作者报告 EvoAgent 改善各难度表现；所给文本未提供具体分数。
资源条件：采用 Yue 等人的智能体设置作为初始智能体；N=1、T=3，每个样本新增3个专业智能体；迭代数用于对齐 Self-Refine。
- MMMU 多模态问答实验；所给文本支持定性结果。
  核验：原文支持；b00028—b00030支持847道选择题、30个领域、三级难度、模型、基线及准确率指标；b00032支持初始设置和迭代条件。b00035提供定性改善陈述，所给MMMU文本块未列出具体分数。
  - [原文 Benchmarks · b00028](https://arxiv.org/html/2406.14228v3#S4.I1.i4.p1.1)：MMMU has three levels of difficulty: easy, medium, and hard. We evaluate EvoAgent against baselines using the multiple-choice questions in the validation set of MMMU, which includes 847 questions spanning 30 different domains.
  - [原文 Baselines · b00029](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px2.p1.1)：For MMMU, we select GPT-4V Yang et al. (2023) and Gemini-Pro as the backbone and compare EvoAgent with CoT prompting, Self-Refine (SR), and SPP.
  - [原文 Evaluation Metrics · b00030](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px3.p1.1)：Specifically, for Logic Grid Puzzle and MMMU tasks, we report the accuracy of all questions.
  - [原文 Result & Analysis · b00035](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px4.p1.2)：However, EvoAgent can generate multiple domain-specific agents and thus improve multi-modal models in addressing scientific questions across various difficulty levels.
  - [原文 Result & Analysis · b00032](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px4.p1.1)：In our experiments, we adopt the agent settings of Wang et al. (2023) (for NLP tasks) and Yue et al. (2023) (for MMMU) as the initial agent.
  - [原文 Result & Analysis · b00032](https://arxiv.org/html/2406.14228v3#S4.SS1.SSS0.Px4.p1.1)：Here, to align with Self-Refine, we set N as 1 and T as 3, which means we conduct three iterations, each of which generates a new specialized agent. Thus, for each data sample, EvoAgent extends 3 different specialized agents to collaborate with the initial agent.
任务：ScienceWorld 的30个科学任务，逐步执行动作。
基础模型：GPT-3.5、GPT-4。
比较基线：沿用 Lin 等人原始设置的初始智能体。
指标：依据完成子任务计算得分；按总体及参考智能体平均轨迹长度分组。
结果：GPT-3.5 总体17.12→19.02，中等轨迹组19.91→18.87；GPT-4 总体27.97→30.42。
资源条件：每个环境步骤使用 N=1、T=1；通过上下文学习执行动作。
- ScienceWorld 总体得分改善，但 GPT-3.5 的中等轨迹组得分下降。
  核验：原文支持；b00038支持两模型总体得分提升及GPT-3.5中等轨迹组19.91→18.87的下降；b00036、b00037、b00041、b00042支持任务范围、分组依据、评价方式和每步N=1、T=1的条件。
  - [原文 Benchmark · b00036](https://arxiv.org/html/2406.14228v3#S4.SS2.SSS0.Px1.p1.1)：We evaluate 30 scientific tasks in ScienceWorld to demonstrate the capability of EvoAgent in solving tasks in more challenging open-world environments.
  - [原文 Benchmark · b00037](https://arxiv.org/html/2406.14228v3#S4.T2)：We also report performance on three difficult-level groups based on the average length of the oracle agent’s trajectories ( Lin et al., 2023 ) .
  - [原文 Baseline and Evaluation Metrics · b00041](https://arxiv.org/html/2406.14228v3#S4.SS2.SSS0.Px2.p1.1)：Following Lin et al. (2023) , we require LLMs to perform an action at each step by using in-context learning . For evaluation, each task in ScienceWorld includes some sub-tasks, and we report the results by calculating the completed sub-tasks for the whole task.
  - [原文 Result & Analysis · b00042](https://arxiv.org/html/2406.14228v3#S4.SS2.SSS0.Px3.p1.1)：For EvoAgent , we adopt the agent framework with original settings in Lin et al. (2023) as the initial agent. Since each step in ScienceWorld requires using EA, we set the population size N as 1 and the iterations T as 1 for efficiency, denoted as EvoAgent (1,1) .
  - [原文 Benchmark · b00038](https://arxiv.org/html/2406.14228v3#S4.T2.2)：Model Overall Long Medium Short GPT-3.5 17.12 6.28 19.91 27.90 w/ EvoAgent (1,1) 19.02 7.25 18.87 33.26 GPT-4 27.97 10.58 36.00 42.41 w/ EvoAgent (1,1) 30.42 11.38 36.17 48.67
任务：TravelPlanner 验证集180个含已收集信息的用户查询。
基础模型：Mistral-7B、GPT-3.5、Gemini-Pro、GPT-4。
比较基线：Direct、CoT、SPP、Self-Refine；GPT-3.5 另比较 ReAct。
指标：交付率、常识约束通过率、硬约束通过率、最终通过率；约束指标区分 micro 和 macro。
结果：GPT-4：Direct 最终通过率2.2，EvoAgent 为7.2；EvoAgent 交付率100.0，常识 micro/macro 为81.5/21.1，硬约束 micro/macro 为31.4/18.9。
资源条件：N=1、T=3；交付步数上限30；温度0；OpenAI 模型使用 Azure gpt-35-turbo、gpt-4-32k，版本标记2024-02-15-preview。
- TravelPlanner 主实验报告 GPT-4 最终通过率由2.2升至7.2。
  核验：原文支持；b00040的GPT-4行支持最终通过率2.2→7.2及其余所列指标；该表仅为GPT-3.5列出ReAct。b00070、b00048、b00071、b00067分别支持查询规模、迭代设置、30步上限及模型版本和温度条件。
  - [原文 A.5 Evaluation Details of TravelPlanner · b00070](https://arxiv.org/html/2406.14228v3#A1.SS5.p1.1)：We test EvoAgent and all baselines on the TravelPlanner validation set, which consists of 180 user queries with the collected information.
  - [原文 Baseline and Evaluation Metrics · b00047](https://arxiv.org/html/2406.14228v3#S4.SS3.SSS0.Px2.p1.1)：Following Xie et al. (2024) , we select Mistral-7B Jiang et al. (2023) , GPT-3.5, Gemini-Pro Team (2023) and GPT-4 as our backbone models. We compare EvoAgent with 0-shot learning (Direct), CoT prompting, ReAcT Yao et al. (2023) , SPP, and Self-Refine within each backbone model.
  - [原文 Result & Analysis · b00048](https://arxiv.org/html/2406.14228v3#S4.SS3.SSS0.Px3.p1.1)：For EvoAgent , we adopt the original settings in TravelPlanner as the initial agent. In our main experiment, to fairly compare with Self-Refine, we set the population size N as 1 and the iterations T as 3 for efficiency, denoted as EvoAgent (1,3) .
  - [原文 Benchmark · b00040](https://arxiv.org/html/2406.14228v3#S4.T3.8)：Model Method Delivery Commonsense Hard Constraint Final Rate Micro Macro Micro Macro
  - [原文 Benchmark · b00040](https://arxiv.org/html/2406.14228v3#S4.T3.8)：GPT-4 Direct 100.0 79.4 15.8 27.5 16.1 2.2 CoT 100.0 76.7 11.7 22.4 12.8 2.2 SPP 96.7 70.6 5.6 11.4 7.8 0.6 Self-Refine 3 98.9 75.3 7.2 12.4 7.2 1.1 EvoAgent (1,3) 100.0 81.5 21.1 31.4 18.9 7.2
  - [原文 A.5 Evaluation Details of TravelPlanner · b00071](https://arxiv.org/html/2406.14228v3#A1.I1.i1.p1.1)：Delivery Rate: Assesses if agents can complete a plan within a limited number of steps (30 in our experimental setting).
  - [原文 A.2 Model Selection · b00067](https://arxiv.org/html/2406.14228v3#A1.SS2.p1.1)：For OpenAI models, we use gpt-35-turbo and gpt-4-32k with the version of 2024-02-15-preview in Azure. For Gemini-pro, we use Google Gemini-Pro APIs to obtain results. We set the temperature to 0 for all models.
任务：TravelPlanner 消融。
基础模型：GPT-3.5 与 Gemini-Pro，报告二者平均结果。
比较基线：无质量检查版本；Random、PK、All-in 候选选择策略。
指标：常识约束通过率 Com.、硬约束通过率 Hard；所给文本未明确 micro/macro 口径。
结果：N=2、T=3 时，质量检查使 Com./Hard 从62.8/12.7升至67.0/15.2；有质量检查时 Random、PK、All-in 分别为67.1/15.0、66.4/14.5、67.1/17.0。
资源条件：比较 (N,T)=(1,3)、(1,5)、(2,3)、(3,3)。
- TravelPlanner 消融比较质量检查、种群规模、迭代数及候选选择策略；不同配置的指标变化并不一致。
  核验：原文支持；b00052—b00057支持消融维度、双模型平均和所列配置；b00054支持全部引用数值，指标变化确不一致。该汇总表及相关文字未明确标注micro/macro口径。
  - [原文 4.4 Ablation Studies · b00053](https://arxiv.org/html/2406.14228v3#S4.T4)：Table 4: Average commonsense constraint pass rate ( Com. ) and hard constraint pass rate ( Hard ) of ablated variants on TravelPlanner.
  - [原文 Result & Analysis · b00057](https://arxiv.org/html/2406.14228v3#S4.SS4.SSS0.Px2.p1.1)：To obtain stable findings, we first obtain results from GPT-3.5 and Gemini-Pro across different population sizes and selection strategies. We then average their results over various metrics to clearly compare the strengths and weaknesses of these variants.
  - [原文 4.4 Ablation Studies · b00054](https://arxiv.org/html/2406.14228v3#S4.T4.6)：Method w/o QC w/ QC Com. Hard Com. Hard
  - [原文 4.4 Ablation Studies · b00054](https://arxiv.org/html/2406.14228v3#S4.T4.6)：EvoAgent (1,3) 68.9 14.0 68.9 14.0 EvoAgent (1,5) 67.5 16.9 67.5 16.9 EvoAgent (2,3) 62.8 12.7 67.0 15.2 EvoAgent (3,3) 62.7 13.7 66.8 15.8
  - [原文 4.4 Ablation Studies · b00054](https://arxiv.org/html/2406.14228v3#S4.T4.6)：Different Selection Stategies Random 62.9 12.7 67.1 15.0 PK 63.5 13.6 66.4 14.5 All-in 61.9 13.2 67.1 17.0
任务：Logic Grid Puzzle、Trivia Creative Writing、Codenames Collaborative。
基础模型：Llama-3.1-70B-Instruct。
比较基线：Direct、AgentVerse、AutoAgents。
指标：任务得分及时间（秒）；所给文本未明确时间聚合口径。
结果：依任务顺序，EvoAgent 得分/秒为67.00/1060.80、74.50/1209.60、74.62/859.20；Direct 为50.00/318.00、56.40/441.00、64.32/168.00。作者称其与 AgentVerse、AutoAgents 时间成本相近。
资源条件：SGLang；8张 RTX 3090；bf16。
- 时间实验同时报告任务得分与耗时；EvoAgent 在三个任务上均比 Direct 得分更高、耗时更多。
  核验：原文支持；b00077中EvoAgent在三个任务上均比Direct得分高且耗时多，所列数值准确；b00078支持模型、SGLang、8张RTX 3090及bf16条件，并明确将时间成本相近表述为作者判断。所给文本未明确时间聚合口径。
  - [原文 B.1 Time Efficiency of EvoAgent · b00078](https://arxiv.org/html/2406.14228v3#A2.SS1.p1.1)：We conduct experiments on Logic Grid Puzzle (Logic), Trivia Creative Writing (Writing), and Codenames Collaborative (Code) by using Llama-3.1-70B-Instruct Dubey et al. (2024) with SGLang .
  - [原文 B.1 Time Efficiency of EvoAgent · b00078](https://arxiv.org/html/2406.14228v3#A2.SS1.p1.1)：Specifically, we deploy Llama-3.1-70B-Instruct on an 8-GPU setup using RTX 3090 (bf16).
  - [原文 Appendix B More Analysis of EvoAgent · b00077](https://arxiv.org/html/2406.14228v3#A2.T5.2)：Method Logic Logic Time (s) Writing Writing Time (s) Code Code Time (s) Direct 50.00 318.00 56.40 441.00 64.32 168.00
  - [原文 Appendix B More Analysis of EvoAgent · b00077](https://arxiv.org/html/2406.14228v3#A2.T5.2)：AgentVerse 60.00 1056.00 70.40 1518.00 68.90 824.40 AutoAgents 61.50 988.80 69.60 1303.80 68.35 770.40 EvoAgent 67.00 1060.80 74.50 1209.60 74.62 859.20
  - [原文 B.1 Time Efficiency of EvoAgent · b00078](https://arxiv.org/html/2406.14228v3#A2.SS1.p1.1)：When compared to multi-agent systems such as AgentVerse and AutoAgents, EvoAgent achieves similar time costs while producing the best performance.

## 原文支持的局限性

- 作者承认生成多个专业智能体会增加 token 成本；除 AgentVerse、AutoAgents 外未广泛比较已有多智能体框架；未人工评估生成智能体质量。
  核验：原文支持；b00062明确承认相较单智能体增加token成本、除所述两框架外未广泛比较，以及未人工评价生成智能体质量。这是作者明确报告的局限。
  - [原文 Limitations · b00062](https://arxiv.org/html/2406.14228v3#Sx1.p1.1)：First, EvoAgent requires the model to generate multiple specialized agents, which brings more token cost than a single agent.
  - [原文 Limitations · b00062](https://arxiv.org/html/2406.14228v3#Sx1.p1.1)：Besides, except for AgentVerse and AutoAgents in Table 1 , we do not conduct extensive comparisons with existing multi-agent systems frameworks.
  - [原文 Limitations · b00062](https://arxiv.org/html/2406.14228v3#Sx1.p1.1)：Finally, we do not manually evaluate the quality of the generated agents
- 作者指出 ScienceWorld 中长轨迹收益较小；在 TravelPlanner 缺少质量检查且采用 All-in 的分析中，不适合的角色可能产生过长计划，导致上下文溢出、无法生成最终结果。
  核验：原文支持；b00044明确称中长轨迹收益小于短轨迹；b00082将缺少质量检查的All-in交付问题与不适合的角色、过长计划及上下文窗口溢出联系起来。结论保留了该分析条件和可能性。
  - [原文 Result & Analysis · b00044](https://arxiv.org/html/2406.14228v3#S4.I3.i2.p1.1)：Our method exhibits the most substantial improvement in short-trajectory tasks, with less significant gains in medium and long-trajectory tasks.
  - [原文 B.2 More Analysis of Ablation Studies · b00082](https://arxiv.org/html/2406.14228v3#A2.SS2.p1.1)：This result indicates that the absence of the quality-check module significantly lowers the delivery pass rate when the All-in strategy is applied.
  - [原文 B.2 More Analysis of Ablation Studies · b00082](https://arxiv.org/html/2406.14228v3#A2.SS2.p1.1)：we revisit the results and discover that sometimes unsuitable agents create overly lengthy travel plans that fail to meet the criteria.
  - [原文 B.2 More Analysis of Ablation Studies · b00082](https://arxiv.org/html/2406.14228v3#A2.SS2.p1.1)：Therefore, the input length surpasses the context window of LLMs, preventing the final result generation.
- GPT-3.5 的 Trivia Creative Writing 迭代实验中，作者报告超过三轮后收益趋于平台，并推测生成智能体趋于相似；TravelPlanner 从(1,3)增至(1,5)时，Com.下降而 Hard 上升。
  核验：原文支持；b00081限定迭代实验为GPT-3.5的Trivia Creative Writing，b00083报告三轮后收益趋于平台，并将智能体趋同作为作者推测；b00054支持TravelPlanner汇总Com.由68.9降至67.5、Hard由14.0升至16.9。
  - [原文 B.2 More Analysis of Ablation Studies · b00081](https://arxiv.org/html/2406.14228v3#A2.T7)：Table 7: The performance of GPT-3.5 with EvoAgent under different iterations on Trivia Creative Writing task.
  - [原文 B.2 More Analysis of Ablation Studies · b00083](https://arxiv.org/html/2406.14228v3#A2.SS2.p2.1)：However, the improvement plateaus when the iteration count exceeds three. We suggest that traditional NLP tasks are relatively simple, and beyond a certain iteration number, even with a quality-check module in place, the generated agents tend to be similar and thus converge.
  - [原文 4.4 Ablation Studies · b00054](https://arxiv.org/html/2406.14228v3#S4.T4.6)：EvoAgent (1,3) 68.9 14.0 68.9 14.0 EvoAgent (1,5) 67.5 16.9 67.5 16.9

## 多智能体机制

- 角色与分工：角色由已有智能体设置进化产生；按作者描述，每个查询生成 N×T 个不同专业智能体，与初始智能体协作。
  核验：原文支持；b00005明确以已有专业智能体的角色、技能和提示词等设置为进化变量；b00055明确称每个查询生成N×T个不同专业智能体与初始智能体协作。此处按作者描述成立。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2406.14228v3#S1.p3.1)：EvoAgent can be considered as a one-shot agent generation method that starts from a specialized agent as the initial agent, and then considers its settings (e.g., role, skills, prompts, and so on) as the variables to be evolved.
  - [原文 Experiment Settings · b00055](https://arxiv.org/html/2406.14228v3#S4.SS4.SSS0.Px1.p1.1)：For each query, EvoAgent can generate N \times T different specialized agents to collaborate with the initial agent.
- 协作结构：子智能体各自生成候选结果，由 LLM 将候选与上一轮结果整合。
  核验：原文支持；b00019直接描述各子智能体生成候选结果，再由LLM将候选与上一轮结果整合。
  - [原文 STEP 4: Results Update · b00019](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px4.p1.1)：we ask each child agent to generate candidate results and then use LLMs to integrate these candidates with the result from the previous iteration into a new result
- 通信机制：主流程传递候选结果供整合；AutoGen 适配示例另由群聊管理器选择发言者、收集回答并分发消息。
  核验：原文支持；b00019支持主流程中的候选结果整合；b00092在AutoGen适配语境中明确列出群聊管理器选择发言者、收集回答和分发消息的职责。
  - [原文 STEP 4: Results Update · b00019](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px4.p1.1)：we ask each child agent to generate candidate results and then use LLMs to integrate these candidates with the result from the previous iteration into a new result
  - [原文 D.3 EvoAgent for AutoGen · b00092](https://arxiv.org/html/2406.14228v3#A4.SS3.p1.1)：Then, a group chat manager is responsible for selecting a speaker, gathering responses, and disseminating the message.
- 调度方式：按代迭代，每轮选择 N 个子代；上一代生成的智能体加入下一轮，直到达到目标数量。
  核验：原文支持；b00018支持每轮选择N个子代，b00017支持上一代智能体加入下一轮，b00019支持重复操作直至达到目标数量。
  - [原文 STEP 3: Selection · b00018](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px3.p1.1)：We will select N child agents as the evolved agents in each iteration.
  - [原文 STEP 2: Crossover & Mutation · b00017](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px2.p1.1)：Besides, as we also need to conduct multiple iterations, we will append all agents generated in the previous generation into the next iteration.
  - [原文 STEP 4: Results Update · b00019](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px4.p1.1)：Moreover, we can automatically generate more agents by repeating the operations from step 2 to step 4 until the number of agents has fulfilled our targets.

## 自进化机制

- 改变对象：进化对象是角色、技能、提示词等智能体设置。
  核验：原文支持；b00005直接将角色、技能、提示词等智能体设置列为待进化变量。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2406.14228v3#S1.p3.1)：EvoAgent can be considered as a one-shot agent generation method that starts from a specialized agent as the initial agent, and then considers its settings (e.g., role, skills, prompts, and so on) as the variables to be evolved.
- 反馈来源：LLM 根据父代对当前请求的回答判断需改进的技能；质量检查另判断子代是否继承父代特征并保持差异。
  核验：原文支持；b00017明确依据父代对用户请求生成的结果判断需改进的技能；b00018明确由LLM检查子代的特征继承与差异性。
  - [原文 STEP 2: Crossover & Mutation · b00017](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px2.p1.1)：For Crossover , we first enable the parent agents to generate results based on user requests. Then, based on the generated results, we ask LLMs to check which skills should be improved and then update them.
  - [原文 STEP 3: Selection · b00018](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px3.p1.1)：Here, we conduct a quality-check module with an LLM to detect whether the generated agents can satisfy it has inherited the characteristics and maintained differences from parent agents.
- 更新方式：LLM 模拟进化算子更新智能体设置；结果更新采用与初始智能体相同骨干的 LLM。
  核验：原文支持；b00015支持LLM模拟进化算子更新设置；b00055明确在所述实验设置中使用与初始智能体相同骨干的LLM进行结果更新。这支持所述实现方式，不证明所有适配实现均须如此。
  - [原文 3.2 EvoAgent · b00015](https://arxiv.org/html/2406.14228v3#S3.SS2.p1.1)：Thus, we can employ LLM to simulate evolutionary operators to update the system settings of agents and create new agents.
  - [原文 Experiment Settings · b00055](https://arxiv.org/html/2406.14228v3#S4.SS4.SSS0.Px1.p1.1)：We employ an LLM that shares the same backbone as the initial agent for updates.
- 发生阶段：进化在处理每个查询时展开；ScienceWorld 在每个环境步骤应用进化操作。
  核验：原文支持；b00055明确以每个查询为智能体生成单位；b00042明确ScienceWorld每一步使用进化操作，并设置N=1、T=1。
  - [原文 Experiment Settings · b00055](https://arxiv.org/html/2406.14228v3#S4.SS4.SSS0.Px1.p1.1)：For each query, EvoAgent can generate N \times T different specialized agents to collaborate with the initial agent.
  - [原文 Result & Analysis · b00042](https://arxiv.org/html/2406.14228v3#S4.SS2.SSS0.Px3.p1.1)：Since each step in ScienceWorld requires using EA, we set the population size N as 1 and the iterations T as 1 for efficiency, denoted as EvoAgent (1,1) .
- 保留范围：任务内跨轮保留：上一代智能体加入下一轮，上一轮结果参与后续整合。
  核验：原文支持；b00017支持上一代生成的智能体加入下一轮，b00019支持上一轮结果参与后续整合。结论限定为任务内跨轮保留，未扩展为跨查询记忆。
  - [原文 STEP 2: Crossover & Mutation · b00017](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px2.p1.1)：Besides, as we also need to conduct multiple iterations, we will append all agents generated in the previous generation into the next iteration.
  - [原文 STEP 4: Results Update · b00019](https://arxiv.org/html/2406.14228v3#S3.SS2.SSS0.Px4.p1.1)：we ask each child agent to generate candidate results and then use LLMs to integrate these candidates with the result from the previous iteration into a new result

## 系统分析与启发（推测）

- 系统分析：依据 c023—c027，机制可理解为查询内的智能体配置搜索与答案整合；这些证据不足以认定模型权重更新或跨任务持续学习。
- 系统分析：c010、c011、c013 中对齐 Self-Refine 的迭代数不能证明 token、调用数或时间预算相等；c015 的耗时比较也不足以建立严格等预算优势。
- 系统分析：c014、c017、c018 提示应同时考察性能、角色差异及上下文成本；不同配置的描述性差异不能视为已通过统计交互检验。

## 待研究问题（系统分析）

- 系统分析问题：严格匹配 token、模型调用数或时间预算后，专业角色生成相对单智能体多候选与提示词优化还能带来多少收益？
- 系统分析问题：能否用独立人工评价或可复现评分验证角色差异与任务能力，补充 LLM 质量检查？
- 系统分析问题：将生成设置固定后，能否在未参与其进化的独立任务上复用并保持收益？

## 缺失信息

- 所给文本提及 Algorithm 1 及提示词 Listing，但未包含其正文；无法核查完整提示词、精确质量判定规则与可执行算法细节。
- 已读文本未明确角色或经验是否跨查询、跨任务持续保留；未发现将进化产物固定后在独立留出任务上验证的证据，因此 held_out_validation 为 null。
- 已读文本未明确模型权重更新机制、共享记忆机制及底层并行执行安排；shared_memory 为 null。
- 已读文本未建立严格等 token、等调用数或等时间预算的单智能体对照，因此 equal_budget_single_agent_comparison 为 null。
- 所给文本未包含 MMMU 图2的具体分数及 GPT-3.5 在 Trivia Creative Writing 上的逐轮性能数值。
- 所给文本未明确表4 Com./Hard 的 micro/macro 统计口径及时间实验的耗时聚合口径。
- 已读文本未发现重复运行次数、随机种子、误差范围、显著性检验及精确 token 成本。
- 已读文本包含 MetaGPT、Camel、AutoGen 适配描述，但未发现这些适配示例的对应量化评估。
- 未独立阅读引用前作，无法确认创新优先权；作者关于任意框架适用性的主张未获独立验证。本次仅依据提供文本修订卡片，未复现实验。

## 阅读范围

读取 2 / 2 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

The rise of powerful large language models (LLMs) has spurred a new trend in building LLM-based autonomous agents for solving complex tasks, especially multi-agent systems. Despite the remarkable progress, we notice that existing works are heavily dependent on human-designed frameworks, which greatly limits the functional scope and scalability of agent systems. How to automatically extend the specialized agent to multi-agent systems to improve task-solving capability still remains a significant challenge. In this paper, we introduce EvoAgent, a generic method to automatically extend specialized agents to multi-agent systems via the evolutionary algorithm, thereby improving the effectiveness of LLM-based agents in solving tasks. Specifically, we consider the existing agent frameworks as the initial individual and then apply a series of evolutionary operators (e.g., mutation, crossover, selection, etc.) to generate multiple agents with diverse settings. Experimental results across various tasks show that EvoAgent can significantly enhance the task-solving capability of LLM-based agents, and can be generalized to any LLM-based agent framework to extend them into multi-agent systems. Resources are available at https://evo-agent.github.io/.
