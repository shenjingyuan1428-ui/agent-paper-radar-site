# Reflexion: Language Agents with Verbal Reinforcement Learning

作者：Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao
原文：https://arxiv.org/abs/2303.11366v4
首次提交：2023-03-20T18:08:50Z · 版本更新：2023-10-10T05:21:45Z
版本：v4 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- Reflexion 针对语言智能体难以高效从试错中学习的问题，以语言反思和跨尝试记忆改进决策，无需更新权重；作者报告 HumanEval 达到 91% pass@1。
  核验：原文支持；b00001明确说明试错学习动机、语言反思、跨尝试情景记忆及不更新权重，并报告HumanEval的91% pass@1；结论保留了作者报告的性质。
  - [原文 Report GitHub Issue · b00001](https://arxiv.org/html/2303.11366v4#abstract1.1)：We propose Reflexion , a novel framework to reinforce language agents not by updating weights, but instead through linguistic feedback. Concretely, Reflexion agents verbally reflect on task feedback signals, then maintain their own reflective text in an episodic memory buffer to induce better decision-making in subsequent trials.
  - [原文 Report GitHub Issue · b00001](https://arxiv.org/html/2303.11366v4#abstract1.1)：For example, Reflexion achieves a 91% pass@1 accuracy on the HumanEval coding benchmark, surpassing the previous state-of-the-art GPT-4 that achieves 80%.

## 研究问题

- 作者指出，传统强化学习需要大量训练样本和昂贵的微调，使语言智能体难以快速、高效地从试错中学习。
  核验：原文支持；b00001直接将快速高效试错学习的困难与传统强化学习所需的大量训练样本和昂贵微调联系起来。
  - [原文 Report GitHub Issue · b00001](https://arxiv.org/html/2303.11366v4#abstract1.1)：However, it remains challenging for these language agents to quickly and efficiently learn from trial-and-error as traditional reinforcement learning methods require extensive training samples and expensive model fine-tuning.
- 有效反思需要正确归因错误并生成可执行的改进建议。HotPotQA 中，作者报告温度为 0.7 时，三种无反思基线的后续重试均未解决首轮失败题。
  核验：原文支持；b00004明确提出错误归因和可执行改进建议的要求；b00034报告三种基线在温度0.7下均未通过后续尝试解决首轮失败题。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2303.11366v4#S1.p3.1)：Generating useful reflective feedback is challenging since it requires a good understanding of where the model made mistakes (i.e. the credit assignment problem [ 25 ] ) as well as the ability to generate a summary containing actionable insights for improvement.
  - [原文 Results · b00034](https://arxiv.org/html/2303.11366v4#S4.SS2.SSS0.Px1.p1.1)：Furthermore, ReAct-only, CoT-only, and CoT (GT)-only implementations fail to probabilistically improve on any tasks, meaning that no failed tasks from the first trial from any of the baseline approaches were able to be solved in subsequent trials using a temperature of 0.7

## 方法怎样工作

- Actor 生成文本与动作，Evaluator 对轨迹评分；评价方式包括问答精确匹配、任务启发式和 LLM 评价。
  核验：原文支持；b00019说明Actor负责生成文本与动作；b00021明确Evaluator输入轨迹并计算奖励，且列出精确匹配、任务启发式及LLM评价。
  - [原文 3 Reflexion: reinforcement via verbal reflection · b00019](https://arxiv.org/html/2303.11366v4#S3.p1.1)：an Actor , denoted as M_{a} , which generates text and actions; an Evaluator model, represented by M_{e} , that scores the outputs produced by M_{a}
  - [原文 Evaluator · b00021](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px2.p1.1)：For reasoning tasks, we explore reward functions based on exact match (EM) grading, ensuring that the generated output aligns closely with the expected solution. In decision-making tasks, we employ pre-defined heuristic functions that are tailored to specific evaluation criteria.
  - [原文 Evaluator · b00021](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px2.p1.1)：Additionally, we experiment with using a different instantiation of an LLM itself as an Evaluator, generating rewards for decision-making and programming tasks.
- Self-Reflection 根据奖励、当前轨迹和已有记忆生成语言反馈并存入记忆；Actor 在后续推理中使用轨迹历史与反思。
  核验：原文支持；b00022明确反思输入为奖励、当前轨迹和已有记忆，输出反馈存入记忆；b00023说明Actor使用轨迹历史与长期反思记忆。
  - [原文 Self-reflection · b00022](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px3.p1.1)：Given a sparse reward signal, such as a binary success status (success/fail), the current trajectory, and its persistent memory mem , the self-reflection model generates nuanced and specific feedback. This feedback, which is more informative than scalar rewards, is then stored in the agent’s memory ( mem ).
  - [原文 Memory · b00023](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px4.p1.1)：In the RL setup, the trajectory history serves as the short-term memory while outputs from the Self-Reflection model are stored in long-term memory.
  - [原文 Memory · b00023](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px4.p1.1)：At inference time, the Actor conditions its decisions on short and long-term memory
- 编程流程以 CoT 生成测试，经 AST 检查过滤语法无效测试，测试集最多含 6 个测试；后续代码生成接收先前实现、测试反馈和反思，记忆上限为 1 条经验。
  核验：原文支持；b00037逐项支持CoT测试生成、AST语法过滤、最多6个测试和1条经验的记忆上限；b00082支持后续生成使用先前实现、测试反馈与反思。
  - [原文 4.3 Programming · b00037](https://arxiv.org/html/2303.11366v4#S4.SS3.p2.1)：To generate a test suite, we use Chain-of-Thought prompting [ 26 ] to produce diverse, extensive tests with corresponding natural language descriptions.
  - [原文 4.3 Programming · b00037](https://arxiv.org/html/2303.11366v4#S4.SS3.p2.1)：Then, we filter for syntactically valid test statements by attempting to construct a valid abstract syntax tree (AST) for each proposed test.
  - [原文 4.3 Programming · b00037](https://arxiv.org/html/2303.11366v4#S4.SS3.p2.1)：We set n to a maximum of 6 unit tests.
  - [原文 C.2 Reflexion Actor instruction · b00082](https://arxiv.org/html/2303.11366v4#A3.SS2.p2.1)：Reflexion Actor generations follow the form: (Instruction) (Function implementation) (Unit test feedback) (Self-reflection) (Instruction for next function implmentation)
  - [原文 4.3 Programming · b00037](https://arxiv.org/html/2303.11366v4#S4.SS3.p2.1)：Aside from the unit test suite component, the setup for the learning loop for a Reflexion programming agent is identical to the reasoning and decision-making agents with a max memory limit of 1 experience.

## 作者声称的贡献

- 作者自述提出 Reflexion，通过语言反馈和情景记忆强化智能体，而非更新模型权重；此处仅记录作者主张。
  核验：原文支持；b00001直接包含该框架的作者提议及其机制；结论明确限定为作者主张，没有认定创新性已经独立确认。
  - [原文 Report GitHub Issue · b00001](https://arxiv.org/html/2303.11366v4#abstract1.1)：We propose Reflexion , a novel framework to reinforce language agents not by updating weights, but instead through linguistic feedback. Concretely, Reflexion agents verbally reflect on task feedback signals, then maintain their own reflective text in an episodic memory buffer to induce better decision-making in subsequent trials.
- 作者自述引入 LeetcodeHardGym，包含 40 道 Leetcode hard 题，支持 19 种编程语言。
  核验：原文支持；b00010明确自述引入LeetcodeHardGym，包含40道hard级Leetcode题及19种编程语言。
  - [原文 1 Introduction · b00010](https://arxiv.org/html/2303.11366v4#S1.I1.i3.p1.1)：We introduce LeetcodeHardGym, a code-generation RL gym environment consisting of 40 challenging Leetcode questions (‘hard-level‘) in 19 programming languages.

## 本文报告的方法比较

- 表 1 中 GPT-4→Reflexion 的 pass@1：HumanEval Python 80.1%→91.0%、Rust 60.0%→68.0%；MBPP Python 80.1%→77.1%、Rust 70.9%→75.4%；Leetcode Hard Python 7.5%→15.0%。
  核验：原文支持；b00038的表头及五行数据支持全部比较对象、语言、pass@1数值与变化方向，包括MBPP Python的下降。
  - [原文 Results · b00038](https://arxiv.org/html/2303.11366v4#S4.T1.3)：HumanEval (PY) 65.8 (CodeT [ 5 ] + GPT-3.5) 80.1 (GPT-4) 91.0 HumanEval (RS) – 60.0 (GPT-4) 68.0 MBPP (PY) 67.7 (CodeT [ 5 ] + Codex [ 6 ] ) 80.1 (GPT-4) 77.1 MBPP (RS) – 70.9 (GPT-4) 75.4 Leetcode Hard (PY) – 7.5 (GPT-4) 15.0
- HotPotQA 消融以提供真实上下文的 CoT(GT) 为基线，先加入最近轨迹作为情景记忆，再加入反思；作者报告反思额外提高 8 个百分点。
  核验：原文支持；b00035明确CoT(GT)使用真实上下文，消融依次加入最近轨迹和自反思，并报告自反思相对情景记忆额外带来8个百分点提升。
  - [原文 Analysis · b00035](https://arxiv.org/html/2303.11366v4#S4.SS2.SSS0.Px2.p1.1)：We perform an ablation experiment to isolate the advantage of the self-reflective step for reasoning using CoT (GT) as the baseline approach 4 .
  - [原文 Analysis · b00035](https://arxiv.org/html/2303.11366v4#S4.SS2.SSS0.Px2.p1.1)：Next, we add an element of episodic memory (EPM) by including the most recent trajectory. For the Reflexion agent, we implement the standard self-reflection step as a final pass.
  - [原文 Analysis · b00035](https://arxiv.org/html/2303.11366v4#S4.SS2.SSS0.Px2.p1.1)：4 shows that self-reflection improves learning by an 8% absolute boost over the episodic memory learning advantage.
- HumanEval Rust 最难 50 题的消融中，基础模型、仅反思、仅测试生成、完整 Reflexion 的 pass@1 分别为 0.60、0.52、0.60、0.68。
  核验：原文支持；b00044的组件开关和四项数值与结论一致；b00045将实验限定为GPT-4及HumanEval Rust最难50题。
  - [原文 Ablation study · b00044](https://arxiv.org/html/2303.11366v4#S4.T3.3)：Base model False False 0.60 Test generation omission False True 0.52 Self-reflection omission True False 0.60 Reflexion True True 0.68
  - [原文 Ablation study · b00045](https://arxiv.org/html/2303.11366v4#S4.T3)：Table 3 : Pass@1 accuracy for various compromised approaches on the Reflexion approach using GPT-4 as the base model on HumanEval Rust - 50 hardest problems

## 实验证据与条件

任务：ALFWorld 六类任务，134 个环境
基础模型：GPT-3，ReAct
比较基线：ReAct
指标：累计完成任务数
结果：ReAct＋Reflexion 完成 130/134；ReAct 的性能提升在第 6—7 次尝试间停止。
资源条件：12 次连续尝试；两个领域内示例轨迹；保留最近 3 条反思；相同动作及响应重复超过 3 轮或动作数超过 30 时，由启发式触发反思。
- ALFWorld 中，使用简单启发式检测幻觉与低效规划的 ReAct＋Reflexion 完成 130/134 个任务；作者报告其在 12 次尝试中继续改善。
  核验：原文支持；b00026—b00029支持134个环境、六类任务、GPT-3与ReAct、两个示例、最近3条反思及启发式阈值；b00029明确报告130/134、12次连续尝试和基线在第6—7次间停止改善。
  - [原文 Results · b00029](https://arxiv.org/html/2303.11366v4#S4.SS1.SSS0.Px1.p1.1)：ReAct + Reflexion significantly outperforms ReAct by completing 130 out of 134 tasks using the simple heuristic to detect hallucinations and inefficient planning. Further, ReAct + Reflexion learns to solve additional tasks by learning in 12 consecutive trials.
  - [原文 Results · b00029](https://arxiv.org/html/2303.11366v4#S4.SS1.SSS0.Px1.p1.1)：In the ReAct-only approach, we see that performance increase halts between trials 6 and 7.
  - [原文 4.1 Sequential decision making: ALFWorld · b00026](https://arxiv.org/html/2303.11366v4#S4.SS1.p1.1)：we run the agent in 134 AlfWorld environments across six different tasks
  - [原文 4.1 Sequential decision making: ALFWorld · b00026](https://arxiv.org/html/2303.11366v4#S4.SS1.p1.1)：The heuristic is simple: if the agent executes the same action and receives the same response for more than 3 cycles, or if the number of actions taken in the current environment exceeds 30 (inefficient planning), we self-reflect.
  - [原文 4.1 Sequential decision making: ALFWorld · b00027](https://arxiv.org/html/2303.11366v4#S4.SS1.p2.1)：To avoid syntactic errors, we provide two domain-specific few-shot trajectories to the agent. We use the same few-shot trajectory examples as Yao et al., [30] with GPT-3 for the LLM.
  - [原文 4.1 Sequential decision making: ALFWorld · b00026](https://arxiv.org/html/2303.11366v4#S4.SS1.p1.1)：To avoid very long prompt windows that may exceed the maximum limit, we truncate the agent’s memory to the last 3 self-reflections (experiences).
任务：100 道 HotPotQA 问答
基础模型：text-davinci-003、gpt-3.5-turbo、gpt-4
比较基线：各模型的 CoT(GT) 与 ReAct
指标：表 5 标为 pass@1 accuracy
结果：按上述模型顺序，CoT(GT)：0.60→0.77、0.57→0.71、0.68→0.80；ReAct：0.30→0.55、0.26→0.38、0.39→0.51。
资源条件：CoT 6-shot、ReAct 2-shot、反思 2-shot；记忆容量为 3 条经验。
- 表 5 报告三种模型在 100 道 HotPotQA 上加入 Reflexion 后的结果，覆盖 CoT(GT) 和 ReAct。
  核验：原文支持；b00056逐项支持三种模型在CoT(GT)与ReAct下的六组结果；b00057标明100道HotPotQA及pass@1，b00031—b00032支持提示示例数和3条经验的记忆容量。
  - [原文 Appendix A Evaluation with additional models · b00056](https://arxiv.org/html/2303.11366v4#A1.T5.3)：CoT (GT) + text-davinci-003 0.60 0.77 CoT (GT) + gpt-3.5-turbo 0.57 0.71 CoT (GT) + gpt-4 0.68 0.80 ReAct + text-davinci-003 0.30 0.55 ReAct + gpt-3.5-turbo 0.26 0.38 ReAct + gpt-4 0.39 0.51
  - [原文 Appendix A Evaluation with additional models · b00057](https://arxiv.org/html/2303.11366v4#A1.T5)：Table 5 : Pass@1 accuracy on 100 HotPotQA using various models.
  - [原文 4.2 Reasoning: HotpotQA · b00031](https://arxiv.org/html/2303.11366v4#S4.SS2.p1.1)：For CoT implementations, we use 6-shot prompting; for ReAct, we use 2-shot prompting, and for self-reflection, we use 2-shot prompting.
  - [原文 4.2 Reasoning: HotpotQA · b00032](https://arxiv.org/html/2303.11366v4#S4.SS2.p2.1)：After each trial, the self-reflection loop is employed to amplify the binary signal, similar to the decision-making setup 4.1 in AlfWorld with a memory size of 3 experiences.
任务：HumanEval、MBPP 的 Python/Rust 代码生成，以及 Leetcode Hard Python
基础模型：GPT-4
比较基线：GPT-4 单次代码生成
指标：pass@1
结果：HumanEval Python 80.1%→91.0%、Rust 60.0%→68.0%；MBPP Python 80.1%→77.1%、Rust 70.9%→75.4%；Leetcode Hard Python 7.5%→15.0%。
资源条件：零样本代码生成；测试集最多 6 个测试；反思记忆上限为 1 条经验。
- 编程主实验的结果包含提升和退化：HumanEval Python 达到 91.0%，MBPP Python 从 80.1% 降至 77.1%。
  核验：原文支持；b00038支持全部编程结果及MBPP Python的退化；b00039说明单次生成基线和零样本代码生成，b00037支持最多6个测试及1条经验的记忆上限。
  - [原文 Results · b00038](https://arxiv.org/html/2303.11366v4#S4.T1.3)：HumanEval (PY) 65.8 (CodeT [ 5 ] + GPT-3.5) 80.1 (GPT-4) 91.0 HumanEval (RS) – 60.0 (GPT-4) 68.0 MBPP (PY) 67.7 (CodeT [ 5 ] + Codex [ 6 ] ) 80.1 (GPT-4) 77.1 MBPP (RS) – 70.9 (GPT-4) 75.4 Leetcode Hard (PY) – 7.5 (GPT-4) 15.0
  - [原文 Results · b00039](https://arxiv.org/html/2303.11366v4#S4.T1)：Table 1 : Pass@1 accuracy for various model-strategy-language combinations. The base strategy is a single code generation sample. All instruction-based models follow zero-shot code generation.
  - [原文 4.3 Programming · b00037](https://arxiv.org/html/2303.11366v4#S4.SS3.p2.1)：We set n to a maximum of 6 unit tests.
  - [原文 4.3 Programming · b00037](https://arxiv.org/html/2303.11366v4#S4.SS3.p2.1)：Aside from the unit test suite component, the setup for the learning loop for a Reflexion programming agent is identical to the reasoning and decision-making agents with a max memory limit of 1 experience.
任务：HumanEval Rust 最难 50 题
基础模型：GPT-4
比较基线：基础模型、移除测试生成、移除自反思
指标：pass@1
结果：基础模型 0.60；仅反思 0.52；仅测试生成 0.60；完整 Reflexion 0.68。
资源条件：50 道题。
- 编程组件消融中，完整 Reflexion 的 pass@1 高于移除测试生成或移除反思的版本。
  核验：原文支持；b00044显示完整Reflexion为0.68，高于移除测试生成的0.52及移除自反思的0.60；b00045支持GPT-4与HumanEval Rust最难50题的范围。
  - [原文 Ablation study · b00044](https://arxiv.org/html/2303.11366v4#S4.T3.3)：Base model False False 0.60 Test generation omission False True 0.52 Self-reflection omission True False 0.60 Reflexion True True 0.68
  - [原文 Ablation study · b00045](https://arxiv.org/html/2303.11366v4#S4.T3)：Table 3 : Pass@1 accuracy for various compromised approaches on the Reflexion approach using GPT-4 as the base model on HumanEval Rust - 50 hardest problems
任务：HumanEval Python
基础模型：starchat-beta
比较基线：starchat-beta 基线方法
指标：8 次试验的平均 pass@1 及标准差
结果：两者均值均为 0.26；基线标准差 0.00481，Reflexion 标准差 0.00305。
资源条件：8 次试验。
- starchat-beta 的 HumanEval Python 实验中，按表中报告精度，Reflexion 与基线的平均 pass@1 均为 0.26。
  核验：原文支持；b00054报告8次试验平均值均为0.26，标准差分别为0.00481和0.00305；b00055确认模型与任务。结论正确限定为表中报告精度。
  - [原文 Appendix A Evaluation with additional models · b00054](https://arxiv.org/html/2303.11366v4#A1.T4.3)：Approach Pass@1 accuracy (avg over 8 trials) Pass@1 accuracy (std) Baseline 0.26 0.00481 Reflexion 0.26 0.00305
  - [原文 Appendix A Evaluation with additional models · b00055](https://arxiv.org/html/2303.11366v4#A1.T4)：Table 4 : Pass@1 accuracy on HumanEval Python using starchat-beta [ 13 ] .
任务：WebShop，100 个购物请求
基础模型：未报告 / 未提取
比较基线：ReAct
指标：未报告 / 未提取
结果：作者称 ReAct＋Reflexion 未显著优于 ReAct。
资源条件：two-shot ReAct＋Reflexion；100 个环境；4 次尝试后终止。
- WebShop 实验因未见改善而在 4 次尝试后终止；图注称 ReAct＋Reflexion 未显著优于 ReAct。
  核验：原文支持；b00076明确two-shot、100个环境及因未见改善而在4次尝试后终止；b00077明确作者所称未显著优于ReAct，没有提供可独立核验的显著性检验信息。
  - [原文 B.1 WebShop Limitation · b00076](https://arxiv.org/html/2303.11366v4#A2.SS1.p1.1)：We test a two-shot ReAct + Reflexion agent in 100 environments. However, after only four trials, we terminate the runs as the agent does not show signs of improvement 6 .
  - [原文 B.1 WebShop Limitation · b00077](https://arxiv.org/html/2303.11366v4#A2.F6)：Figure 6 : Reflexion vs React performance on WebShop across 100 customer shopping requests. ReAct + Reflexion fails to significantly outperform ReAct.

## 原文支持的局限性

- 作者承认，方法依赖 LLM 自我评价能力或启发式，没有形式化成功保证，且仍可能陷入非最优局部极小值。
  核验：原文支持；b00005明确承认依赖自我评价或启发式且没有形式化成功保证；b00048明确指出仍可能陷入非最优局部极小值。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2303.11366v4#S1.p4.1)：At the same time, it does have the disadvantages of relying on the power of the LLM’s self-evaluation capabilities (or heuristics) and not having a formal guarantee for success.
  - [原文 5 Limitations · b00048](https://arxiv.org/html/2303.11366v4#S5.p1.1)：Policy optimization is a powerful approach to improve action choice through experience, but it may still succumb to non-optimal local minima solutions.
- 内部测试全部通过但实现错误时，智能体会提前提交。作者报告该条件下的错误概率：MBPP Python 为 16.3%，HumanEval Python 为 1.4%。
  核验：原文支持；b00043明确内部测试全部通过但实现错误会导致提前提交，并将所报概率定义为通过内部测试条件下提交失败的概率；16.3%与1.4%及其任务对应正确。
  - [原文 Analysis · b00043](https://arxiv.org/html/2303.11366v4#S4.SS3.SSS0.Px2.p1.1)：if an invalid test suite returns a false positive completion (all internal test cases pass but the implementation is incorrect), the agent will prematurely report an invalid submission.
  - [原文 Analysis · b00043](https://arxiv.org/html/2303.11366v4#S4.SS3.SSS0.Px2.p1.1)：That is, the probability that a submission will fail given that it passes all unit tests.
  - [原文 Analysis · b00043](https://arxiv.org/html/2303.11366v4#S4.SS3.SSS0.Px2.p1.1)：However, the false positive test execution rate for MBPP Python is 16.3% while the rate for HumanEval Python is a mere 1.4%
- 作者在 WebShop 中观察到失败后的反思缺乏帮助，并据此提出方法难以处理高度依赖多样性与探索的任务；该解释应限定于其报告的实验。
  核验：原文支持；b00076同时报告失败后的反思缺乏帮助，并提出关于多样性与探索任务的解释；结论将其作为作者解释并限制于所报告实验，没有认定为普遍定理。
  - [原文 B.1 WebShop Limitation · b00076](https://arxiv.org/html/2303.11366v4#A2.SS1.p1.1)：Further, the agent does not generate helpful, intuitive self-reflections after failed attempts.
  - [原文 B.1 WebShop Limitation · b00076](https://arxiv.org/html/2303.11366v4#A2.SS1.p1.1)：We conclude that Reflexion is unable to solve tasks that require a significant amount of diversity and exploration.

## 多智能体机制

- 角色与分工：框架包含 Actor、Evaluator 和 Self-Reflection 三个模型角色，分别负责生成、评分和语言反思；此处按功能模块记录。
  核验：原文支持；b00019明确列出Actor、Evaluator及Self-Reflection三个角色及生成、评分和语言反思功能；按功能模块记录没有增加独立模型训练等额外主张。
  - [原文 3 Reflexion: reinforcement via verbal reflection · b00019](https://arxiv.org/html/2303.11366v4#S3.p1.1)：an Actor , denoted as M_{a} , which generates text and actions; an Evaluator model, represented by M_{e} , that scores the outputs produced by M_{a} ; and a Self-Reflection model, denoted as M_{sr} , which generates verbal reinforcement cues to assist the Actor in self-improvement.
- 协作结构：三个模型通过反复尝试构成闭环，直到 Evaluator 判定当前轨迹正确。
  核验：原文支持；b00024直接描述三个模型通过尝试形成循环，直到Evaluator判定当前轨迹正确；结论没有将该判定扩大为客观正确性保证。
  - [原文 The Reflexion process · b00024](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px5.p1.1)：The Actor, Evaluator, and Self-Reflection models work together through trials in a loop until the Evaluator deems \tau_{t} to be correct.
- 通信机制：功能模块间的信息流包括奖励、当前轨迹、已有记忆和新生成的反思文本。
  核验：原文支持；b00022明确反思模型接收奖励、当前轨迹和已有记忆，并将生成的反馈文本写入记忆，支持所述信息流。
  - [原文 Self-reflection · b00022](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px3.p1.1)：Given a sparse reward signal, such as a binary success status (success/fail), the current trajectory, and its persistent memory mem , the self-reflection model generates nuanced and specific feedback. This feedback, which is more informative than scalar rewards, is then stored in the agent’s memory ( mem ).
- 共享记忆：功能层面的共享载体是反思记忆：反思输出存入长期记忆，Actor 在推理时读取。
  核验：原文支持；b00023明确反思输出存入长期记忆，Actor在推理时以短期和长期记忆为决策条件，支持所述功能层面的共享载体。
  - [原文 Memory · b00023](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px4.p1.1)：At inference time, the Actor conditions its decisions on short and long-term memory
  - [原文 Memory · b00023](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px4.p1.1)：In the RL setup, the trajectory history serves as the short-term memory while outputs from the Self-Reflection model are stored in long-term memory.
- 调度方式：采用按尝试推进的循环；ALFWorld 中，反思后更新记忆、重置环境并开始下一次尝试。
  核验：原文支持；b00026直接说明ALFWorld中的反思、更新记忆、重置环境和开始新尝试这一流程。
  - [原文 4.1 Sequential decision making: ALFWorld · b00026](https://arxiv.org/html/2303.11366v4#S4.SS1.p1.1)：In the Reflexion runs, the agent uses self-reflection to find its mistake, update its memory, reset the environment, and start a new trial.

## 自进化机制

- 改变对象：更新对象是反思文本及情景记忆，借此影响后续决策；模型权重不更新。
  核验：原文支持；b00001明确使用语言反馈及情景记忆中的反思文本影响后续尝试，而不更新模型权重。
  - [原文 Report GitHub Issue · b00001](https://arxiv.org/html/2303.11366v4#abstract1.1)：We propose Reflexion , a novel framework to reinforce language agents not by updating weights, but instead through linguistic feedback. Concretely, Reflexion agents verbally reflect on task feedback signals, then maintain their own reflective text in an episodic memory buffer to induce better decision-making in subsequent trials.
- 反馈来源：评价信号可来自精确匹配、启发式或 LLM；反思模型结合奖励、当前轨迹及已有记忆生成具体反馈。
  核验：原文支持；b00021支持精确匹配、启发式和LLM三类评价方式及其任务范围；b00022支持结合奖励、当前轨迹和已有记忆生成具体反馈。
  - [原文 Evaluator · b00021](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px2.p1.1)：For reasoning tasks, we explore reward functions based on exact match (EM) grading, ensuring that the generated output aligns closely with the expected solution. In decision-making tasks, we employ pre-defined heuristic functions that are tailored to specific evaluation criteria.
  - [原文 Evaluator · b00021](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px2.p1.1)：Additionally, we experiment with using a different instantiation of an LLM itself as an Evaluator, generating rewards for decision-making and programming tasks.
  - [原文 Self-reflection · b00022](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px3.p1.1)：Given a sparse reward signal, such as a binary success status (success/fail), the current trajectory, and its persistent memory mem , the self-reflection model generates nuanced and specific feedback.
- 更新方式：将每次尝试产生的反思追加至有容量上限的记忆，再作为 Actor 推理的上下文。
  核验：原文支持；b00024明确每次尝试后追加反思并限制记忆容量；b00023明确Actor在推理时使用这些记忆作为决策上下文。
  - [原文 The Reflexion process · b00024](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px5.p1.1)：After each trial t , sr_{t} , is appended mem . In practice, we bound mem by a maximum number of stored experiences, \Omega (usually set to 1-3) to adhere to max context LLM limitations.
  - [原文 Memory · b00023](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px4.p1.1)：At inference time, the Actor conditions its decisions on short and long-term memory
- 发生阶段：改进发生在推理期间的任务尝试之间；ALFWorld 中更新记忆后重置环境并重新尝试。
  核验：原文支持；b00023将记忆使用定位于推理时，b00026说明ALFWorld在尝试之间更新记忆、重置环境并重试；这里支持改进机制的发生阶段，不构成每次重试均提高表现的保证。
  - [原文 Memory · b00023](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px4.p1.1)：At inference time, the Actor conditions its decisions on short and long-term memory
  - [原文 4.1 Sequential decision making: ALFWorld · b00026](https://arxiv.org/html/2303.11366v4#S4.SS1.p1.1)：In the Reflexion runs, the agent uses self-reflection to find its mistake, update its memory, reset the environment, and start a new trial.
- 保留范围：明确支持任务内跨尝试保留，通常最多保存 1—3 条经验；ALFWorld 保留最近 3 条，编程上限为 1 条。
  核验：原文支持；b00024支持跨尝试保存反思及通常1—3条经验的容量；b00026明确ALFWorld保留最近3条，b00037明确编程上限为1条。结论未扩大为跨任务迁移。
  - [原文 The Reflexion process · b00024](https://arxiv.org/html/2303.11366v4#S3.SS0.SSS0.Px5.p1.1)：After each trial t , sr_{t} , is appended mem . In practice, we bound mem by a maximum number of stored experiences, \Omega (usually set to 1-3) to adhere to max context LLM limitations.
  - [原文 4.1 Sequential decision making: ALFWorld · b00026](https://arxiv.org/html/2303.11366v4#S4.SS1.p1.1)：To avoid very long prompt windows that may exceed the maximum limit, we truncate the agent’s memory to the last 3 self-reflections (experiences).
  - [原文 4.3 Programming · b00037](https://arxiv.org/html/2303.11366v4#S4.SS3.p2.1)：Aside from the unit test suite component, the setup for the learning loop for a Reflexion programming agent is identical to the reasoning and decision-making agents with a max memory limit of 1 experience.

## 系统分析与启发（推测）

- 系统分析：三个功能角色及组件消融不足以证明独立多智能体协作的额外收益；需区分模块化反馈闭环与自治智能体协作（见 c021、c011）。
- 系统分析：MBPP Python 退化、starchat-beta 报告均值不变，以及 WebShop 未见改善，提示效果具有任务和模型依赖性（见 c014、c016、c017）。
- 系统分析：表中的 pass@1 不应被解释为整个 Reflexion 流程仅调用一次模型；该方法包含跨尝试反馈与修订（见 c022、c028）。

## 待研究问题（系统分析）

- 系统分析：若匹配总调用次数、生成 token、运行时间及测试执行成本，Reflexion 相对单纯重试或其他修订流程的优势还有多少？
- 系统分析：任务内反思能否迁移到未参与更新的新任务，并在跨任务持续保留时避免错误经验累积？
- 系统分析：如何提高内部测试的错误检出能力，并减少错误停止信号或缺乏停止信号造成的有害修改？

## 缺失信息

- 提供原文块未明确三个角色是否共享底层模型或参数、是否作为独立自治智能体部署，以及独立进程间的通信和共享存储实现；未发现等预算单智能体比较。
- 提供原文块未明确跨任务持续记忆、长期更新或更新后系统在独立留出任务上的验证设置，因此 held_out_validation 为 null。
- 提供的编程相关段落未明确最大尝试次数、完整采样配置、总调用次数、token、时间和费用；内部测试与最终判分测试的完整隔离流程也未明确。
- HotPotQA 的 100 道题如何抽样未明确；表 5 各组实验的完整尝试预算未明确。表注使用 pass@1 名称，但不能据此推断仅调用一次模型。
- 除 starchat-beta 表中的 8 次试验与标准差外，所列结果的独立重复次数、随机种子、误差区间和显著性检验细节未在提供原文块中发现。
- WebShop 的基础模型、具体评价指标和性能数值未在提供原文块中明确，因此相应字段为 null；“未显著优于”仅保留为作者表述。
- HumanEval Python 基线在 b00043 写为 82%、b00038 写为 80.1%、b00040 写为 0.80，差异未获解释；HotPotQA 正文 b00034 的 14% 提升与表 5 各组结果的对应关系也未明确。
- 草稿关于 b00085、b00086 的消融模板及 b00124、b00125 的推理示例分析，缺少本次提供的对应原文块，已删除，无法核验。
- 未阅读被引用前作，不能独立确认创新优先权或最优排名；本卡片仅依据本次提供的原文块，未复现实验。

## 阅读范围

读取 3 / 3 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Large language models (LLMs) have been increasingly used to interact with external environments (e.g., games, compilers, APIs) as goal-driven agents. However, it remains challenging for these language agents to quickly and efficiently learn from trial-and-error as traditional reinforcement learning methods require extensive training samples and expensive model fine-tuning. We propose Reflexion, a novel framework to reinforce language agents not by updating weights, but instead through linguistic feedback. Concretely, Reflexion agents verbally reflect on task feedback signals, then maintain their own reflective text in an episodic memory buffer to induce better decision-making in subsequent trials. Reflexion is flexible enough to incorporate various types (scalar values or free-form language) and sources (external or internally simulated) of feedback signals, and obtains significant improvements over a baseline agent across diverse tasks (sequential decision-making, coding, language reasoning). For example, Reflexion achieves a 91% pass@1 accuracy on the HumanEval coding benchmark, surpassing the previous state-of-the-art GPT-4 that achieves 80%. We also conduct ablation and analysis studies using different feedback signals, feedback incorporation methods, and agent types, and provide insights into how they affect performance.
