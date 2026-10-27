# Federation over Harness

作者：Dixi Yao, Tahseen Rabbani, Tian Li
原文：https://arxiv.org/abs/2610.24007v1
首次提交：2026-10-15T19:34:45Z · 版本更新：2026-10-15T19:34:45Z
版本：v1 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- FoH 针对经验共享智能体依赖人工提示与工作流的问题，以客户端反思驱动服务器和客户端 harness 共同演化；作者报告相对固定 harness 单智能体及 harness 自演化基线分别提升 53.57% 和 29.76%。
  核验：原文支持；b00003—b00006 支持人工设计依赖、客户端反思驱动两侧 harness 演化及两项提升数字；结论明确将数字归于作者报告。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2610.24007v1#S1.p3.1)：To this end, we propose Federation over Harness (FoH) , a framework for federated harness evolution driven solely by agent-generated reflections.
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.24007v1#S1.p5.1)：FoH outperforms the SOTA single-agent harness by 53.57%, non-federated harness evolution by 29.76%, and fixed-harness federated self-evolution by 22.38%, while reducing task-completion tokens by 34.09%.

## 研究问题

- 研究问题是如何在不使用外部任务表现监督的条件下，让联邦智能体的经验共享流程及演化策略本身持续更新；人类通过文本指南限定搜索空间。
  核验：原文支持；b00009、b00048 支持无外部任务表现监督、演化策略可更新及文本指南限定搜索空间。
  - [原文 6 Conclusion · b00048](https://arxiv.org/html/2610.24007v1#S6.p1.1)：We propose Federation over Harness (FoH) , advancing federated agents in two directions: enabling self-evolution without external validation and making the evolution strategy itself evolvable, with humans defining the search space through lightweight textual guides.
- 按本文描述，RHO 的演化算法及 rollout、重求解次数预先固定，FoT 仅更新洞见库；作者希望扩大可演化范围。这些前作描述未经前作全文独立核验。
  核验：原文支持；b00008、b00022 分别支持本文对 RHO 固定演化流程和 FoT 仅更新洞见库的描述；结论没有将这些描述视为经前作独立核验的事实。
  - [原文 2 Related Work · b00008](https://arxiv.org/html/2610.24007v1#S2.p2.1)：However, RHO focuses on single-agent settings, and employs a fixed, manually designed evolution algorithm with predefined numbers of task rollouts and re-solving iterations where its evolution algorithm remains unchanged throughout optimization.
  - [原文 4.1 Settings and Baselines · b00022](https://arxiv.org/html/2610.24007v1#S4.SS1.p2.1)：We also include FoT [ 22 ] , in which clients upload reflections and the server aggregates them into an insight library without evolving prompts or other harness components, i.e., only the insight library evolves.

## 方法怎样工作

- 用文本指南限定 harness 搜索空间，将其表示为可执行代码仓库；客户端同步最新仓库。初始服务器使用 Hermes Agent 与 ReAct。
  核验：原文支持；b00004、b00020 明确支持文本指南、可执行代码仓库、仓库同步以及 Hermes Agent 与 ReAct 初始化。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2610.24007v1#S1.p3.1)：Humans provide only a lightweight, plaintext guide describing the allowable harness search space and expected behavior.
  - [原文 3 Federation over Harness (FoH) · b00020](https://arxiv.org/html/2610.24007v1#S3.p8.1)：We represent each harness as a repository containing the code required for execution. Clients obtain updated harnesses through repository synchronization (e.g., Git pull).
  - [原文 3 Federation over Harness (FoH) · b00020](https://arxiv.org/html/2610.24007v1#S3.p8.1)：The initial server harness \mathcal{H}_{s}^{(0)} is instantiated as a Hermes Agent [ 11 ] using ReAct [ 23 ] .
- 客户端结合用户资源独立完成任务，将答案返回用户，仅向服务器上传反思；反思依据本地任务、响应和轨迹生成，不接触标准答案、奖励或留出验证样例。
  核验：原文支持；b00010、b00017 支持客户端独立执行、整合用户资源、答案返回用户及仅上传反思，并明确列出反思可访问的信息和不可访问的监督信号。
  - [原文 3 Federation over Harness (FoH) · b00017](https://arxiv.org/html/2610.24007v1#S3.p5.1)：Each client receives the latest shared harness \mathcal{H}_{c} , integrates user-provided resources (tools, environments, file systems, and chat history), and returns the response to the user, uploading only R_{i} to the server
  - [原文 3 Federation over Harness (FoH) · b00017](https://arxiv.org/html/2610.24007v1#S3.p5.1)：The reflection has access only to the local task, response, and trajectory, with no ground-truth answer, reward, or held-out validation example.
- 服务器先依据反思及当前两侧 harness 更新自身，再用更新后的服务器生成下一版客户端 harness；服务器维护共享洞见库，供客户端作为外部知识使用。
  核验：原文支持；b00018 明确规定先更新服务器、再使用更新后的服务器更新客户端，并说明洞见库的服务器端维护和客户端使用方式。
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：First, it runs under \mathcal{H}_{s}^{(t)} to produce \mathcal{H}_{s}^{(t+1)} , using the server guide, the collected reflections, and the current server and client harnesses.
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：Second, it runs under the updated server harness \mathcal{H}_{s}^{(t+1)} to produce \mathcal{H}_{c}^{(t+1)} , using the client guide, the same reflections, and the current client harness.
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：The shared insight library is updated on the server side, evolves jointly with other components of the server harness, and is used on the client side as external knowledge.

## 作者声称的贡献

- 作者自述贡献是无需外部验证的联邦 harness 演化，以及让演化策略本身可演化；提供材料不足以独立确认创新优先权。
  核验：原文支持；b00048 支持两项作者自述贡献；所提供材料未包含用于独立核验优先权的前作全文，结论保留了这一证据边界。
  - [原文 6 Conclusion · b00048](https://arxiv.org/html/2610.24007v1#S6.p1.1)：We propose Federation over Harness (FoH) , advancing federated agents in two directions: enabling self-evolution without external validation and making the evolution strategy itself evolvable, with humans defining the search space through lightweight textual guides.
- 作者汇总报告：相对其称为 SOTA 的单智能体 harness、非联邦 harness 演化和固定 harness 联邦自演化，提升分别为 53.57%、29.76%、22.38%；任务完成 token 减少 34.09%，服务器演化额外提升 4.50%。
  核验：原文支持；b00006 逐项报告了三个比较对象及 53.57%、29.76%、22.38%、34.09% 和 4.50%；结论准确定位为作者汇总报告，未将其当作独立复算结果。
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.24007v1#S1.p5.1)：FoH outperforms the SOTA single-agent harness by 53.57%, non-federated harness evolution by 29.76%, and fixed-harness federated self-evolution by 22.38%, while reducing task-completion tokens by 34.09%. Evolving the server harness further improves performance by 4.50% over a fixed server harness

## 本文报告的方法比较

- 本文将 RHO 描述为每个 harness 需要 10 次客户端 rollout、提出 3 个候选后舍弃 2 个；FoH 利用多客户端反思，每轮生成一个更新版本。该描述尚未通过前作独立核验。
  核验：原文支持；b00041 明确描述 RHO 的 10 次 rollout、3 个候选和舍弃 2 个；b00042 支持 FoH 每轮生成一个更新版本。结论保留了前作未独立核验的限定。
  - [原文 4.4 Discussion of Validation-Free Evolution · b00041](https://arxiv.org/html/2610.24007v1#S4.SS4.p2.1)：each harness requires 10 client-agent rollouts, after which the aggregation agent proposes three new harnesses and discards the two unselected ones.
  - [原文 4.4 Discussion of Validation-Free Evolution · b00042](https://arxiv.org/html/2610.24007v1#S4.SS4.p3.1)：FoH instead exploits the federated setting itself: multiple client agents naturally provide reflections on the shared harness, so the server generates only one updated harness per iteration and wastes no computation on discarded candidates.
- 实验各方法使用相同 LLM 和指南定义的搜索空间；RHO 保留预设优化流程，但被置于相同联邦客户端/服务器环境。因此汇总中的“非联邦”措辞不能直接理解为实际实验部署。
  核验：原文支持；b00021 明确说明相同 LLM、相同指南定义的搜索空间，以及 RHO 保留预设流程但置于相同联邦环境；对 b00006 中“非联邦”措辞的限定成立。
  - [原文 4.1 Settings and Baselines · b00021](https://arxiv.org/html/2610.24007v1#S4.SS1.p1.1)：All methods use the same LLM and harness search space defined by identical guides.
  - [原文 4.1 Settings and Baselines · b00021](https://arxiv.org/html/2610.24007v1#S4.SS1.p1.1)：for RHO, we retain its predefined optimization procedure while placing it in the same federated client/server setting.
- 比较范围未包括需要外部验证的方法；作者理由是公平比较需构建覆盖任务域及执行环境的代表性验证集，偏置验证集可能使比较不可靠。
  核验：原文支持；b00050 明确排除需要外部验证的方法，并给出验证集需覆盖任务和执行环境、偏置可能导致比较不可靠的理由。
  - [原文 Limitations · b00050](https://arxiv.org/html/2610.24007v1#Sx1.p2.1)：Methods requiring external validation are not considered in this work because a fair comparison would require constructing a representative validation set covering diverse task domains and execution environments, including system kernels, containers, and tools.
  - [原文 Limitations · b00050](https://arxiv.org/html/2610.24007v1#Sx1.p2.1)：If the validation set is biased toward particular tasks or environments, the comparison may yield unreliable results.

## 实验证据与条件

任务：PinchBench V1 既有任务、V2 新增留出任务、ClawEval。
基础模型：DeepSeek-V4-Flash；评审 GPT-Luna-5.6-Pro (High)。
比较基线：孤立 ReAct、FoT、置于联邦环境的 RHO。
指标：表 1 任务得分；总输出 token／任务完成输出 token；附录报告准确率及 95% 置信区间。
结果：按既有／留出／ClawEval 顺序，FoH：94.47／92.86／78.44；ReAct：83.98／84.80／56.60；FoT：92.77／90.53／74.41；RHO：86.11／80.72／65.83。总输出／任务完成输出分别为 FoH 519K／414K、ReAct 645K／645K、FoT 453K／416K、RHO 15M／377K。追加独立运行后，作者报告三组平均准确率及 95% CI 为 93.96%±2.58%、92.53%±1.63%、78.32%±0.43%。
资源条件：演化 15 轮；孤立智能体取 15 次独立运行最佳值。客户端／服务器单次调用输出上限 16,384／32,768 token；每任务最多 30 次调用，无运行时限。CPU、64 GB 内存、Python 3.10、Conda。附录称每个应用追加两次独立 FoH 运行。
- 日常任务实验仅用 PinchBench V1 的 23 个任务驱动演化，在新增的 124 个 V2 任务及 ClawEval 上评估迁移；FoH 三组得分均高于表中 ReAct、FoT 和 RHO。
  核验：原文支持；b00023 支持任务数量及演化与评估的划分；b00015 的全部所列分数和 token 数值一致，FoH 三列得分均高于列出的基线。b00014、b00055 支持资源配置、运行次数及追加运行的均值和置信区间。
  - [原文 4.2 Applications · b00023](https://arxiv.org/html/2610.24007v1#S4.SS2.p1.1)：We use the 23 tasks in PinchBench [ 6 ] V1 as existing tasks and the 124 tasks subsequently added in V2 as held-out tasks. Only the 23 V1 tasks are used to generate client reflections and evolve the harness; the held-out PinchBench tasks and ClawEval [ 24 ] are used solely for evaluation.
  - [原文 3 Federation over Harness (FoH) · b00014](https://arxiv.org/html/2610.24007v1#S3.T1)：Token columns report output tokens; the maximum per LLM call is 16,384 (client) and 32,768 (server), with at most 30 LLM calls per task and no runtime limit. We run 15 iterations; isolated-agent performance is the best of 15 independent runs.
  - [原文 3 Federation over Harness (FoH) · b00014](https://arxiv.org/html/2610.24007v1#S3.T1)：Base LLM: DeepSeek-V4-Flash; judge: GPT-Luna-5.6-Pro (High). Sandbox: CPUs, 64 GB memory, Python 3.10, and Conda; other settings follow benchmark defaults.
  - [原文 3 Federation over Harness (FoH) · b00015](https://arxiv.org/html/2610.24007v1#S3.T1.3.1)：Baseline Isolated Agents (ReAct [ 23 ] ) 83.98 84.80 56.60 645K 645K FoT [ 22 ] 92.77 90.53 74.41 453K 416K RHO [ 13 ] 86.11 80.72 65.83 15M 377K
  - [原文 3 Federation over Harness (FoH) · b00015](https://arxiv.org/html/2610.24007v1#S3.T1.3.1)：Ours FoH 94.47 92.86 78.44 519K 414K
  - [原文 Appendix C Confidence Intervals · b00055](https://arxiv.org/html/2610.24007v1#A3.p1.1)：Furthermore, for each application, we run FoH two more independent times. The average accuracies (with 95% confidence intervals) on Application 1 ( Section 4.2 ) for existing, held-out, and new tasks are 93.96% \pm 2.58%, 92.53% \pm 1.63%, and 78.32% \pm 0.43%, respectively.
任务：ScienceAgentBench；每个领域各取一半任务组成既有集和留出集。
基础模型：Claude Opus-5.5 (High)。
比较基线：孤立 ReAct、FoT、联邦环境中的 RHO；固定服务器、无洞见库、无本地反思、无工具演化的 FoH。
指标：有效执行率 VER、成功率 SR；总输出 token／任务完成输出 token。
结果：FoH 既有集 VER／SR 为 84.3／51.0，留出集为 88.2／58.8。ReAct、FoT、RHO 的留出集 VER／SR 分别为 78.4／11.8、88.2／21.6、76.5／31.4。固定服务器、无洞见库、无本地反思、无工具演化的留出集 SR 为 52.9、19.6、15.7、19.6。FoH 总输出／任务完成输出为 2.55M／1.27M，ReAct 为 1.91M／1.91M。
资源条件：演化 5 轮，不限制 LLM 调用次数；其余设置沿用表 1。
- ScienceAgentBench 在各领域内等分既有集与留出集。FoH 留出集 SR 为 58.8%，高于各基线；移除洞见库、本地反思或工具演化后，SR 明显降低。
  核验：原文支持；b00032 支持按领域等分；b00025 支持模型、5 轮演化及不限调用次数。b00026 的 VER、SR 和 token 数值均匹配，三项消融的留出 SR 均大幅低于 58.8%；“明显降低”可作数值差距描述，不能据此解释为统计显著。
  - [原文 4.2 Applications · b00032](https://arxiv.org/html/2610.24007v1#S4.SS2.p5.1)：We split the benchmark into two equal halves of existing and held-out tasks, taking half of the tasks from each domain for each split, and measure the valid execution rate (VER) and success rate (SR) using the benchmark’s standardized criteria
  - [原文 4.2 Applications · b00025](https://arxiv.org/html/2610.24007v1#S4.T2)：We use Claude Opus-5.5 (High), run evolution for 5 iterations, and do not limit the number of LLM calls; other settings follow Table 1 .
  - [原文 4.2 Applications · b00026](https://arxiv.org/html/2610.24007v1#S4.T2.3.1)：Baseline Isolated Agents (ReAct [ 23 ] ) 76.5 19.6 78.4 11.8 1.91M 1.91M FoT [ 22 ] 80.4 23.5 88.2 21.6 1.51M 1.33M RHO [ 13 ] 66.7 29.4 76.5 31.4 17.65M 1.44M
  - [原文 4.2 Applications · b00026](https://arxiv.org/html/2610.24007v1#S4.T2.3.1)：FoH ( \mathcal{H}_{s} fixed at \mathcal{H}_{s}^{(1)} ) 80.4 45.1 86.3 52.9 1.93M 1.39M FoH (no insight library) 80.4 23.5 82.4 19.6 1.43M 1.12M FoH (no local reflection) 70.6 19.6 84.3 15.7 1.35M 1.17M FoH (no tool evolution) 68.6 23.5 88.2 19.6 2.71M 1.78M
  - [原文 4.2 Applications · b00026](https://arxiv.org/html/2610.24007v1#S4.T2.3.1)：Ours FoH 84.3 51.0 88.2 58.8 2.55M 1.27M
任务：应用 1 轨迹的敏感信息检测及 PinchBench V1 原始输入重建。
基础模型：输入重建攻击模型为 Fable 5.1 (High)；敏感信息检测所用 LLM 未在提供摘录中明确。
比较基线：原始执行轨迹，对比仅共享 FoH 反思及反思加客户端 harness 仓库。
指标：秘密、身份信息、路径检出数；字符相似度、token F1、BLEU-4。
结果：正则在原始轨迹检出 10／310／68 条秘密／身份信息／路径，LLM 额外检出 3／16／12 条；两种 FoH 共享设置均为零检出。按原始轨迹／反思／反思加仓库顺序，字符相似度为 54.7%／41.2%／45.7%，token F1 为 60.2%／33.6%／36.1%，BLEU-4 为 20.4／4.6／9.9。
资源条件：输入重建由多个攻击智能体交互 3 轮；总 token、攻击智能体数量和运行成本未在提供摘录中明确。
- 隐私补充实验比较原始轨迹、FoH 反思及反思加客户端仓库：后两者未检出所测敏感项，输入重建指标也较低；作者明确不将其视为全面隐私保护证明。
  核验：原文支持；b00057—b00061 支持三种共享设置、检测数量、重建指标、攻击模型及三轮交互；b00049 明确否认全面隐私保护证明。结论保留了“未检出”的检测范围，没有扩大为不存在泄漏。
  - [原文 Appendix D Reducing Leakage of Secrets · b00057](https://arxiv.org/html/2610.24007v1#A4.p2.1)：Using execution traces from Application 1 ( Section 4.2 ), we compare three information-sharing settings: (1) raw execution trajectories, (2) client-uploaded reflections in FoH, and (3) reflections together with the evolved client harness code repository.
  - [原文 Appendix D Reducing Leakage of Secrets · b00058](https://arxiv.org/html/2610.24007v1#A4.p3.1)：Regular-expression matching identifies 10 secrets, 310 identity information entries, and 68 paths in raw trajectories, compared with zero detected instances in reflections alone and reflections combined with harness code.
  - [原文 Appendix D Reducing Leakage of Secrets · b00058](https://arxiv.org/html/2610.24007v1#A4.p3.1)：The LLM-based pipeline identifies an additional 3 secrets, 16 identity information entries, and 12 paths in raw trajectories, while detecting no instances in either FoH sharing setting.
  - [原文 Appendix D Reducing Leakage of Secrets · b00059](https://arxiv.org/html/2610.24007v1#A4.T3)：The attacker uses Fable 5.1 (High) with PinchBench V1 reasoning traces in FoH to reconstruct the original input.
  - [原文 Appendix D Reducing Leakage of Secrets · b00061](https://arxiv.org/html/2610.24007v1#A4.p4.1)：The attacker employs multiple agents that interact over three rounds to progressively refine their reconstruction.
  - [原文 Appendix D Reducing Leakage of Secrets · b00060](https://arxiv.org/html/2610.24007v1#A4.T3.1)：Context Source Char. Similarity Token F1 BLEU-4 Raw Trajectories 54.7% 60.2% 20.4 FoH Reflections 41.2% 33.6% 4.6 FoH Reflections + Client Harness Repo 45.7% 36.1% 9.9
  - [原文 Limitations · b00049](https://arxiv.org/html/2610.24007v1#Sx1.p1.1)：Although the server agent can develop harness mechanisms related to privacy and malicious reflections, we do not present them as proof of comprehensive privacy protection.

## 原文支持的局限性

- 作者明确承认：移除验证数据后，没有显式信号保证每次服务器更新都会改善 harness；图 5 描述还指出，指南排除洞见库或本地反思时会出现不稳定。
  核验：原文支持；b00048 明确说明没有显式信号保证每次更新改善；b00039 将排除洞见库或本地反思与不稳定表现关联，结论限定为作者和图注的描述。
  - [原文 6 Conclusion · b00048](https://arxiv.org/html/2610.24007v1#S6.p1.1)：Removing validation data introduces one limitation: no explicit signal guarantees that each server update yields a better harness; however, we empirically show that our guide design helps the server find better harnesses.
  - [原文 4.4 Discussion of Validation-Free Evolution · b00039](https://arxiv.org/html/2610.24007v1#S4.F5)：Figure 5: Performance on PinchBench V1. With properly configured guides, FoH steadily improves and converges, but becomes unstable when the guide excludes the insight library or local reflection.
- 当前框架假设同步聚合与拉取。异步和个性化属于扩展方向；作者指出数千异构客户端的源 harness 拼接可能超出上下文窗口，压缩、选择或分层聚合仍待研究。
  核验：原文支持；b00043 将同步聚合和拉取列为当前假设，并讨论异步与个性化扩展；b00047 明确提出数千异构客户端的上下文限制和待研究方向。
  - [原文 5 Future Extensions · b00043](https://arxiv.org/html/2610.24007v1#S5.p1.1)：Our current framework assumes synchronous aggregation and harness pulling, which suggests two extensions.
  - [原文 5 Future Extensions · b00047](https://arxiv.org/html/2610.24007v1#S5.p3.1)：With thousands of heterogeneous clients, however, concatenating all source harnesses may exceed the context window, particularly if clients further personalize their harnesses; compression, selection, or hierarchical aggregation for such settings is an interesting future direction.
- 作者未将补充实验视为全面隐私保护证明，系统隐私评估及恶意反思留待未来；自主演化可能偏离人类控制、绕过安全约束或产生有害内容，是作者讨论的风险而非已报告的实验发现。
  核验：原文支持；b00049 支持隐私证明的限制及未来评估安排；b00051 使用可能性措辞讨论失控、绕过约束和有害内容，结论正确区分风险讨论与实验发现。
  - [原文 Limitations · b00049](https://arxiv.org/html/2610.24007v1#Sx1.p1.1)：Comprehensive privacy assessment, malicious reflections, and related aspects are deferred to future work, as our current guide design is optimized for task performance rather than these directions
  - [原文 Ethical Considerations · b00051](https://arxiv.org/html/2610.24007v1#Sx2.p1.1)：Because FoH is a fully autonomous framework in which agents can self-evolve, including the server-agent harness, the evolution process may drift beyond intended human control and potentially develop behaviors that bypass safety constraints or generate harmful content.

## 多智能体机制

- 角色与分工：一个中央服务器协调 N 个客户端；客户端使用共享 harness 独立解决不同但相关的用户任务。
  核验：原文支持；b00010 明确给出中央服务器、N 个客户端、共享客户端 harness，以及独立处理不同但相关任务的结构。
  - [原文 3 Federation over Harness (FoH) · b00010](https://arxiv.org/html/2610.24007v1#S3.p1.1)：FoH consists of a central server agent \mathcal{A}_{s} and N client agents \mathcal{A}_{c_{1}},\ldots,\mathcal{A}_{c_{N}} . Clients independently solve different but related user tasks using a shared client harness \mathcal{H}_{c}
- 协作结构：服务器集中汇集反思，先更新自身 harness，再生成共享客户端 harness；协作主要通过跨任务经验聚合实现。
  核验：原文支持；b00018 明确支持集中收集反思和两阶段更新；结合 b00010 的跨客户端知识聚合，跨任务经验聚合的概括成立。
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：First, it runs under \mathcal{H}_{s}^{(t)} to produce \mathcal{H}_{s}^{(t+1)} , using the server guide, the collected reflections, and the current server and client harnesses.
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：Second, it runs under the updated server harness \mathcal{H}_{s}^{(t+1)} to produce \mathcal{H}_{c}^{(t+1)} , using the client guide, the same reflections, and the current client harness.
- 通信机制：上行仅上传客户端反思，答案返回用户；下行通过仓库同步获取更新后的 harness。
  核验：原文支持；b00017 明确规定答案返回用户、仅反思上传服务器；b00020 明确说明客户端通过仓库同步获取更新。该描述适用于当前框架。
  - [原文 3 Federation over Harness (FoH) · b00017](https://arxiv.org/html/2610.24007v1#S3.p5.1)：Each client receives the latest shared harness \mathcal{H}_{c} , integrates user-provided resources (tools, environments, file systems, and chat history), and returns the response to the user, uploading only R_{i} to the server
  - [原文 3 Federation over Harness (FoH) · b00020](https://arxiv.org/html/2610.24007v1#S3.p8.1)：Clients obtain updated harnesses through repository synchronization (e.g., Git pull).
- 共享记忆：共享洞见库由服务器更新，并与服务器其他 harness 组件共同演化；客户端将其作为外部知识使用。
  核验：原文支持；b00018 直接支持洞见库由服务器更新、与服务器其他组件共同演化，并由客户端作为外部知识使用。
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：The shared insight library is updated on the server side, evolves jointly with other components of the server harness, and is used on the client side as external knowledge.
- 调度方式：当前实现采用同步聚合和同步拉取；异步情形可能收到由陈旧客户端版本产生的反思，尚作为扩展讨论。
  核验：原文支持；b00043 明确区分当前同步假设与异步扩展，并指出异步可能接收到旧版本客户端 harness 产生的反思。
  - [原文 5 Future Extensions · b00043](https://arxiv.org/html/2610.24007v1#S5.p1.1)：Our current framework assumes synchronous aggregation and harness pulling, which suggests two extensions. In asynchronous FoH, clients finish at different times, so the server may receive reflections generated under stale client harness versions.

## 自进化机制

- 改变对象：演化对象覆盖洞见库、提示层和工具层，以及反思轮数、候选生成评估选择等策略；任务描述、权限、历史及用户资源保持固定输入。
  核验：原文支持；b00016 列出三类 harness 组件及固定用户输入；b00019 明确允许演化反思轮数和候选生成、评估、选择策略。
  - [原文 3 Federation over Harness (FoH) · b00016](https://arxiv.org/html/2610.24007v1#S3.p4.1)：Harness \mathcal{H} consists of three categories: an insight library , prompt-level components , and tool-level components .
  - [原文 3 Federation over Harness (FoH) · b00019](https://arxiv.org/html/2610.24007v1#S3.p7.1)：FoH lets the evolving harnesses determine these choices, including how many rounds of client reflection to perform and how the server generates, evaluates, and selects new harnesses.
  - [原文 3 Federation over Harness (FoH) · b00016](https://arxiv.org/html/2610.24007v1#S3.p4.1)：In contrast, task descriptions, access permissions, conversation histories, and other user-owned resources remain fixed inputs from users.
- 反馈来源：反馈为智能体依据本地任务、响应和轨迹生成的反思；无外部任务表现监督，但允许执行代码查错等 harness 内部运行检查。
  核验：原文支持；b00017 支持反思的信息来源和监督限制；b00009 明确定义无外部任务表现监督，同时允许执行生成代码查错等内部运行检查。
  - [原文 3 Federation over Harness (FoH) · b00017](https://arxiv.org/html/2610.24007v1#S3.p5.1)：The reflection has access only to the local task, response, and trajectory, with no ground-truth answer, reward, or held-out validation example.
  - [原文 2 Related Work · b00009](https://arxiv.org/html/2610.24007v1#S2.p3.1)：Validation-free means that the whole system evolves without external task-performance supervision, but permits runtime checks within the harness, such as executing generated code to detect errors.
- 更新方式：服务器以指南、反思及现有 harness 为输入，自更新后再更新客户端；作者报告每轮只生成一个更新版本，无需淘汰候选。
  核验：原文支持；b00018 支持输入内容和先服务器后客户端的更新顺序；b00042 直接报告每轮仅一个更新版本、不浪费计算淘汰候选。此处应理解为作者报告的流程，而非禁止候选选择的普遍约束。
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：First, it runs under \mathcal{H}_{s}^{(t)} to produce \mathcal{H}_{s}^{(t+1)} , using the server guide, the collected reflections, and the current server and client harnesses.
  - [原文 3 Federation over Harness (FoH) · b00018](https://arxiv.org/html/2610.24007v1#S3.p6.1)：Second, it runs under the updated server harness \mathcal{H}_{s}^{(t+1)} to produce \mathcal{H}_{c}^{(t+1)} , using the client guide, the same reflections, and the current client harness.
  - [原文 4.4 Discussion of Validation-Free Evolution · b00042](https://arxiv.org/html/2610.24007v1#S4.SS4.p3.1)：the server generates only one updated harness per iteration and wastes no computation on discarded candidates.
- 发生阶段：更新发生在客户端完成任务并产生反思后的轮间阶段；实验运行固定轮数，使用最后一轮 harness 在既有及留出任务上评估。
  核验：原文支持；b00011、b00018 支持客户端执行并上传反思后进行服务器更新；b00022 明确支持固定演化轮数和使用最后一轮 harness 评估既有及留出任务。
  - [原文 4.1 Settings and Baselines · b00022](https://arxiv.org/html/2610.24007v1#S4.SS1.p2.1)：Since the evolution is validation-free, we evolve every method for a fixed number of iterations and report performance on existing and held-out tasks using the final-iteration harness.
- 保留范围：共享知识及 harness 跨轮保留，并用于跨任务迁移，而非仅限单次任务内修订；跨独立运行的持久化未在提供材料中交代。
  核验：原文支持；b00030 明确提到合并此前轮次的洞见库；b00011、b00023 支持 harness 跨轮更新和迁移评估。所提供文本未交代跨独立运行的持久化，结论没有将其断言为不存在。
  - [原文 4.2 Applications · b00030](https://arxiv.org/html/2610.24007v1#S4.SS2.p3.1)：the server develops mechanisms for dropping duplicates (v0), deduplication (v1), and merging insight libraries from previous iterations (v1).
  - [原文 4.2 Applications · b00023](https://arxiv.org/html/2610.24007v1#S4.SS2.p1.1)：Only the 23 V1 tasks are used to generate client reflections and evolve the harness; the held-out PinchBench tasks and ClawEval [ 24 ] are used solely for evaluation.
- 独立任务验证：留出任务仅用于事后评估，不参与演化反馈；智能体演化时无法访问基准评估结果。因而“无验证”不表示没有留出集评估。
  核验：原文支持；b00005 明确禁止演化中的智能体访问基准评估结果；b00023 将留出任务和 ClawEval 限定为评估用途，b00022 支持最终 harness 的事后评估。无验证演化与留出集评估的区分成立。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.24007v1#S1.p4.1)：Benchmark evaluation results are inaccessible to the agents during evolution.
  - [原文 4.2 Applications · b00023](https://arxiv.org/html/2610.24007v1#S4.SS2.p1.1)：Only the 23 V1 tasks are used to generate client reflections and evolve the harness; the held-out PinchBench tasks and ClawEval [ 24 ] are used solely for evaluation.

## 系统分析与启发（推测）

- 系统分析：应分别解释任务完成成本与完整系统成本。表 2 中 FoH 的任务完成输出低于 ReAct，但总输出更高（b00026）；不能把局部 token 节省直接等同于端到端成本下降。
- 系统分析：相同 LLM 和搜索空间不等于相同总预算。实际 RHO 采用联邦部署（b00021），因此现有比较无法单独隔离多智能体结构、更新规则和计算量各自的贡献。
- 系统分析：无外部验证时，指南和反思质量可能成为主要控制因素；原文关于指南删减后不稳定的观察（b00039）支持进一步研究这一依赖，但不足以给出收敛保证。

## 待研究问题（系统分析）

- 系统分析问题：在严格匹配总输入输出 token、调用次数及延迟后，FoH 相对单智能体演化的收益还能保留多少？
- 系统分析问题：能否在不引入任务标签的前提下，可靠检测并回滚有害 harness 更新，而不只是依赖当前指南？
- 系统分析问题：面对异步陈旧反思、客户端个性化及恶意反思，跨任务收益和隐私表现能否保持？

## 缺失信息

- 提供笔记虽标记为 full_text，但没有完整客户端／服务器指南、初始提示词及演化代码，无法重建具体搜索边界和更新实现。
- 提供材料未明确实验客户端数量、任务分配方式及具体通信频率；当前同步假设已明确，异步与个性化属于扩展讨论。
- 提供材料未明确表 1 得分的详细计算标准、ScienceAgentBench 任务总数、VER／SR 判定细则，以及 token 统计的完整覆盖范围。
- 作者汇总提升百分比的计算公式及跨基准聚合口径在提供材料中未明确。
- 附录已报告每个应用追加两次独立 FoH 运行；但随机种子、置信区间计算方法、均值纳入哪些运行及应用 2 重复运行的具体数值在提供摘录中未明确。
- 提供材料不足以确认严格等预算的单智能体比较，故相应字段为 null。
- 跨独立运行持久化、更新失败回滚机制、组件消融对应的完整基准及图 3—5 完整数据未在提供材料中明确。
- 隐私检测 LLM、完整攻击模板、攻击智能体数量、总预算及统计不确定性未在提供材料中明确。
- 未提供被引用前作全文，无法独立核验相关工作描述或确认创新优先权；本次仅合成原文笔记，未执行实验。

## 阅读范围

读取 2 / 2 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Modern LLM-powered agents increasingly improve through experience sharing, where distributed agents distill local reasoning experience into reusable knowledge, such as a shared insight library. Existing approaches, however, still heavily rely on manually designed prompts and workflows that determine both how local agents extract useful reasoning traces and how a central/global agent aggregates them to obtain common patterns and insights. We propose Federation over Harness (FoH), a framework that automatically evolves the harness for both local and global components in this distributed multi-agent reasoning pipeline. A server agent evolves the client harness for task solving and self-reflection while, at the same time, evolving its own harness for aggregating distributed reflections, maintaining shared knowledge, and updating subsequent client harnesses. Importantly, FoH requires no extra validation signals, such as ground-truth labels or validation data, during evolution; it learns solely from self-generated reflections produced by distributed agents. Experiments on multiple benchmarks show that FoH consistently improves over single-agent baselines with a fixed harness and with harness self-evolution by 53.57% and 29.76%.
