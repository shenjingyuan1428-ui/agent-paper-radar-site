# AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation

作者：Qingyun Wu, Gagan Bansal, Jieyu Zhang, Yiran Wu, Beibin Li, Erkang Zhu, Li Jiang, Xiaoyun Zhang, Shaokun Zhang, Jiale Liu, Ahmed Hassan Awadallah, Ryen W White, Doug Burger, Chi Wang
原文：https://arxiv.org/abs/2308.08155v2
首次提交：2023-08-16T05:57:52Z · 版本更新：2023-10-03T20:47:10Z
版本：v2 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- AutoGen 面向复杂 LLM 应用开发，以可会话智能体和会话编程组织模型、工具与人工协作；作者报告其在 MATH 全测试集上准确率为69.48%，原始 GPT-4 为55.18%。
  核验：原文支持；b00009—b00010支持框架定位及能力组织方式；b00095明确报告完整MATH测试集准确率为69.48%和55.18%。这是作者报告，非独立复现结果。
  - [原文 2 The AutoGen Framework · b00009](https://arxiv.org/html/2308.08155v2#S2.p1.1)：To reduce the effort required for developers to create complex LLM applications across various domains, a core design principle of AutoGen is to streamline and consolidate multi-agent workflows using multi-agent conversations.
  - [原文 2.1 Conversable Agents · b00010](https://arxiv.org/html/2308.08155v2#S2.SS1.p1.1)：It maintains its internal context based on sent and received messages and can be configured to possess a set of capabilities, e.g., enabled by LLMs, tools, or human input, etc.
  - [原文 Scenario 1: Autonomous Problem Solving. · b00095](https://arxiv.org/html/2308.08155v2#A4.SSx1.SSS0.Px1.p2.1)：Our analysis of the entire dataset reveals that AutoGen achieves an overall accuracy of 69.48%, while GPT-4’s accuracy stands at 55.18%.

## 研究问题

- 研究如何降低复杂 LLM 应用开发成本，通过通用框架复用、定制和扩展智能体，并编排智能体间的会话。
  核验：原文支持；b00009明确降低开发工作量的目标；b00040明确支持智能体复用、定制、扩展及会话编程。
  - [原文 2 The AutoGen Framework · b00009](https://arxiv.org/html/2308.08155v2#S2.p1.1)：To reduce the effort required for developers to create complex LLM applications across various domains, a core design principle of AutoGen is to streamline and consolidate multi-agent workflows using multi-agent conversations.
  - [原文 4 Discussion · b00040](https://arxiv.org/html/2308.08155v2#S4.p1.1)：AutoGen serves as a general framework for creating and experimenting with multi-agent systems that can easily fulfill various practical requirements, such as reusing, customizing, and extending existing agents, as well as programming conversations between them.
- 作者认为简单角色扮演式多智能体会话不足以解决问题，并以其观察到的 CAMEL 工具或代码执行能力不足为例；该前作判断未经本次独立核验。
  核验：原文支持；b00078明确包含作者对CAMEL工具及代码执行能力的观察，以及简单角色扮演不足的判断。结论保留作者归属，未将其作为独立核验的前作事实。
  - [原文 B.2 Future Work · b00078](https://arxiv.org/html/2308.08155v2#A2.SS2.p3.1)：For example, we observed that CAMEL, another multi-agent LLM system, cannot effectively solve problems in most cases primarily because it lacks the capability to execute tools or code.
  - [原文 B.2 Future Work · b00078](https://arxiv.org/html/2308.08155v2#A2.SS2.p3.1)：This failure shows that LLMs and multi-agent conversations with simple role playing are insufficient, and highly capable agents with diverse skill sets are essential.

## 方法怎样工作

- 配置智能体的角色、会话上下文及 LLM、工具或人工输入能力；可复用预配置的 AssistantAgent 和 UserProxyAgent。
  核验：原文支持；b00010支持角色、消息上下文及能力配置；b00012明确列出两个预配置子类及复用、扩展方式。
  - [原文 2.1 Conversable Agents · b00010](https://arxiv.org/html/2308.08155v2#S2.SS1.p1.1)：It maintains its internal context based on sent and received messages and can be configured to possess a set of capabilities, e.g., enabled by LLMs, tools, or human input, etc.
  - [原文 2.1 Conversable Agents · b00012](https://arxiv.org/html/2308.08155v2#S2.SS1.p3.1)：The ConversableAgent class is the highest-level agent abstraction and, by default, can use LLMs, humans, and tools. The AssistantAgent and UserProxyAgent are two pre-configured ConversableAgent subclasses
- 用自然语言与 Python 定义回复行为、终止条件、人工输入模式及工具执行逻辑；智能体收到消息后自动生成回复，满足终止条件时停止。
  核验：原文支持；b00020支持自然语言与Python控制回复行为、终止条件、人工输入及工具执行；b00019明确自动回复及终止条件的作用。
  - [原文 2.2 Conversation Programming · b00020](https://arxiv.org/html/2308.08155v2#S2.I1.i2.p1.1)：the default system message of the built-in AssistantAgent in AutoGen uses natural language to instruct the agent to fix errors and generate code again if the previous result indicates there are errors.
  - [原文 2.2 Conversation Programming · b00020](https://arxiv.org/html/2308.08155v2#S2.I1.i2.p1.1)：Python code can be used to specify the termination condition, human input mode, and tool execution logic, e.g., the max number of auto replies.
  - [原文 2.2 Conversation Programming · b00019](https://arxiv.org/html/2308.08155v2#S2.I1.i1.p1.1)：Once an agent receives a message from another agent, it automatically invokes generate_reply and sends the reply back to the sender unless a termination condition is satisfied.
- 通过消息传递方案、人工输入或执行反馈，驱动后续求解；复杂应用可使用动态群聊，由管理者选择发言者并广播回复。
  核验：原文支持；b00013明确方案传递、人工输入或代码执行反馈；b00021明确管理者动态选择发言者并广播回复。
  - [原文 2.1 Conversable Agents · b00013](https://arxiv.org/html/2308.08155v2#S2.SS1.p4.1)：the assistant agent generates a solution with the help of LLMs and passes the solution to the user proxy agent. Then, the user proxy agent solicits human inputs or executes the assistant’s code and passes the results as feedback back to the assistant.
  - [原文 2.2 Conversation Programming · b00021](https://arxiv.org/html/2308.08155v2#S2.SS2.p4.1)：built-in GroupChatManager , which can dynamically select the next speaker and then broadcast its response to other agents.

## 作者声称的贡献

- 作者自述贡献为开源 AutoGen 库，以可会话智能体、会话编程、统一会话接口和自动回复机制支持多智能体应用；首创性未独立确认。
  核验：原文支持；b00040明确将开源库、可会话智能体、会话编程、统一接口和自动回复列为作者介绍的设计；结论未据此确认首创性。
  - [原文 4 Discussion · b00040](https://arxiv.org/html/2308.08155v2#S4.p1.1)：We introduced an open-source library, AutoGen , that incorporates the paradigms of conversable agents and conversation programming.
  - [原文 4 Discussion · b00040](https://arxiv.org/html/2308.08155v2#S4.p1.1)：It features a unified conversation interface among the agents, along with an auto-reply mechanisms
- 作者报告 AutoGen 简化了 OptiGuide 实现，使核心工作流代码由超过430行缩减至100行。
  核验：原文支持；b00137明确报告OptiGuide核心工作流代码从超过430行缩减至100行，范围限定准确。
  - [原文 Detailed Workflow. · b00137](https://arxiv.org/html/2308.08155v2#A4.SSx4.SSS0.Px1.p5.1)：The core workflow code for OptiGuide was reduced from over 430 lines to 100 lines using AutoGen , leading to significant productivity improvement.

## 本文报告的方法比较

- 数学评估比较 Multi-Agent Debate、LangChain ReAct、原始 GPT-4、ChatGPT Code Interpreter 和 Wolfram Alpha 插件；作者报告 AutoGen 内置智能体开箱即用表现更好。
  核验：原文支持；b00030列出全部比较对象，并明确声称内置智能体开箱即用表现优于这些方案；结论保留作者报告属性。
  - [原文 A1: Math Problem Solving · b00030](https://arxiv.org/html/2308.08155v2#S3.SSx1.p2.1)：including open-source methods such as Multi-Agent Debate Liang et al. (2023) , LangChain ReAct LangChain (2023) , vanilla GPT-4, and commercial products ChatGPT + Code Interpreter, and ChatGPT + Plugin (Wolfram Alpha)
  - [原文 A1: Math Problem Solving · b00030](https://arxiv.org/html/2308.08155v2#S3.SSx1.p2.1)：The results show that the built-in agents from AutoGen already yield better performance out of the box compared to the alternative approaches, even including the commercial ones.
- 作者将无交互检索设置优于 DPR 归因于检索器差异，而非交互检索机制。
  核验：原文支持；b00118明确将无交互检索设置优于DPR归因于所用检索器的差异，而非交互检索机制。
  - [原文 Detailed Workflow. · b00118](https://arxiv.org/html/2308.08155v2#A4.SSx2.SSS0.Px1.p4.1)：Consequently, we assert that AutoGen W/O interactive retrieval outperforms DPR due to differences in the retrievers employed. Specifically, we utilize a straightforward vector search retriever with the all-MiniLM-L6-v2 model for embeddings.
- 表格显示角色扮演群聊比 task-based 群聊成功数更多，但调用数也更多，终止失败数相同；这与正文概括的更少调用和终止失败不一致。
  核验：原文支持；b00148显示角色扮演群聊成功数更高；b00149—b00150显示其调用数为5.3和4.5，高于task-based的4和4，双方终止失败均为0。这与b00146针对task-based比较所称的更少调用和终止失败不一致。
  - [原文 A5: Dynamic Group Chat · b00148](https://arxiv.org/html/2308.08155v2#A4.T5.5)：Model Two Agent Group Chat Group Chat with a task-based speaker selection policy GPT-3.5-turbo 8 9 7 GPT-4 9 11 8
  - [原文 A5: Dynamic Group Chat · b00150](https://arxiv.org/html/2308.08155v2#A4.T6.5)：Model Two Agent Group Chat Group Chat with a task-based speaker selection policy GPT-3.5-turbo 9.9, 9 5.3, 0 4, 0 GPT-4 6.8, 3 4.5, 0 4, 0
  - [原文 A5: Dynamic Group Chat · b00146](https://arxiv.org/html/2308.08155v2#A4.SSx5.p1.1)：and consequently a higher success rate as reported in Table 5 , fewer LLM calls and fewer termination failures, as reported in Table 6 .

## 实验证据与条件

任务：MATH：120道非几何 level-5 题及完整5000道测试题
基础模型：GPT-4
比较基线：原始 GPT-4、Multi-Agent Debate、LangChain ReAct、ChatGPT Code Interpreter、ChatGPT Wolfram Alpha 插件
指标：准确率
结果：完整测试集：AutoGen 69.48%，GPT-4 55.18%
资源条件：执行环境预装 sympy
- 作者报告两组自主数学求解定量评估；完整5000题测试集上 AutoGen 准确率高于原始 GPT-4。
  核验：原文支持；b00095支持两组评估的题量、难度、类别限制及完整测试集准确率；b00083支持GPT-4和预装sympy条件；b00030支持所列比较对象。
  - [原文 Scenario 1: Autonomous Problem Solving. · b00095](https://arxiv.org/html/2308.08155v2#A4.SSx1.SSS0.Px1.p2.1)：(1) an experiment involving 120 level-5 (the most challenging level) problems, including 20 problems from six categories, excluding geometry, and (2) an experiment on the entire test set, which includes 5000 problems.
  - [原文 Scenario 1: Autonomous Problem Solving. · b00083](https://arxiv.org/html/2308.08155v2#A4.SSx1.SSS0.Px1.p1.1)：For all evaluations, we use GPT-4 as the base model, and pre-install the “sympy” package in the execution environment.
  - [原文 Scenario 1: Autonomous Problem Solving. · b00095](https://arxiv.org/html/2308.08155v2#A4.SSx1.SSS0.Px1.p2.1)：Our analysis of the entire dataset reveals that AutoGen achieves an overall accuracy of 69.48%, while GPT-4’s accuracy stands at 55.18%.
  - [原文 A1: Math Problem Solving · b00030](https://arxiv.org/html/2308.08155v2#S3.SSx1.p2.1)：including open-source methods such as Multi-Agent Debate Liang et al. (2023) , LangChain ReAct LangChain (2023) , vanilla GPT-4, and commercial products ChatGPT + Code Interpreter, and ChatGPT + Plugin (Wolfram Alpha)
任务：Natural Questions；6775条查询、5332份去重上下文文档
基础模型：GPT-3.5
比较基线：DPR；无交互检索消融
指标：F1、Recall、上下文更新触发比例
结果：无交互检索补充设置前500题：F1 23.40%、Recall 62.60%；约19.4%的问题触发上下文更新
资源条件：上下文语料存入向量数据库；上下文更新增加 LLM 调用
- Natural Questions 评估包含无交互检索消融；23.40%和62.60%属于无交互检索补充设置前500题，不能作为完整系统成绩。
  核验：原文支持；b00117支持语料规模及向量数据库设置；b00025和b00117支持模型信息；b00032支持DPR比较与消融；b00118将两个数值明确限定为无交互检索补充设置的前500题；b00119支持上下文更新比例及额外调用。
  - [原文 Detailed Workflow. · b00117](https://arxiv.org/html/2308.08155v2#A4.SSx2.SSS0.Px1.p3.1)：We collected 5,332 non-redundant context documents and 6,775 queries from HuggingFace. First, we create a document collection based on the entire context corpus and store it in the vector database.
  - [原文 3 Applications of AutoGen · b00025](https://arxiv.org/html/2308.08155v2#S3.F4.sf2)：(b) A2: Q&A tasks (w/ GPT-3.5).
  - [原文 A2: Retrieval-Augmented Code Generation and Question Answering · b00032](https://arxiv.org/html/2308.08155v2#S3.SSx2.p2.1)：In this evaluation, we compare our system with DPR (Dense Passage Retrieval) following an existing evaluation practice Adlakha et al. (2023) .
  - [原文 A2: Retrieval-Augmented Code Generation and Question Answering · b00032](https://arxiv.org/html/2308.08155v2#S3.SSx2.p2.1)：We conduct an ablation study in which we prompt the assistant agent to say “I don’t know” instead of “UPDATE CONTEXT.” in cases where relevant information is not found
  - [原文 Detailed Workflow. · b00118](https://arxiv.org/html/2308.08155v2#A4.SSx2.SSS0.Px1.p4.1)：In addition, we conduct an experiment using the same prompt as illustrated in Adlakha et al. (2023) to investigate the advantages of AutoGen W/O interactive retrieval . The F1 score and Recall for the first 500 questions are 23.40% and 62.60%, respectively
  - [原文 Detailed Workflow. · b00119](https://arxiv.org/html/2308.08155v2#A4.SSx2.SSS0.Px1.p5.1)：approximately 19.4% of questions in the Natural Questions dataset trigger an “Update Context” operation, resulting in additional LLM calls.
任务：ALFWorld 134个未见任务
基础模型：GPT-3.5-turbo
比较基线：ReAct；ALFChat 双智能体
指标：平均成功率；best of 3成功率
结果：ReAct／双智能体／三智能体平均成功率为54%／54%／69%；best of 3为66%／63%／77%
资源条件：two-shot；每任务3次尝试；提示取自 ReAct 仓库并改为会话形式
- ALFWorld 评估比较 ReAct、双智能体和增加常识 grounding 智能体的三智能体方案。
  核验：原文支持；b00034支持模型、134个未见任务及常识grounding设计；b00127支持two-shot与提示来源；b00130—b00131支持所列平均及best of 3成功率和三次尝试设置。
  - [原文 A3: Decision Making in Text World Environments · b00034](https://arxiv.org/html/2308.08155v2#S3.SSx3.p2.1)：We compare the task-solving performance of the two variants of our system with GPT-3.5-turbo and ReAct on the 134 unseen tasks from ALFWorld and report results in Figure 4(c) .
  - [原文 A3: Decision Making in Text World Environments · b00126](https://arxiv.org/html/2308.08155v2#A4.F10)：Three-agent design which adds a grounding agent that serves as a knowledge source.
  - [原文 A3: Decision Making in Text World Environments · b00127](https://arxiv.org/html/2308.08155v2#A4.SSx3.p4.1)：We integrate ReAct into AutoGen by modifying the prompts in a conversational manner. Following ReAct, we employ a two-shot setting. The few-shot prompts are obtained from the corresponding repository.
  - [原文 A3: Decision Making in Text World Environments · b00130](https://arxiv.org/html/2308.08155v2#A4.T3.3)：Method Pick Clean Heat Cool Look Pick 2 All ReAct (avg) 63 52 48 71 61 24 54 ALFChat (2 agents)(avg) 61 58 57 67 50 19 54 ALFChat (3 agents)(avg) 79 64 70 76 78 41 69 ReAct (best of 3) 75 62 61 81 78 35 66 ALFChat (2 agents)(best of 3) 71 61 65 76 67 35 63 AFLChat (3 agents)(best of 3) 92 74 78 86 83 41 77
  - [原文 A3: Decision Making in Text World Environments · b00131](https://arxiv.org/html/2308.08155v2#A4.T3)：For each task, we report the success rate out of 3 attempts.
任务：100个编码任务，安全与不安全任务各半
基础模型：GPT-4；GPT-3.5-turbo
比较基线：同时执行代码编写与安全检查的单智能体
指标：识别不安全代码的 F1
结果：作者报告 GPT-4 提升8%、GPT-3.5-turbo 提升35%；原文未明确增幅口径
资源条件：未报告 / 未提取
- 代码安全消融比较角色分离的多智能体方案与兼任代码编写和安全检查的单智能体；作者报告多智能体的识别 F1 更高。
  核验：原文支持；b00036明确支持单、多智能体比较、100题且安全与不安全各半，以及两种模型的F1提升报告。原文未明确8%和35%的增幅口径，结论保留了这一限制。
  - [原文 A4: Multi-Agent Coding · b00036](https://arxiv.org/html/2308.08155v2#S3.SSx4.p2.1)：Specifically, we construct a single-agent approach where a single agent conducts both the code-writing and safeguard processes.
  - [原文 A4: Multi-Agent Coding · b00036](https://arxiv.org/html/2308.08155v2#S3.SSx4.p2.1)：We tested the single- and multi-agent approaches on a dataset of 100 coding tasks, which is crafted to include equal numbers of safe and unsafe tasks.
  - [原文 A4: Multi-Agent Coding · b00036](https://arxiv.org/html/2308.08155v2#S3.SSx4.p2.1)：Evaluation results as reported in Figure 4(d) show that the multi-agent design boosts the F-1 score in identifying unsafe code by 8% (with GPT-4) and 35% (with GPT-3.5-turbo).
任务：咖啡供应链场景的10个随机问题
基础模型：OptiGuide：GPT-4
比较基线：ChatGPT Code Interpreter
指标：答对题数；平均解题耗时
结果：双方均答对8/10；Code Interpreter 平均4分35秒，标准差约2.5分钟；OptiGuide 平均约1.5分钟
资源条件：一名熟悉 Gurobi 的 Python 专家参与；包含人工交互与模型响应等待
- OptiGuide 用户研究由一名专家参与，比较咖啡供应链问题的答对题数及包含等待和人工交互的解题耗时。
  核验：原文支持；b00139明确支持一名专家、咖啡供应链10题、双方答对8题及全部耗时数字；原文同时涉及人工干预和GPT-4响应等待，支持所述耗时范围。
  - [原文 Manual Evaluation Comparing ChatGPT + Code Interpreter and AutoGen -based OptiGuide. · b00139](https://arxiv.org/html/2308.08155v2#A4.SSx4.SSS0.Px2.p2.1)：The study focused on a coffee supply chain scenario, and an expert Python programmer with proficiency in Gurobi participated in the test. We evaluated both systems based on 10 randomly selected questions, measuring time and accuracy.
  - [原文 Manual Evaluation Comparing ChatGPT + Code Interpreter and AutoGen -based OptiGuide. · b00139](https://arxiv.org/html/2308.08155v2#A4.SSx4.SSS0.Px2.p2.1)：While both systems answered 8 questions correctly, the Code Interpreter was significantly slower than OptiGuide because the former requires more manual intervention.
  - [原文 Manual Evaluation Comparing ChatGPT + Code Interpreter and AutoGen -based OptiGuide. · b00139](https://arxiv.org/html/2308.08155v2#A4.SSx4.SSS0.Px2.p2.1)：On average, users needed to spend 4 minutes and 35 seconds to solve problems with the Code Interpreter, with a standard deviation of approximately 2.5 minutes.
  - [原文 Manual Evaluation Comparing ChatGPT + Code Interpreter and AutoGen -based OptiGuide. · b00139](https://arxiv.org/html/2308.08155v2#A4.SSx4.SSS0.Px2.p2.1)：In contrast, OptiGuide’s average problem-solving time was around 1.5 minutes, most of which was spent waiting for responses from the GPT-4 model.
任务：五个 OptiGuide 应用，共2000个问题
基础模型：GPT-4
比较基线：ChatGPT Code Interpreter
指标：用户提示输入量的节省比率
结果：netflow 3.14倍、facility 3.14倍、tsp 4.88倍、coffee 3.38倍、diet 3.03倍；作者称保持相同编码表现
资源条件：未报告 / 未提取
- OptiGuide 在五个应用共2000题上衡量用户需输入的提示数量；表中节省比率反映人工交互量，不能直接解释为运行加速。
  核验：原文支持；b00140明确测量五个应用共2000题所需的用户提示输入量，比较语境为Code Interpreter；b00141—b00142支持GPT-4、相同编码表现及各节省比率。因此这些比率不能直接当作运行加速。
  - [原文 Manual Evaluation Comparing ChatGPT + Code Interpreter and AutoGen -based OptiGuide. · b00140](https://arxiv.org/html/2308.08155v2#A4.SSx4.SSS0.Px2.p3.1)：In contrast, AutoGen integrates multiple agents to reduce user interactions by 3 - 5 times on average as reported in Table 4 , where we evaluated our system with 2000 questions across five OptiGuide applications and measured how many prompts the user needs to type.
  - [原文 Manual Evaluation Comparing ChatGPT + Code Interpreter and AutoGen -based OptiGuide. · b00141](https://arxiv.org/html/2308.08155v2#A4.T4)：Table 4 : Manual effort saved with OptiGuide (W/ GPT-4) while preserving the same coding performance is shown in the data below.
  - [原文 Manual Evaluation Comparing ChatGPT + Code Interpreter and AutoGen -based OptiGuide. · b00142](https://arxiv.org/html/2308.08155v2#A4.T4.5)：Dataset netflow facility tsp coffee diet Saving Ratio 3.14x (0.65) 3.14x (0.64) 4.88x (1.71) 3.38x (0.86) 3.03x (0.31)
任务：12个人工构造的复杂任务
基础模型：GPT-3.5-turbo；GPT-4
比较基线：双智能体；相同四角色的 task-based 选人群聊
指标：成功数；平均 LLM 调用数；终止失败数
结果：按双智能体／角色扮演群聊／task-based 群聊：GPT-3.5-turbo 成功8／9／7，调用9.9／5.3／4，终止失败9／0／0；GPT-4 成功9／11／8，调用6.8／4.5／4，终止失败3／0／0
资源条件：四智能体群聊与双智能体对照
- 动态群聊试验比较角色扮演选人策略、task-based 选人策略及双智能体；成功数、调用数和终止失败数应分别判断。
  核验：原文支持；b00146支持12个人工任务、四角色群聊及两个对照；b00037明确角色扮演选人设置；b00147—b00150支持各模型的成功数、平均调用数和终止失败数，数值对应正确。
  - [原文 A5: Dynamic Group Chat · b00146](https://arxiv.org/html/2308.08155v2#A4.SSx5.p1.1)：we conducted a pilot study comparing a four-agent dynamic group chat system with two possible alternatives across 12 manually crafted complex tasks.
  - [原文 A5: Dynamic Group Chat · b00146](https://arxiv.org/html/2308.08155v2#A4.SSx5.p1.1)：One of the possible alternatives is a two-agent system involving an LLM-based assistant and a user proxy agent, and another alternative is a group chat system with the same group members but a task-based speaker selection policy.
  - [原文 A5: Dynamic Group Chat · b00147](https://arxiv.org/html/2308.08155v2#A4.T5)：Table 5 : Number of successes on the 12 tasks (higher the better).
  - [原文 A5: Dynamic Group Chat · b00148](https://arxiv.org/html/2308.08155v2#A4.T5.5)：Model Two Agent Group Chat Group Chat with a task-based speaker selection policy GPT-3.5-turbo 8 9 7 GPT-4 9 11 8
  - [原文 A5: Dynamic Group Chat · b00149](https://arxiv.org/html/2308.08155v2#A4.T6)：Table 6 : Average # LLM calls and number of termination failures on the 12 tasks (lower the better).
  - [原文 A5: Dynamic Group Chat · b00150](https://arxiv.org/html/2308.08155v2#A4.T6.5)：Model Two Agent Group Chat Group Chat with a task-based speaker selection policy GPT-3.5-turbo 9.9, 9 5.3, 0 4, 0 GPT-4 6.8, 3 4.5, 0 4, 0
任务：MiniWob++；RCI 官方代码中的49个可用任务
基础模型：未报告 / 未提取
比较基线：RCI
指标：成功率
结果：MiniWobChat 52.8%；原文称比 RCI 低3.6%，未明确指相对下降还是百分点差
资源条件：每任务10个不同实例
- MiniWobChat 在 MiniWob++ 的49个可用任务上与 RCI 比较；作者报告成功率52.8%，并称比 RCI 低3.6%，但未明确差值口径。
  核验：原文支持；b00164明确报告49个可用任务、52.8%及低于RCI的3.6%；b00167支持每任务10个实例。原文未明确3.6%是相对差还是百分点差，模型信息也未在所给文本中明确。
  - [原文 Workflow. · b00164](https://arxiv.org/html/2308.08155v2#A4.SSx7.SSS0.Px1.p2.1)：Specifically, among the 49 available tasks, MiniWobChat achieves a success rate of 52.8\% , which is only 3.6\% lower than RCI, a method specifically designed for the MiniWob++ benchmark.
  - [原文 Takeaways: · b00167](https://arxiv.org/html/2308.08155v2#A4.F18)：We utilize all available tasks in the official RCI code, each with varying degrees of difficulty, to conduct comprehensive comparisons. For each task, the success rate across ten different instances is reported.

## 原文支持的局限性

- 作者称工作仍处早期实验阶段，自动化与人工控制的平衡、智能体拓扑和会话效率仍需研究；增加智能体与自由度可能带来安全挑战。
  核验：原文支持；b00042明确说明早期实验阶段，并列出人工控制平衡、拓扑、会话模式与效率等研究方向，以及增加智能体和自由度可能产生的安全挑战。
  - [原文 4 Discussion · b00042](https://arxiv.org/html/2308.08155v2#S4.p3.1)：Although this work is still in its early experimental stages, it paves the way for numerous future directions and research opportunities.
  - [原文 4 Discussion · b00042](https://arxiv.org/html/2308.08155v2#S4.p3.1)：investigate the optimal balance between automation and human control in multi-agent workflows.
  - [原文 4 Discussion · b00042](https://arxiv.org/html/2308.08155v2#S4.p3.1)：we aim to investigate which strategies, such as agent topology and conversation patterns, lead to the most effective multi-agent conversations while optimizing the overall efficiency
  - [原文 4 Discussion · b00042](https://arxiv.org/html/2308.08155v2#S4.p3.1)：While increasing the number of agents and other degrees of freedom presents opportunities for tackling more complex problems, it may also introduce new safety challenges that require additional studies and careful consideration.
- 作者承认 LLM 无法完美遵循指令，需要额外异常和故障处理；通过代码或函数调用改变外部环境也存在风险。
  核验：原文支持；b00082明确承认指令遵循不完美及额外异常、故障处理需求；b00049明确指出代码执行或函数调用改变外部环境的风险。
  - [原文 Appendix C Default System Message for Assistant Agent · b00082](https://arxiv.org/html/2308.08155v2#A3.p1.1)：LLMs do not follow all the instructions perfectly, so the design of the system needs to have other mechanisms to handle the exceptions and faults.
  - [原文 Ethics statement · b00049](https://arxiv.org/html/2308.08155v2#Sx1.I1.i5.p1.1)：In particular, allowing LLM agents to make changes in external environments through code execution or function calls, such as installing packages, could be risky.
- 作者提醒相关开源系统持续演进，对它们的比较描述可能仅在写作时准确。
  核验：原文支持；b00051明确提醒相关开源系统持续演进，比较性描述可能仅在写作时准确。
  - [原文 Appendix A Related Work · b00051](https://arxiv.org/html/2308.08155v2#A1.p1.1)：Note that many of these systems are evolving open-source projects, so the remarks and statements about them may only be accurate as of the time of writing.

## 多智能体机制

- 角色与分工：基础双智能体由助手生成方案，用户代理征求人工输入或执行代码；四角色群聊区分用户代理、工程师、评论者和代码执行器。
  核验：原文支持；b00013明确双智能体的方案与反馈流程；b00146明确四角色群聊成员及各自职责。
  - [原文 2.1 Conversable Agents · b00013](https://arxiv.org/html/2308.08155v2#S2.SS1.p4.1)：the assistant agent generates a solution with the help of LLMs and passes the solution to the user proxy agent. Then, the user proxy agent solicits human inputs or executes the assistant’s code and passes the results as feedback back to the assistant.
  - [原文 A5: Dynamic Group Chat · b00146](https://arxiv.org/html/2308.08155v2#A4.SSx5.p1.1)：The four-agent group chat system comprised the following group members: a user proxy to take human inputs, an engineer to write code and fix bugs, a critic to review code and provide feedback, and a code executor for executing code.
- 协作结构：控制流由会话驱动；消息接收者和计算过程可依赖会话内容，并可注册自定义回复函数，在回复前调用其他智能体。
  核验：原文支持；b00016明确控制流依赖会话内容；b00019明确可注册自定义回复函数，并举出回复发送者前先与另一智能体会话的例子。
  - [原文 2.2 Conversation Programming · b00016](https://arxiv.org/html/2308.08155v2#S2.SS2.p1.1)：control flow is conversation-driven – the participating agents’ decisions on which agents to send messages to and the procedure of computation are functions of the inter-agent conversation.
  - [原文 2.2 Conversation Programming · b00019](https://arxiv.org/html/2308.08155v2#S2.I1.i1.p1.1)：One can also register custom reply functions to customize the behavior pattern of an agent, e.g., chatting with another agent before replying to the sender agent.
- 通信机制：智能体通过消息收发通信；群聊管理者请求选定智能体回复，并向其他智能体广播其消息。
  核验：原文支持；b00010明确消息收发通信；b00145明确管理者选择发言者、请求回复及向其他智能体广播的步骤。
  - [原文 2.1 Conversable Agents · b00010](https://arxiv.org/html/2308.08155v2#S2.SS1.p1.1)：a conversable agent is an entity with a specific role that can pass messages to send and receive information to and from other conversable agents
  - [原文 A5: Dynamic Group Chat · b00145](https://arxiv.org/html/2308.08155v2#A4.F12)：The Manager agent, which is an instance of the GroupChatManager class, performs the following three steps–select a single speaker (in this case Bob ), ask the speaker to respond, and broadcast the selected speaker’s message to all other agents
- 共享记忆：动态群聊共享上下文；OptiGuide 的 Commander 保留用户问答上下文并分享给其他智能体。跨会话持久保存机制在所给文本中未明确。
  核验：原文支持；b00037支持动态群聊共享上下文；b00133支持Commander保留用户问答上下文并分享。所给文本未明确跨会话持久保存机制，结论将这一未知限定在提供文本范围内。
  - [原文 A5: Dynamic Group Chat · b00037](https://arxiv.org/html/2308.08155v2#S3.SSx5.p1.1)：AutoGen provides native support for a dynamic group chat communication pattern, in which participating agents share the same context and converse with the others in a dynamic manner instead of following a pre-defined order.
  - [原文 Detailed Workflow. · b00133](https://arxiv.org/html/2308.08155v2#A4.SSx4.SSS0.Px1.p1.1)：This capability enables the Commander to capture and retain valuable context regarding the user’s questions and their corresponding responses. Such memory is subsequently shared across the system, empowering the other agents with context from prior user interactions and ensuring more informed and relevant responses.
- 调度方式：GroupChatManager 每轮动态选择发言者、收集回复并广播；自动回复机制在满足终止条件时停止回复。
  核验：原文支持；b00037明确管理者重复执行选人、收集回复和广播；b00019明确满足终止条件时不再自动回复。
  - [原文 A5: Dynamic Group Chat · b00037](https://arxiv.org/html/2308.08155v2#S3.SSx5.p1.1)：the GroupChatManager class serves as the conductor of conversation among agents and repeats the following three steps: dynamically selecting a speaker, collecting responses from the selected speaker, and broadcasting the message
  - [原文 2.2 Conversation Programming · b00019](https://arxiv.org/html/2308.08155v2#S2.I1.i1.p1.1)：Once an agent receives a message from another agent, it automatically invokes generate_reply and sends the reply back to the sender unless a termination condition is satisfied.

## 系统分析与启发（推测）

- 系统分析：b00020描述依据错误反馈重新生成代码，b00078将发现和升级技能列为未来工作；这些证据不足以认定已实现跨任务持续自进化。
- 系统分析：b00036的代码安全消融包含单智能体基线，但所给文本未交代等调用、等 token 或等成本预算，因此尚不能隔离角色分离与计算投入的贡献。
- 系统分析：b00148、b00150显示角色扮演群聊相对 task-based 群聊成功数更多、调用数更多、终止失败相同；不能将其概括为各项指标全面占优。

## 待研究问题（系统分析）

- 系统分析：匹配模型、工具权限和总推理预算后，多智能体相对单智能体的收益是否仍然成立？
- 系统分析：如何解释 b00146 正文与 b00150 表格在调用数和终止失败数上的不一致？
- 系统分析：b00139中单专家、10题研究的解题耗时收益，能否推广到更多用户和应用环境？

## 缺失信息

- 所给原文块未明确说明等预算单智能体对照；equal_budget_single_agent_comparison 置 null，不能将已有安全消融视为等预算比较。
- 所给原文块未列出120题数学评估的完整成绩、交互检索完整系统的总体 F1 与 Recall，以及部分基线的完整运行配置；不能据此认定全文未报告。
- 代码安全 F1 提升8%和35%的绝对得分及增幅口径在所给文本中未明确。
- MiniWobChat 比 RCI 低3.6%的表述未明确区分相对下降与百分点差；不据此推算 RCI 成功率。MiniWobChat 基础模型在所给文本中未明确，置 null。
- 多项实验的随机种子、重复运行协议、统计不确定性、token 预算、费用和延迟在所给文本中未充分交代；未知资源条件置 null。
- 动态群聊正文与表格的差异未获解释；完整任务列表和完整提示在所给原文块中未见。
- 所给文本未明确交代跨会话持久记忆、模型参数更新、跨任务技能更新规则、更新保留与独立留出验证；不足以提取自进化机制，self_evolution 置 null。
- OptiGuide 五应用2000题的题量分配与节省比率完整计算协议，以及用户研究对照的具体模型版本，在所给文本中未明确。
- 未提供前作原文，无法独立核验相关工作描述、首创性或优先权。
- 本卡片依据本次提供的原文块修订，未复现实验。

## 阅读范围

读取 6 / 6 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

AutoGen is an open-source framework that allows developers to build LLM applications via multiple agents that can converse with each other to accomplish tasks. AutoGen agents are customizable, conversable, and can operate in various modes that employ combinations of LLMs, human inputs, and tools. Using AutoGen, developers can also flexibly define agent interaction behaviors. Both natural language and computer code can be used to program flexible conversation patterns for different applications. AutoGen serves as a generic infrastructure to build diverse applications of various complexities and LLM capacities. Empirical studies demonstrate the effectiveness of the framework in many example applications, with domains ranging from mathematics, coding, question answering, operations research, online decision-making, entertainment, etc.
