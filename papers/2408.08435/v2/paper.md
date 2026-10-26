# Automated Design of Agentic Systems

作者：Shengran Hu, Cong Lu, Jeff Clune
原文：https://arxiv.org/abs/2408.08435v2
首次提交：2024-08-15T21:59:23Z · 版本更新：2025-03-02T05:13:28Z
版本：v2 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- 针对智能体系统依赖人工调优的问题，作者提出 Meta Agent Search，以档案和验证性能引导元智能体迭代编写智能体代码，并报告其在多个问答任务及部分跨域、跨模型比较中优于所选基线。
  核验：原文支持；b00002、b00016、b00017及b00051支持人工调优动机、档案与验证性能引导的代码搜索；b00018报告总体优势。结论限定为作者报告及部分迁移比较，未扩大为所有候选均胜出。
  - [原文 1 Introduction · b00002](https://arxiv.org/html/2408.08435v2#S1.p1.1)：developing these building blocks and combining them into complex agentic systems often requires domain-specific manual tuning and substantial effort from both researchers and engineers.
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：The generated agent is evaluated using validation data from the target domain.
  - [原文 6 Discussion and Conclusion · b00051](https://arxiv.org/html/2408.08435v2#S6.p5.1)：Following this idea, we propose Meta Agent Search, where the meta agent iteratively builds on previous discoveries to program interesting new agents.
  - [原文 4 Experiments · b00018](https://arxiv.org/html/2408.08435v2#S4.p1.1)：Across all experiments, we find that the discovered agents substantially outperform baseline state-of-the-art hand-designed agents and maintain superior performance even when transferred across domains and models.

## 研究问题

- 智能体构件及其组合通常需要领域相关的人工调优；本文研究能否自动化设计智能体系统。
  核验：原文支持；b00002明确描述领域相关人工调优的需求；b00004明确提出自动化设计智能体系统的研究问题。
  - [原文 1 Introduction · b00002](https://arxiv.org/html/2408.08435v2#S1.p1.1)：developing these building blocks and combining them into complex agentic systems often requires domain-specific manual tuning and substantial effort from both researchers and engineers.
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2408.08435v2#S1.p2.1)：Therefore, in this paper, we propose a new research question: Can we automate the design of agentic systems?
- 作者将既有 ADAS 尝试分为提示优化与更多组件的优化，主张用代码表示全部组件；其覆盖所有设计的说法属于作者主张，未获本次阅读独立确认。
  核验：原文支持；b00037明确给出两类既有尝试及以代码表示全部组件的主张。结论将覆盖全部设计归为作者主张，没有据此认定创新性已获独立确认。
  - [原文 5 Related Work · b00037](https://arxiv.org/html/2408.08435v2#S5.p3.1)：There are two categories of works that attempt ADAS: those focused on learning better prompts and those that learn more components beyond prompts.
  - [原文 5 Related Work · b00037](https://arxiv.org/html/2408.08435v2#S5.p3.1)：In contrast, our work represents all components in code, allowing all possible designs in agentic systems and resulting in a promising search space for FM-guided search

## 方法怎样工作

- 提供不计注释少于100行的基础框架，包含模型查询和提示格式化接口；元智能体编写 forward 函数，将任务信息映射为回答。标准搜索用手工基线初始化档案。
  核验：原文支持；b00066支持框架不计注释少于100行及模型查询、提示格式化功能；b00015说明forward函数的输入输出；b00022支持标准搜索以基线初始化档案。
  - [原文 Appendix C Framework Code · b00066](https://arxiv.org/html/2408.08435v2#A3.p1.1)：In this paper, we provide the meta agent with a simple framework to implement basic functions, such as querying Foundation Models (FMs) and formatting prompts. The framework consists of fewer than 100 lines of code (excluding comments).
  - [原文 3 Our Algorithm: Meta Agent Search · b00015](https://arxiv.org/html/2408.08435v2#S3.p1.1)：the meta agent only needs to program a “forward” function to define a new agentic system, similar to the practice in FunSearch ( Romera-Paredes et al., 2024 ) . This function takes in the information of the task and outputs the agent’s response to the task.
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：We also use all baselines as initial seeds in the archive for Meta Agent Search
- 元智能体以历史档案为条件，先生成高层设计再实现代码；随后进行两轮自反思，目标是改善新颖性并排除错误。
  核验：原文支持；b00016明确先根据档案生成高层描述，再实现代码；b00064明确进行两轮自反思。结论将新颖性与排错表述为目标，没有断言其必然实现。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Conditioned on the archive, the meta agent designs a new agent by generating a high-level description of the new idea for an agentic system and then implementing it in code.
  - [原文 Appendix B Prompts · b00064](https://arxiv.org/html/2408.08435v2#A2.p8.1)：After the first response from the meta agent, we perform two rounds of self-reflection to make the generated agent novel and error-free ( Shinn et al., 2023 ; Madaan et al., 2024 ) .
- 在目标域验证数据上评估候选；执行出错时反思并重试，最多五次。将候选与指标加入档案，以成功率或 F1 等性能引导后续搜索，直到迭代上限。
  核验：原文支持；b00016、b00065及b00017分别支持目标域验证、执行错误后的最多五次反思重试、候选与指标归档，以及按成功率或F1等性能继续搜索至迭代上限。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：The generated agent is evaluated using validation data from the target domain.
  - [原文 Appendix B Prompts · b00065](https://arxiv.org/html/2408.08435v2#A2.p11.1)：When an error is encountered during the execution of the generated code, we conduct a reflection and re-run the code. This process is repeated up to five times if errors persist.
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Finally, the agent is added to the archive along with its evaluation metrics, and the process continues with the updated archive until the maximum number of iterations is reached.
  - [原文 3 Our Algorithm: Meta Agent Search · b00017](https://arxiv.org/html/2408.08435v2#S3.p3.1)：Here, we calculate the performance (e.g., success rate or F1 score) as the metrics for the meta agent to maximize.

## 作者声称的贡献

- 作者自述提出 ADAS 研究问题，以及支持完整代码空间设计的较早算法之一 Meta Agent Search；优先性和设计新颖性尚未经本次阅读独立核验。
  核验：原文支持；b00051支持作者提出ADAS研究问题的自述，b00007支持其将Meta Agent Search称为代码空间完整设计的较早算法之一。结论保留作者归属及未独立核验的边界。
  - [原文 6 Discussion and Conclusion · b00051](https://arxiv.org/html/2408.08435v2#S6.p5.1)：we propose a new research problem, Automated Design of Agentic Systems (ADAS), which aims to automatically invent novel building blocks and design powerful agentic systems
  - [原文 1 Introduction · b00007](https://arxiv.org/html/2408.08435v2#S1.p5.1)：we present Meta Agent Search in this paper as one of the first algorithms in ADAS that enables complete design in code space
- 作者自述发现了性能更好的智能体设计，并展示跨领域、跨模型迁移能力；该总体主张不能解释为每个候选在每个迁移目标上均胜出。
  核验：原文支持；b00018支持作者报告总体性能及迁移优势；b00034中Structured Feedback and Ensemble Agent在Haiku和Sonnet上的点估计低于Self-Refine，支持不能解释为逐候选、逐目标均胜出。
  - [原文 4 Experiments · b00018](https://arxiv.org/html/2408.08435v2#S4.p1.1)：Across all experiments, we find that the discovered agents substantially outperform baseline state-of-the-art hand-designed agents and maintain superior performance even when transferred across domains and models.
  - [原文 4.3 Generalization and transferability · b00034](https://arxiv.org/html/2408.08435v2#S4.T3.6.1)：Structured Feedback and Ensemble Agent \mathbf{13.7\pm 3.9} 5.0\pm 2.5 30.0\pm 5.2 38.7\pm 5.5
  - [原文 4.3 Generalization and transferability · b00034](https://arxiv.org/html/2408.08435v2#S4.T3.6.1)：Self-Refine ( Madaan et al., 2024 ) \phantom{0}6.7\pm 2.7 \mathbf{6.3\pm 2.8} 23.0\pm 5.2 \mathbf{39.3\pm 5.5}

## 本文报告的方法比较

- ARC 比较 COT、COT-SC、Self-Refine、LLM-Debate 和简化 Quality-Diversity；其他领域增加 Step-back Abstraction、Role Assignment 及 OPRO。ARC 基线用相同框架实现并作为搜索种子。
  核验：原文支持；b00022逐项列出ARC五类基线、简化Quality-Diversity、相同框架实现及基线作为档案种子；b00025支持其他推理领域增加的两类手工基线及OPRO。
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：We compared against five state-of-the-art hand-designed agents: (1) Chain-of-Thought (COT, Wei et al. (2022) )
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：(2) Self-Consistency with Chain-of-Thought (COT-SC, Wang et al. (2023b) )
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：(3) Self-Refine ( Madaan et al., 2024 ; Shinn et al., 2023 )
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：(4) LLM-Debate ( Du et al., 2023 )
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：(5) Quality-Diversity, a simplified version of Intelligent Go-Explore
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00025](https://arxiv.org/html/2408.08435v2#S4.SS2.p2.1)：(1) Step-back Abstraction ( Zheng et al., 2023 ) , which instructs agents to first consider the principles involved in solving the task for better reasoning; (2) Role Assignment ( Xu et al., 2023 ) , which assigns different roles to FMs to obtain better answers.
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00025](https://arxiv.org/html/2408.08435v2#S4.SS2.p2.1)：Furthermore, we compare our approach with the state-of-the-art prompt optimization baseline OPRO ( Yang et al., 2024 )
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：all baseline implementations were developed using the same framework as the Meta Agent
  - [原文 4.1 Case Study: ARC Challenge · b00022](https://arxiv.org/html/2408.08435v2#S4.SS1.p3.1)：We also use all baselines as initial seeds in the archive for Meta Agent Search
- 表1四列依次为阅读理解、数学、多任务、科学：搜索结果为79.4、53.4%、69.6%、34.6%；OPRO 为69.1、30.6%、67.6%、32.9%。作者报告前两域相对手工基线提高13.6个 F1 点和14.4个百分点。
  核验：原文支持；b00027的列顺序、指标及两行数值均与结论一致。b00028报告前两域的提升；结合b00027手工基线最佳值65.8和39.0，可核对为13.6个F1点及14.4个百分点。
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00027](https://arxiv.org/html/2408.08435v2#S4.T1.4.1)：Agent Name F1 Score Accuracy (%) Reading Comprehension Math Multi-task Science
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00027](https://arxiv.org/html/2408.08435v2#S4.T1.4.1)：Prompt Optimization ( Yang et al., 2024 ) 69.1\pm 0.9 30.6\pm 3.2 \mathbf{67.6\pm 3.2} \mathbf{32.9\pm 3.2} Meta Agent Search (Ours) \mathbf{79.4\pm 0.8} \mathbf{53.4\pm 3.5} \mathbf{69.6\pm 3.2} \mathbf{34.6\pm 3.2}
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00028](https://arxiv.org/html/2408.08435v2#S4.SS2.p3.1)：with improvements in F1 scores by 13.6 /100 and accuracy rates by 14.4% , respectively.
- 空档案初始化的数学结果为67.5±3.3%，高于标准初始化53.4±3.5%；阅读理解为73.9±0.9，低于标准79.4±0.8。这些点估计显示初始化效果存在领域差异。
  核验：原文支持；b00086说明空初始化与标准人工设计初始化的比较；b00091支持所列数学和阅读理解数值及相反的点估计方向。结论未将其扩大为统计显著性或稳定因果效应。
  - [原文 Appendix I Impact of Initialization · b00086](https://arxiv.org/html/2408.08435v2#A9.p1.1)：we conducted experiments where the Meta Agent Search algorithm was run without any initial agent designs, contrasting with our standard approach that incorporates human-designed solutions into the search process.
  - [原文 Appendix I Impact of Initialization · b00091](https://arxiv.org/html/2408.08435v2#A9.T6.4.1)：Meta Agent Search (Empty Initialization) 73.9\pm 0.9 \mathbf{67.5\pm 3.3} \mathbf{68.5\pm 3.3} \mathbf{32.7\pm 3.2} Meta Agent Search \mathbf{79.4\pm 0.8} 53.4\pm 3.5 \mathbf{69.6\pm 3.2} \mathbf{34.6\pm 3.2}

## 实验证据与条件

任务：ARC 网格变换代码生成；网格≤5×5，验证20题、测试60题，各评估5次。
基础模型：元智能体 gpt-4o-2024-05-13；候选与基线 gpt-3.5-turbo-0125；迁移至 claude-3-haiku-20240307、gpt-4o-2024-05-13、claude-3-5-sonnet-20240620。
比较基线：表3手工智能体基线；此处列示 Self-Refine 结果。
指标：Exact Match 准确率；95% bootstrap 置信区间。
结果：按 GPT-3.5、Haiku、GPT-4、Sonnet 顺序，Dynamic Memory and Refinement Agent 为12.7±3.9%、9.7±3.3%、37.0±5.3%、48.3±5.7%；Self-Refine 为6.7±2.7%、6.3±2.8%、23.0±5.2%、39.3±5.5%。
资源条件：搜索25轮；一次 ARC 搜索与评估约500美元 OpenAI API 费用。
- ARC 代码生成及跨模型迁移：搜索25轮，按 GPT-3.5 测试准确率选择前三个候选迁移。
  核验：原文支持；b00021、b00071支持ARC子集、样本量、重复评估、代码生成、模型版本及25轮搜索；b00030明确按GPT-3.5测试准确率选前三名迁移。b00054、b00033、b00034及b00092支持迁移模型、区间口径、列示结果及约500美元OpenAI API费用。
  - [原文 4.1 Case Study: ARC Challenge · b00021](https://arxiv.org/html/2408.08435v2#S4.SS1.p2.1)：we sample our data from questions with grid dimensions \leq 5\times 5 in the “Public Training Set (Easy)”. We sample a validation set and a test set with 20 and 60 questions, respectively, for searching and testing.
  - [原文 4.1 Case Study: ARC Challenge · b00021](https://arxiv.org/html/2408.08435v2#S4.SS1.p2.1)：We calculate the validation and test accuracy of an agent by assessing it over the validation and test sets five times to reduce the variance from the stochastic sampling of FMs.
  - [原文 4.1 Case Study: ARC Challenge · b00021](https://arxiv.org/html/2408.08435v2#S4.SS1.p2.1)：Meta Agent Search runs for 25 iterations
  - [原文 Appendix D Experiment Details for ARC Challenge · b00071](https://arxiv.org/html/2408.08435v2#A4.p1.1)：We instruct the meta agent to design agents that generate code as solutions rather than directly outputting answers.
  - [原文 Appendix D Experiment Details for ARC Challenge · b00071](https://arxiv.org/html/2408.08435v2#A4.p1.1)：The accuracy rate is calculated by the Exact Match between the reference solution and the predicted answer.
  - [原文 Appendix D Experiment Details for ARC Challenge · b00071](https://arxiv.org/html/2408.08435v2#A4.p1.1)：The meta agent uses “gpt-4o-2024-05-13” ( OpenAI, 2024 ) , while discovered agents and baselines are evaluated using “gpt-3.5-turbo-0125” ( OpenAI, 2022 ) to reduce compute cost.
  - [原文 4.3 Generalization and transferability · b00030](https://arxiv.org/html/2408.08435v2#S4.SS3.p2.1)：We test the top 3 agents with the best test accuracy evaluated with GPT-3.5 on ARC and then transfer them to Claude-Haiku ( Anthropic, 2024a ) , GPT-4 ( OpenAI, 2024 ) , and Claude-Sonnet ( Anthropic, 2024b ) .
  - [原文 Appendix A Generalization and Transferability · b00054](https://arxiv.org/html/2408.08435v2#A1.p2.1)：For the results shown in Table 3 , we use “gpt-4o-2024-05-13” for GPT-4, “claude-3-haiku-20240307” for Claude-Haiku, and “claude-3-5-sonnet-20240620” for Claude-Sonnet.
  - [原文 4.3 Generalization and transferability · b00033](https://arxiv.org/html/2408.08435v2#S4.T3)：We report the test accuracy and the 95% bootstrap confidence interval.
  - [原文 4.3 Generalization and transferability · b00034](https://arxiv.org/html/2408.08435v2#S4.T3.6.1)：Agent Name Accuracy on ARC (%) GPT-3.5 Claude-Haiku GPT-4 Claude-Sonnet
  - [原文 4.3 Generalization and transferability · b00034](https://arxiv.org/html/2408.08435v2#S4.T3.6.1)：Dynamic Memory and Refinement Agent {\dagger} \mathbf{12.7\pm 3.9} \mathbf{9.7\pm 3.3} \mathbf{37.0\pm 5.3} \mathbf{48.3\pm 5.7}
  - [原文 4.3 Generalization and transferability · b00034](https://arxiv.org/html/2408.08435v2#S4.T3.6.1)：Self-Refine ( Madaan et al., 2024 ) \phantom{0}6.7\pm 2.7 \mathbf{6.3\pm 2.8} 23.0\pm 5.2 \mathbf{39.3\pm 5.5}
  - [原文 Appendix J Cost of Experiments · b00092](https://arxiv.org/html/2408.08435v2#A10.p1.1)：A single run of search and evaluation on ARC ( Figure 3 ) costs approximately $500 USD in OpenAI API costs
任务：DROP、MGSM、MMLU、GPQA_diamond；GPQA 验证32题、测试166题，其他领域验证128题、测试800题。
基础模型：元智能体 gpt-4o-2024-05-13；候选与基线 gpt-3.5-turbo-0125。
比较基线：手工智能体基线及提示优化 OPRO。
指标：DROP 为 F1，其余为准确率；95% bootstrap 置信区间。
结果：按 DROP、MGSM、MMLU、GPQA 顺序，搜索结果为79.4±0.8、53.4±3.5%、69.6±3.2%、34.6±3.2%；OPRO 为69.1±0.9、30.6±3.2%、67.6±3.2%、32.9±3.2%。
资源条件：每域独立搜索30轮；GPQA 评估5次，其余1次；DROP 为 one-shot，其余 zero-shot；一次推理领域搜索与评估约300美元。
- 四个推理领域分别搜索30轮，报告留出测试集结果。
  核验：原文支持；b00024、b00075支持四域独立搜索30轮、数据规模、模型版本、评估次数及提示设置；b00025至b00027支持基线、留出测试与所列指标数值。b00092支持一次推理领域运行约300美元，未提供额外资源保证。
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00024](https://arxiv.org/html/2408.08435v2#S4.SS2.p1.1)：(1) DROP ( Dua et al., 2019 ) for evaluating Reading Comprehension ; (2) MGSM ( Shi et al., 2023 ) for evaluating Math capability under a multi-lingual setting; (3) MMLU ( Hendrycks et al., 2021 ) for evaluating Multi-task Problem Solving; and (4) GPQA ( Rein et al., 2023 ) for evaluating the capability of solving hard (graduate-level) questions in Science .
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00024](https://arxiv.org/html/2408.08435v2#S4.SS2.p1.1)：The search is conducted independently within each domain. Meta Agent Search runs for 30 iterations.
  - [原文 Appendix E Experiment Details for Reasoning and Problem-Solving Domains · b00075](https://arxiv.org/html/2408.08435v2#A5.p1.1)：For GPQA (Science), we use GPQA_diamond and the validation set consists of 32 questions, while the remaining 166 questions form the test set. For the other domains, the validation and test sets are sampled with 128 and 800 questions, respectively.
  - [原文 Appendix E Experiment Details for Reasoning and Problem-Solving Domains · b00075](https://arxiv.org/html/2408.08435v2#A5.p1.1)：We evaluate agents five times for GPQA and once for the other domains to maintain a consistent total number of evaluations. Each domain uses zero-shot style questions, except DROP (Reading Comprehension), which uses one-shot style questions following the practice in ( OpenAI, 2023 ) .
  - [原文 Appendix E Experiment Details for Reasoning and Problem-Solving Domains · b00075](https://arxiv.org/html/2408.08435v2#A5.p1.1)：The meta agent uses “gpt-4o-2024-05-13” ( OpenAI, 2024 ) , while discovered agents and baselines are evaluated using “gpt-3.5-turbo-0125” ( OpenAI, 2022 ) to reduce compute cost.
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00025](https://arxiv.org/html/2408.08435v2#S4.SS2.p2.1)：We adopt all baselines introduced in Figure 3 .
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00025](https://arxiv.org/html/2408.08435v2#S4.SS2.p2.1)：Furthermore, we compare our approach with the state-of-the-art prompt optimization baseline OPRO ( Yang et al., 2024 )
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00027](https://arxiv.org/html/2408.08435v2#S4.T1.4.1)：Agent Name F1 Score Accuracy (%) Reading Comprehension Math Multi-task Science
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00027](https://arxiv.org/html/2408.08435v2#S4.T1.4.1)：Prompt Optimization ( Yang et al., 2024 ) 69.1\pm 0.9 30.6\pm 3.2 \mathbf{67.6\pm 3.2} \mathbf{32.9\pm 3.2} Meta Agent Search (Ours) \mathbf{79.4\pm 0.8} \mathbf{53.4\pm 3.5} \mathbf{69.6\pm 3.2} \mathbf{34.6\pm 3.2}
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00026](https://arxiv.org/html/2408.08435v2#S4.T1)：We report the test accuracy and the 95% bootstrap confidence interval on held-out test sets.
  - [原文 Appendix J Cost of Experiments · b00092](https://arxiv.org/html/2408.08435v2#A10.p1.1)：a run within the reasoning and problem-solving domains ( Section 4.2 ) costs about $300 USD.
任务：MGSM → GSM8K、GSM-Hard、SVAMP、ASDiv，以及 DROP、MMLU、GPQA 对应的三个非数学领域。
基础模型：未报告 / 未提取
比较基线：目标域手工智能体基线及目标域专门搜索的智能体。
指标：数学、MMLU、GPQA 为准确率，DROP 为 F1；数学表报告95% bootstrap 置信区间。
结果：Dynamic Role-Playing Architecture 在 GSM8K、GSM-Hard、SVAMP、ASDiv 分别为69.5±3.2%、31.2±3.2%、81.5±2.6%、91.8±1.8%；其 MMLU 为62.4±3.4%，低于 COT-SC 的65.9±3.2%。
资源条件：未报告 / 未提取
- 将 MGSM 搜索得到的前三个智能体迁移至数学及非数学领域；优势并非逐候选、逐目标均成立。
  核验：原文支持；b00059支持将MGSM前三个智能体迁移至四个数学域和三个非数学域，并与目标域专门搜索结果比较；b00055、b00056及b00058支持指标、区间和列示数值。MMLU上的62.4低于COT-SC的65.9，支持优势并非逐项成立。
  - [原文 Appendix A Generalization and Transferability · b00059](https://arxiv.org/html/2408.08435v2#A1.p3.1)：we test the top 3 agents from MGSM and transfer them to (1) four popular math domains: GSM8K ( Cobbe et al., 2021 ) , GSM-Hard ( Gao et al., 2023 ) , SVAMP ( Patel et al., 2021 ) , and ASDiv ( Miao et al., 2020 ) and (2) three domains beyond math adopted in Section 4.2 .
  - [原文 Appendix A Generalization and Transferability · b00056](https://arxiv.org/html/2408.08435v2#A1.T4.4.1)：Agent Name Accuracy (%) MGSM GSM8K GSM-Hard SVAMP ASDiv
  - [原文 Appendix A Generalization and Transferability · b00056](https://arxiv.org/html/2408.08435v2#A1.T4.4.1)：Dynamic Role-Playing Architecture \mathbf{53.4\pm 3.5} \mathbf{69.5\pm 3.2} \mathbf{31.2\pm 3.2} 81.5\pm 2.6 \mathbf{91.8\pm 1.8}
  - [原文 Appendix A Generalization and Transferability · b00055](https://arxiv.org/html/2408.08435v2#A1.T4)：We report the test accuracy and the 95% bootstrap confidence interval.
  - [原文 Appendix A Generalization and Transferability · b00058](https://arxiv.org/html/2408.08435v2#A1.T5.4.1)：Agent Name Accuracy (%) F1 Score Accuracy (%) Math Reading Comprehension Multi-task Science
  - [原文 Appendix A Generalization and Transferability · b00058](https://arxiv.org/html/2408.08435v2#A1.T5.4.1)：Dynamic Role-Playing Architecture \mathbf{53.4\pm 3.5} 70.4\pm 0.9 62.4\pm 3.4 28.6\pm 3.1
  - [原文 Appendix A Generalization and Transferability · b00058](https://arxiv.org/html/2408.08435v2#A1.T5.4.1)：COT-SC ( Wang et al., 2023b ) 28.2\pm 3.1 64.4\pm 0.8 \mathbf{65.9\pm 3.2} 30.5\pm 3.2
  - [原文 Appendix A Generalization and Transferability · b00059](https://arxiv.org/html/2408.08435v2#A1.p3.1)：While the performance of agents originally searched in the math domain does not fully match that of agents specifically designed for the target domains
任务：阅读理解、数学、多任务问答、科学问答。
基础模型：未报告 / 未提取
比较基线：包含人工设计种子的标准 Meta Agent Search。
指标：阅读理解为 F1，其余为准确率。
结果：按上述任务顺序，空初始化为73.9±0.9、67.5±3.3%、68.5±3.3%、32.7±3.2%；标准初始化为79.4±0.8、53.4±3.5%、69.6±3.2%、34.6±3.2%。
资源条件：未报告 / 未提取
- 比较空档案初始化与包含人工设计种子的标准初始化。
  核验：原文支持；b00086明确说明两种初始化条件；b00091的任务列、指标及两行完整数值均与所列结果一致。模型和额外资源条件保留为null。
  - [原文 Appendix I Impact of Initialization · b00086](https://arxiv.org/html/2408.08435v2#A9.p1.1)：we conducted experiments where the Meta Agent Search algorithm was run without any initial agent designs, contrasting with our standard approach that incorporates human-designed solutions into the search process.
  - [原文 Appendix I Impact of Initialization · b00091](https://arxiv.org/html/2408.08435v2#A9.T6.4.1)：Agent Name F1 Score Accuracy (%) Reading Comprehension Math Multi-task Science
  - [原文 Appendix I Impact of Initialization · b00091](https://arxiv.org/html/2408.08435v2#A9.T6.4.1)：Meta Agent Search (Empty Initialization) 73.9\pm 0.9 \mathbf{67.5\pm 3.3} \mathbf{68.5\pm 3.3} \mathbf{32.7\pm 3.2} Meta Agent Search \mathbf{79.4\pm 0.8} 53.4\pm 3.5 \mathbf{69.6\pm 3.2} \mathbf{34.6\pm 3.2}

## 原文支持的局限性

- 作者明确限定：本文只评估单步问答，只优化性能；复杂环境中的多步交互及成本、延迟、鲁棒性的多目标优化属于未来方向。
  核验：原文支持；b00046明确限定本次评估为单步问答，并将复杂环境多步交互列为扩展方向；b00044明确仅优化性能，将成本、延迟和鲁棒性等多目标优化列为未来方向。
  - [原文 6 Discussion and Conclusion · b00046](https://arxiv.org/html/2408.08435v2#S6.I1.i5.p1.1)：Currently, we only evaluate Meta Agent Search on single-step QA tasks in this paper. It would be interesting to extend the method to more complex domains, such as real-world applications involving multi-step interaction with complex environments.
  - [原文 6 Discussion and Conclusion · b00044](https://arxiv.org/html/2408.08435v2#S6.I1.i3.p1.1)：We only consider one objective (i.e., performance) to optimize in this paper, but in practice, multiple objectives are often considered, such as cost, latency, and robustness of agentic systems
- 作者承认，仅使用评估集数值性能反馈的方式昂贵且遗漏信息；在代码空间从零编写任意组件在实践中也不高效。
  核验：原文支持；b00049明确承认仅使用数值性能反馈昂贵且遗漏信息；b00047明确指出在代码空间从零编写任意组件在实践中不高效。
  - [原文 6 Discussion and Conclusion · b00049](https://arxiv.org/html/2408.08435v2#S6.I1.i8.p1.1)：In this work, we simply evaluate discovered agents on the evaluation set and use the numerical performance results. However, this approach is both expensive and misses a lot of information.
  - [原文 6 Discussion and Conclusion · b00047](https://arxiv.org/html/2408.08435v2#S6.I1.i6.p1.1)：Although we can theoretically allow any components in agentic systems to be programmed from scratch in the code space, it is not efficient in practice.
- 当前每次搜索只针对一个领域；作者承认数学域智能体迁移后未完全达到目标域专门搜索智能体的性能。
  核验：原文支持；b00049明确每次搜索只针对一个领域；b00059明确数学域智能体迁移后未完全达到目标域专门设计智能体的性能。
  - [原文 6 Discussion and Conclusion · b00049](https://arxiv.org/html/2408.08435v2#S6.I1.i8.p1.1)：Finally, in this work, we targeted only one domain during the search.
  - [原文 Appendix A Generalization and Transferability · b00059](https://arxiv.org/html/2408.08435v2#A1.p3.1)：While the performance of agents originally searched in the math domain does not fully match that of agents specifically designed for the target domains

## 多智能体机制

- 角色与分工：搜索层由元智能体设计候选；部分发现的系统使用多个 COT 解答模块，以及针对效率、简洁性等特征的专家评价。
  核验：原文支持；b00016支持元智能体设计候选；b00023描述多个COT生成答案、精炼与集成，以及通过专家评价效率、简洁性等特征。结论限定为部分发现系统的模式。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Conditioned on the archive, the meta agent designs a new agent by generating a high-level description of the new idea for an agentic system and then implementing it in code.
  - [原文 4.1 Case Study: ARC Challenge · b00023](https://arxiv.org/html/2408.08435v2#S4.SS1.p4.1)：an important design pattern emerged in iteration 3 where it uses multiple COTs to generate possible answers, refines them, and finally ensembles the best answers.
  - [原文 4.1 Case Study: ARC Challenge · b00023](https://arxiv.org/html/2408.08435v2#S4.SS1.p4.1)：the ideas of incorporating diverse feedback, evaluating for various specific traits (via experts) such as efficiency and simplicity, and simulating human-like feedback emerged in iterations 5, 11, and 12, respectively.
- 协作结构：一个已展示的协作模式是多个 COT 生成可能答案，随后精炼并集成最佳答案；不能泛化为所有候选的统一结构。
  核验：原文支持；b00023明确描述第3轮出现的多个COT生成、精炼并集成最佳答案的设计模式；原文没有将其规定为全部候选的统一结构。
  - [原文 4.1 Case Study: ARC Challenge · b00023](https://arxiv.org/html/2408.08435v2#S4.SS1.p4.1)：an important design pattern emerged in iteration 3 where it uses multiple COTs to generate possible answers, refines them, and finally ensembles the best answers.
- 通信机制：框架用 namedtuple Info 对象传递模型响应、工具结果和任务描述；模型模块将输入 Info 拼接成结构化提示，并标注名称、作者等元数据。
  核验：原文支持；b00066明确说明namedtuple Info封装模型响应、工具调用结果及任务描述，并将输入Info拼接为按名称、作者等元数据标注的结构化提示。
  - [原文 Appendix C Framework Code · b00066](https://arxiv.org/html/2408.08435v2#A3.p1.1)：we encapsulate every piece of information into a namedtuple Info object, making it easy to combine different types of information (e.g., FM responses, results from tool function calls, task descriptions) and facilitate communication between different modules.
  - [原文 Appendix C Framework Code · b00066](https://arxiv.org/html/2408.08435v2#A3.p1.1)：in the FM module, we automatically construct the prompt by concatenating all input Info objects into a structured format, with each Info titled by its metadata (e.g., name, author).

## 自进化机制

- 改变对象：更新对象是代码形式的候选智能体设计，以及累积候选与评估指标的搜索档案。
  核验：原文支持；b00016明确候选设计以代码实现，并在评估后连同指标加入档案，供后续迭代使用。这里的更新对象表述符合原文流程。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Conditioned on the archive, the meta agent designs a new agent by generating a high-level description of the new idea for an agentic system and then implementing it in code.
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Finally, the agent is added to the archive along with its evaluation metrics, and the process continues with the updated archive until the maximum number of iterations is reached.
- 反馈来源：反馈包括目标域验证数据上的数值性能，以及生成代码执行时的错误；分析详细运行日志被列为未来方向。
  核验：原文支持；b00016及b00049支持验证数据与数值性能反馈；b00065支持执行错误触发反思；b00049明确将详细运行日志分析列为未来方向。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：The generated agent is evaluated using validation data from the target domain.
  - [原文 6 Discussion and Conclusion · b00049](https://arxiv.org/html/2408.08435v2#S6.I1.i8.p1.1)：In this work, we simply evaluate discovered agents on the evaluation set and use the numerical performance results.
  - [原文 Appendix B Prompts · b00065](https://arxiv.org/html/2408.08435v2#A2.p11.1)：When an error is encountered during the execution of the generated code, we conduct a reflection and re-run the code.
  - [原文 6 Discussion and Conclusion · b00049](https://arxiv.org/html/2408.08435v2#S6.I1.i8.p1.1)：A promising future direction is to enable the meta agent to analyze detailed running logs during the evaluation
- 更新方式：根据档案生成设计与代码，进行两轮自反思；运行错误触发最多五次反思重试，评估后扩充档案。
  核验：原文支持；b00016、b00064及b00065共同支持根据档案生成描述和代码、两轮自反思、运行错误后的最多五次反思重试及评估后归档。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Conditioned on the archive, the meta agent designs a new agent by generating a high-level description of the new idea for an agentic system and then implementing it in code.
  - [原文 Appendix B Prompts · b00064](https://arxiv.org/html/2408.08435v2#A2.p8.1)：After the first response from the meta agent, we perform two rounds of self-reflection to make the generated agent novel and error-free ( Shinn et al., 2023 ; Madaan et al., 2024 ) .
  - [原文 Appendix B Prompts · b00065](https://arxiv.org/html/2408.08435v2#A2.p11.1)：This process is repeated up to five times if errors persist.
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Finally, the agent is added to the archive along with its evaluation metrics
- 发生阶段：已展示的更新发生在设计搜索阶段；部署后持续学习及改进元智能体本身列于未来工作。
  核验：原文支持；b00016展示的是验证驱动的设计搜索更新；b00041至b00043将改进元智能体和部署后在线持续学习置于未来工作，未将其表述为已完成实验。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：The generated agent is evaluated using validation data from the target domain.
  - [原文 6 Discussion and Conclusion · b00041](https://arxiv.org/html/2408.08435v2#S6.p4.1)：Future Work. Our work also opens up many future research directions:
  - [原文 6 Discussion and Conclusion · b00042](https://arxiv.org/html/2408.08435v2#S6.I1.i1.p1.1)：It would be an exciting direction to have a higher order of meta-learning to allow the learning of the meta agent and even the meta-meta agent
  - [原文 6 Discussion and Conclusion · b00043](https://arxiv.org/html/2408.08435v2#S6.I1.i2.p1.1)：However, with ADAS automating the design and enhancement of agents, online continual learning becomes feasible post-deployment.
- 保留范围：候选与指标在单次领域搜索内累积并供后续迭代使用；各领域独立搜索。跨搜索运行或部署后的持续保留未在已读材料中交代。
  核验：原文支持；b00016支持档案在单次搜索中累积并用于后续迭代，b00024支持各领域独立搜索。提供材料未说明跨运行或部署后的档案持续保留机制；结论将该缺口限定于已读材料。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：Finally, the agent is added to the archive along with its evaluation metrics, and the process continues with the updated archive until the maximum number of iterations is reached.
  - [原文 4.2 Reasoning and Problem-Solving Domains · b00024](https://arxiv.org/html/2408.08435v2#S4.SS2.p1.1)：The search is conducted independently within each domain.
- 独立任务验证：搜索使用验证数据，发现的候选在留出测试集评估；ARC 跨模型迁移的前三名按 GPT-3.5 测试准确率选择，需与验证集选择区分。
  核验：原文支持；b00016支持搜索使用验证数据，b00021支持所有发现候选在留出测试集评估；b00030明确跨模型迁移前三名依据GPT-3.5测试准确率选择。结论正确区分了搜索反馈数据与迁移候选选择依据。
  - [原文 3 Our Algorithm: Meta Agent Search · b00016](https://arxiv.org/html/2408.08435v2#S3.p2.1)：The generated agent is evaluated using validation data from the target domain.
  - [原文 4.1 Case Study: ARC Challenge · b00021](https://arxiv.org/html/2408.08435v2#S4.SS1.p2.1)：We evaluate all discovered agents on the held-out test set and report the test accuracy in Figure 3 .
  - [原文 4.3 Generalization and transferability · b00030](https://arxiv.org/html/2408.08435v2#S4.SS3.p2.1)：We test the top 3 agents with the best test accuracy evaluated with GPT-3.5 on ARC and then transfer them to Claude-Haiku ( Anthropic, 2024a ) , GPT-4 ( OpenAI, 2024 ) , and Claude-Sonnet ( Anthropic, 2024b ) .

## 系统分析与启发（推测）

- 系统分析：b00006 的图灵完备论述涉及表达能力，不能据此证明有限预算搜索能够找到任意智能体，也不能确认首创性。
- 系统分析：b00022 的相同框架比较不足以建立等调用量、等 token 或等成本比较；预算匹配后的收益仍需核查。
- 系统分析：b00032、b00034 中存在迁移候选低于基线的点估计，应逐候选、逐目标解读。b00026 将中位数落入最佳方法95%置信区间的条目也加粗，因此加粗不能视为显著优越的证明。

## 待研究问题（系统分析）

- 系统分析问题：匹配推理调用数、token、成本并计入搜索成本后，自动发现结构相对手工基线的优势还剩多少？
- 系统分析问题：增加独立搜索重复次数后，初始化效果、最佳候选与跨域迁移结论是否稳定？
- 系统分析问题：若 ARC 候选全程按验证集选择，再进行独立最终测试，跨模型迁移结果是否改变？

## 缺失信息

- 本次提供的原文块包含正文及附录说明，但未展示完整提示词、框架代码、候选代码和算法伪代码正文；不能据此完整重建实现，也不能断言原论文未提供。
- 已读材料未明确独立搜索重复次数、随机种子、完整采样参数及消融预算控制细节；评估重复次数不能替代独立搜索重复次数。
- 已读材料未发现等预算单智能体对照，也未提供完整 token、调用量、延迟及各候选成本；近似搜索与评估总费用不能替代这些数据。
- 已读材料未完整展开候选运行时的角色配置、通信拓扑、调度、终止规则及共享记忆，因此相关字段置 null；搜索档案不能直接认定为运行时共享记忆。
- 已读材料未明确跨搜索运行或部署后的档案保留规则；部署后持续学习及元智能体自身改进列于未来工作。
- 跨域迁移及初始化消融的专属模型配置、完整资源条件在对应材料中未明确，相关实验字段置 null。
- 未阅读引用前作，不能独立确认首次提出或设计新颖性；未执行代码，未复现实验。

## 阅读范围

读取 3 / 3 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Researchers are investing substantial effort in developing powerful general-purpose agents, wherein Foundation Models are used as modules within agentic systems (e.g. Chain-of-Thought, Self-Reflection, Toolformer). However, the history of machine learning teaches us that hand-designed solutions are eventually replaced by learned solutions. We describe a newly forming research area, Automated Design of Agentic Systems (ADAS), which aims to automatically create powerful agentic system designs, including inventing novel building blocks and/or combining them in new ways. We further demonstrate that there is an unexplored yet promising approach within ADAS where agents can be defined in code and new agents can be automatically discovered by a meta agent programming ever better ones in code. Given that programming languages are Turing Complete, this approach theoretically enables the learning of any possible agentic system: including novel prompts, tool use, workflows, and combinations thereof. We present a simple yet effective algorithm named Meta Agent Search to demonstrate this idea, where a meta agent iteratively programs interesting new agents based on an ever-growing archive of previous discoveries. Through extensive experiments across multiple domains including coding, science, and math, we show that our algorithm can progressively invent agents with novel designs that greatly outperform state-of-the-art hand-designed agents. Importantly, we consistently observe the surprising result that agents invented by Meta Agent Search maintain superior performance even when transferred across domains and models, demonstrating their robustness and generality. Provided we develop it safely, our work illustrates the potential of an exciting new research direction toward automatically designing ever-more powerful agentic systems to benefit humanity.
