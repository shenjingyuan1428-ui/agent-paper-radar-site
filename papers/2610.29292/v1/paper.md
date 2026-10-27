# Credit Where Credit Is Due: Contrastive Attribution Topology Search for Multi-Agent Systems

作者：Fabian Tritthart, Tom Zehle
原文：https://arxiv.org/abs/2610.29292v1
首次提交：2026-10-21T06:46:11Z · 版本更新：2026-10-21T06:46:11Z
版本：v1 · 已核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- 针对团队分数难以识别个体贡献的问题，CATS从固定智能体池出发，以跨候选轨迹归因更新通信边概率并剪枝；作者报告，在候选评估次数匹配时，BigCodeBench准确率比仅分数搜索高5.3个百分点，部署token少54%。
  核验：原文支持；b00004–b00005支持问题动机、固定池、跨候选归因及拓扑更新；b00021明确报告匹配候选评估次数下，BigCodeBench平均准确率提高5.3个百分点、部署token减少54%。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2610.29292v1#S1.p2.1)：Scores alone thus say little about which agents to keep.
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：We introduce Contrastive Attribution Topology Search (CATS) , an offline meta-agent that assembles teams from a fixed agent pool.
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：An LLM compares their transcripts and assigns each agent signed credit. CATS then updates link probabilities, prunes weak links and unreachable agents, and selects one fixed team for deployment.
  - [原文 3 Benchmarking · b00021](https://arxiv.org/html/2610.29292v1#S3.p2.1)：Our selected topology G^{\star} improves mean accuracy over the strongest baseline, score-only heuristic search, by 5.3 points while using 54% fewer deployment tokens with matched candidate evaluations (Table 1 ).

## 研究问题

- 团队总分不足以指导个体保留：正确解答可能包含冗余工作，失败解答也可能包含有用贡献。
  核验：原文支持；b00004直接说明正确解答可能包含冗余工作、失败解答可能包含有用贡献，并据此指出团队分数难以指导个体保留。
  - [原文 1 Introduction · b00004](https://arxiv.org/html/2610.29292v1#S1.p2.1)：Task scores, however, evaluate the team as a whole: a correct solution may contain unnecessary work, and a failed one may include useful contributions. Scores alone thus say little about which agents to keep.

## 方法怎样工作

- 以人工构造的领域专用完全DAG为候选母图（supergraph），用边logit定义采样概率；每步独立采样K个候选拓扑，拒绝包含源节点不可达节点的图。
  核验：原文支持；b00009–b00010明确给出领域专用人工完全DAG、边logit及其采样概率、每步K个候选的独立伯努利边采样，以及不可达节点拒绝规则。
  - [原文 2 Method · b00009](https://arxiv.org/html/2610.29292v1#S2.p2.1)：We search for an optimized multi-agent topology as a subgraph of a hand-crafted complete directed acyclic graph specialized to a chosen problem domain (Figure 1 ).
  - [原文 2 Method · b00009](https://arxiv.org/html/2610.29292v1#S2.p2.1)：Each edge e carries a logit \theta_{e} with sampling probability \alpha_{e}=\sigma(\theta_{e}) , initialized to a common \alpha_{0} .
  - [原文 2 Method · b00010](https://arxiv.org/html/2610.29292v1#S2.p3.1)：At each step, we sample K topologies by independently drawing e\sim\operatorname{Bernoulli}(\alpha_{e}) , rejecting graphs with nodes unreachable from the source.
- 执行候选后，LLM归因器比较同题轨迹，根据任务分数、受长度限制的输出、工具调用及最终产物，分配[-1,1]个体信用；减去任务内平均信用，再跨有信用记录的任务取平均，得到节点优势。
  核验：原文支持；b00011明确归因范围、输入及信用区间；b00012的公式支持先减去同任务跨参与智能体和候选的平均信用，再对存在信用记录的任务求平均。
  - [原文 2 Method · b00011](https://arxiv.org/html/2610.29292v1#S2.p4.1)：An LLM attributer assigns each participating agent i in candidate k on task q a credit c_{k,q,i}\in[-1,1] (harmful to helpful) by comparing candidate rollouts on the same task.
  - [原文 2 Method · b00011](https://arxiv.org/html/2610.29292v1#S2.p4.1)：The attributer sees task scores, length-capped agent outputs, tool calls, and the final artifact state (e.g., the coding environment), and runs in parallel across tasks.
  - [原文 2 Method · b00012](https://arxiv.org/html/2610.29292v1#S2.p5.1)：Credits are normalized into per-agent advantages A_{k,i}=|Q_{k,i}|^{-1}\sum_{q\in Q_{k,i}}(c_{k,q,i}-b_{q}) , where Q_{k,i} holds the tasks with a credit for i in k and b_{q} is the mean credit over participating agents and candidates for task q .
- 按目标节点优势更新已触发边的logit；指向活跃节点的未触发非源边接受较小更新。逐步剪除低概率边及不可达节点；最终仅从第T步候选选平均分最高者，平分优先成员少、再优先出现早者。
  核验：原文支持；b00012支持两类边更新和逐步剪枝；b00013明确仅从第T步候选中按平均分选择，并依次以成员更少、出现更早打破平分。
  - [原文 2 Method · b00012](https://arxiv.org/html/2610.29292v1#S2.p5.1)：Each edge (u,v) fired in candidate k is updated by \theta_{uv}\leftarrow\theta_{uv}+\eta A_{k,v} . Unfired non-source edges into an active agent v receive a smaller secondary update \theta_{uv}\leftarrow\theta_{uv}+\eta\rho A_{k,v} .
  - [原文 2 Method · b00012](https://arxiv.org/html/2610.29292v1#S2.p5.1)：After each step we prune weak edges whose probability has fallen below the fraction \delta of its initial value (the pruning fraction ), E\leftarrow\{e\in E:\alpha_{e}\geq\delta\alpha_{0}\} , and remove nodes that are no longer reachable from the source.
  - [原文 2 Method · b00013](https://arxiv.org/html/2610.29292v1#S2.p6.1)：After T steps we return the best final candidate G^{\star}=\arg\max_{k}\tfrac{1}{N}\sum_{q}s_{k,q} over the step- T candidates, which are sampled under the accumulated priors. Ties are broken in favor of fewer agents and then the earlier candidate.

## 作者声称的贡献

- 作者自述贡献包括：用对比式个体信用指导团队构建、改善两项编码基准的准确率和部署token，以及在HotpotQA压力测试中排除投毒成员；不据此确认创新优先权。
  核验：原文支持；b00006逐项列出这三项作者自述贡献。结论将其限定为作者声称，未把所引材料当作创新优先权证明。
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.29292v1#S1.p4.1)：Our contributions are: (i) contrastive per-agent credit to guide team construction (Figure 1 ), (ii) higher mean accuracy and lower deployment token use than score-only search on two coding benchmarks with matched candidate evaluations (Table 1 )
  - [原文 1 Introduction · b00006](https://arxiv.org/html/2610.29292v1#S1.p4.1)：(iii) a HotpotQA stress test where CATS excludes all poisoned agents in every run, while random search retains some at comparable accuracy (Table 2 ).
- 作者将BigCodeBench归因适配描述为：评分持久化代码产物而非智能体文本，并提供有序、精简的工具效果。
  核验：原文支持；b00064明确描述对BigCodeBench的适配：评分持久化代码产物，并提供有序、精简的工具效果。
  - [原文 Appendix B BigCodeBench Attributer Call · b00064](https://arxiv.org/html/2610.29292v1#A2.p1.1)：We adapt contrastive attribution [ 14 ] for BigCodeBench by grading the persisted code artifact instead of agent text. We also expose ordered, compact tool effects.

## 本文报告的方法比较

- 本文比较无工具直接调用、ReAct单智能体、人工MAS、随机拓扑搜索及仅分数启发式搜索；两种搜索基线匹配同题K×T次候选评估，不匹配计算量。
  核验：原文支持；b00014列出全部五类比较对象，并明确两种搜索基线匹配同题K×T次候选评估，而非计算量。
  - [原文 2 Method · b00014](https://arxiv.org/html/2610.29292v1#S2.p7.1)：We compare against (i) a direct LLM call without tools, (ii) a ReAct [ 13 ] single agent, both with literature-derived system prompts (Appendix Table 6 ), (iii) a hand-crafted multi-agent system (MAS) designed before observing supergraph results (Appendix Figure 4(d) )
  - [原文 2 Method · b00014](https://arxiv.org/html/2610.29292v1#S2.p7.1)：(iv) random topology search, and (v) a score-only heuristic search using CATS’s fired/unfired update and hyperparameters, with scalar task scores replacing agent credits. Both search baselines match K\times T candidate evaluations on the same tasks, not compute
- 随机搜索以固定α=0.15抽取16个候选；仅分数搜索给活跃智能体相同的候选分数优势，沿用CATS更新与剪枝。作者明确该启发式缺少REINFORCE所需的伯努利得分函数因子。
  核验：原文支持；b00050明确规定随机搜索以固定α=0.15抽取16个候选，以及仅分数搜索向活跃智能体分配相同优势并沿用更新与剪枝；缺少REINFORCE得分函数因子也是原文明确陈述。
  - [原文 A.3 Search and Baselines · b00050](https://arxiv.org/html/2610.29292v1#A1.T6.6)：Random search Draw 16 candidates at fixed \alpha=0.15 .
  - [原文 A.3 Search and Baselines · b00050](https://arxiv.org/html/2610.29292v1#A1.T6.6)：Assign A_{k} to every active agent and update edge logits using the same learning rate, unfired-edge rule, and pruning schedule as our method, but without LLM attribution. This heuristic omits the Bernoulli score-function factor I_{e}-\alpha_{e} required by REINFORCE [ 11 ] .
- 消融比较最终候选G*与剪枝后全部剩余节点和边组成的Gp；作者报告部署G*使编码token约减半，BigCodeBench平均准确率更高，MBPP相同。
  核验：原文支持；b00013定义剪枝后母图Gp；b00023直接报告该消融结论，b00016的部署token及平均准确率数值与之相符。
  - [原文 2 Method · b00013](https://arxiv.org/html/2610.29292v1#S2.p6.1)：As an ablation, we also evaluate the pruned supergraph G_{\mathrm{p}} , consisting of all nodes and edges that remain after pruning.
  - [原文 3 Benchmarking · b00023](https://arxiv.org/html/2610.29292v1#S3.p4.1)：Deploying G^{\star} instead of G_{\mathrm{p}} roughly halves coding deployment tokens, with higher mean accuracy on BigCodeBench and the same on MBPP (Table 1 ).

## 实验证据与条件

任务：BigCodeBench v0.1.4 Instruct；100道与搜索集不重叠的保留评测题，按最终存储程序的隐藏测试评分。
基础模型：任务智能体：Gemma 4 12B；归因器：Gemma 4 31B。
比较基线：随机拓扑搜索、仅分数启发式搜索。
指标：准确率（%）；每题部署输入加输出token（千）；离线搜索输入加输出token（百万）。±为三次运行的样本标准差。
结果：按CATS/随机/仅分数顺序：准确率48.0±5.0/35.0±7.0/42.7±4.9%；部署token 6.7±1.8/8.7±2.6/14.7±8.6千；离线总token 16.42±5.35/16.49±5.66/22.89±10.89百万。
资源条件：100道搜索题，4步×4候选，种子13、14、15；匹配候选评估次数，不匹配计算量。
- 作者报告BigCodeBench上CATS比仅分数搜索高5.3个百分点、部署token少54%；三个种子均有增益，但标准差重叠，仍有不确定性。
  核验：原文支持；b00016、b00063支持全部汇总数值；b00015、b00047、b00052–b00055、b00062支持模型、任务、单位及资源条件。b00021支持5.3个百分点、54%及不确定性表述。三个种子均有增益应理解为准确率增益，b00056支持这一点；并非每个种子都减少部署token。
  - [原文 3 Benchmarking · b00021](https://arxiv.org/html/2610.29292v1#S3.p2.1)：Our selected topology G^{\star} improves mean accuracy over the strongest baseline, score-only heuristic search, by 5.3 points while using 54% fewer deployment tokens with matched candidate evaluations (Table 1 ). Gains hold across all three seeds, but standard deviations overlap and uncertainty remains (Table 8 ).
  - [原文 3 Benchmarking · b00016](https://arxiv.org/html/2610.29292v1#S3.T1.1)：BigCodeBench CATS ( G^{\star} ) 48.0 \pm 5.0 6.7 \pm 1.8
  - [原文 3 Benchmarking · b00016](https://arxiv.org/html/2610.29292v1#S3.T1.1)：Random topology search 35.0 \pm 7.0 8.7 \pm 2.6 Score-only search 42.7 \pm 4.9 14.7 \pm 8.6
  - [原文 3 Benchmarking · b00015](https://arxiv.org/html/2610.29292v1#S3.p1.1)：Gemma 4 12B for the MAS agents and the larger Gemma 4 31B endpoint for the attributer [ 4 ] .
  - [原文 A.3 Search and Baselines · b00047](https://arxiv.org/html/2610.29292v1#A1.T5.8)：Hyperparameter Value Search tasks 100 Seeds (search and evaluation) 13 , 14 , 15 Search steps, T 4 Candidates per step, K 4
  - [原文 A.4 Evaluation Protocol · b00054](https://arxiv.org/html/2610.29292v1#A1.T7.6)：BigCodeBench v0.1.4 Instruct, 100 disjoint tasks Last stored program against hidden tests
  - [原文 3 Benchmarking · b00017](https://arxiv.org/html/2610.29292v1#S3.T1)：Held-out coding tasks, mean \pm sample SD over 3 seeds, 100 tasks per benchmark.
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00055](https://arxiv.org/html/2610.29292v1#A1.T8)：Scores are percentages. Tokens are thousands of input plus output tokens per task.
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00062](https://arxiv.org/html/2610.29292v1#A1.T10)：Offline search tokens, separate from deployment. Millions of input plus output tokens for 16 candidates on 100 search tasks, averaged over seeds 13–15; totals include sample SD.
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00063](https://arxiv.org/html/2610.29292v1#A1.T10.6)：BigCodeBench CATS 14.88 1.54 16.42\pm 5.35 Random search 16.49 0 16.49\pm 5.66 Score-only search 22.89 0 22.89\pm 10.89
  - [原文 2 Method · b00014](https://arxiv.org/html/2610.29292v1#S2.p7.1)：Both search baselines match K\times T candidate evaluations on the same tasks, not compute
任务：MBPP revision 4bb6404f；100道与搜索集不重叠的保留评测题，按最终存储程序的隐藏测试评分。
基础模型：任务智能体：Gemma 4 12B；归因器：Gemma 4 31B。
比较基线：人工MAS、随机拓扑搜索、仅分数启发式搜索。
指标：准确率（%）；每题部署输入加输出token（千）；离线搜索输入加输出token（百万）。±为三次运行的样本标准差。
结果：CATS：80.7±7.5%，5.3±0.7千；人工MAS：80.3±4.7%，4.2±0.3千；随机：80.3±4.7%，18.8±11.3千；仅分数：79.0±5.6%，22.2±10.7千。离线总token：CATS 13.53±1.51、随机11.45±2.71、仅分数20.89±3.47百万。
资源条件：100道搜索题，4步×4候选，种子13、14、15；搜索基线匹配候选评估次数，不匹配计算量。
- 作者报告MBPP上CATS准确率与人工MAS、随机搜索相近，部署token少于其他搜索但多于人工MAS；离线搜索token高于随机搜索、低于仅分数搜索。
  核验：原文支持；b00016、b00022支持MBPP准确率和部署token的比较；b00063支持离线token高于随机、低于仅分数搜索及所列数值。b00014–b00015、b00047、b00052–b00055、b00062支持附列实验条件与统计口径；相近不代表已证明统计等效。
  - [原文 3 Benchmarking · b00022](https://arxiv.org/html/2610.29292v1#S3.p3.1)：G^{\star} performs comparably to the hand-crafted MAS and random search, using fewer deployment tokens than the other searches but more than the hand-crafted MAS (Table 1 ).
  - [原文 3 Benchmarking · b00016](https://arxiv.org/html/2610.29292v1#S3.T1.1)：MBPP CATS ( G^{\star} ) 80.7 \pm 7.5 5.3 \pm 0.7
  - [原文 3 Benchmarking · b00016](https://arxiv.org/html/2610.29292v1#S3.T1.1)：Hand-crafted MAS 80.3 \pm 4.7 4.2 \pm 0.3 Random topology search 80.3 \pm 4.7 18.8 \pm 11.3 Score-only search 79.0 \pm 5.6 22.2 \pm 10.7
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00063](https://arxiv.org/html/2610.29292v1#A1.T10.6)：MBPP CATS 12.00 1.53 13.53\pm 1.51 Random search 11.45 0 11.45\pm 2.71 Score-only search 20.89 0 20.89\pm 3.47
  - [原文 A.4 Evaluation Protocol · b00054](https://arxiv.org/html/2610.29292v1#A1.T7.6)：MBPP Revision 4bb6404f , 100 disjoint tasks Last stored program against hidden tests
  - [原文 3 Benchmarking · b00015](https://arxiv.org/html/2610.29292v1#S3.p1.1)：Gemma 4 12B for the MAS agents and the larger Gemma 4 31B endpoint for the attributer [ 4 ] .
  - [原文 A.3 Search and Baselines · b00047](https://arxiv.org/html/2610.29292v1#A1.T5.8)：Hyperparameter Value Search tasks 100 Seeds (search and evaluation) 13 , 14 , 15 Search steps, T 4 Candidates per step, K 4
  - [原文 3 Benchmarking · b00017](https://arxiv.org/html/2610.29292v1#S3.T1)：Held-out coding tasks, mean \pm sample SD over 3 seeds, 100 tasks per benchmark.
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00055](https://arxiv.org/html/2610.29292v1#A1.T8)：Scores are percentages. Tokens are thousands of input plus output tokens per task.
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00062](https://arxiv.org/html/2610.29292v1#A1.T10)：Offline search tokens, separate from deployment. Millions of input plus output tokens for 16 candidates on 100 search tasks, averaged over seeds 13–15; totals include sample SD.
  - [原文 2 Method · b00014](https://arxiv.org/html/2610.29292v1#S2.p7.1)：Both search baselines match K\times T candidate evaluations on the same tasks, not compute
任务：HotpotQA distractor固定提示投毒压力测试；100道与搜索集不重叠的保留评测题，按最后提交答案精确匹配评分。
基础模型：任务智能体：Gemma 4 12B；归因器：Gemma 4 31B。
比较基线：随机拓扑搜索、仅分数启发式搜索。
指标：保留投毒成员数；精确匹配率（%）；每题部署输入加输出token（千）；离线搜索输入加输出token（百万）。±为三次运行的样本标准差。
结果：按CATS/随机/仅分数顺序：投毒成员0.0±0.0/2.0±1.0/1.3±2.3；准确率59.7±3.8/57.7±3.2/24.3±2.5%；部署token 12.7±5.3/15.1±4.3/3.8±2.5千；离线总token 20.50±2.79/9.91±2.20/10.63±4.53百万。
资源条件：固定池含6个投毒、4个诚实智能体；不给搜索投毒标签。100道搜索题，4步×4候选，种子13、14、15。
- 固定提示投毒的HotpotQA测试中，作者报告CATS三次运行均排除全部投毒成员，准确率接近随机搜索；离线搜索token约为两种搜索基线的两倍。
  核验：原文支持；b00019、b00027、b00056支持三次运行均无投毒成员及准确率接近随机搜索；b00063支持全部离线数值及约两倍的比较。b00015、b00047、b00052–b00055、b00062支持附列条件和单位，b00032明确限定为固定对抗提示测试。
  - [原文 4 Poisoned-Pool Stress Test · b00027](https://arxiv.org/html/2610.29292v1#S4.p1.1)：Its supergraph contains six adversarially prompted agents and four honest agents.
  - [原文 4 Poisoned-Pool Stress Test · b00027](https://arxiv.org/html/2610.29292v1#S4.p1.1)：The search receives no adversarial supervision: it observes only task scores and transcripts, and is never told which agents are poisoned.
  - [原文 4 Poisoned-Pool Stress Test · b00027](https://arxiv.org/html/2610.29292v1#S4.p1.1)：CATS retains no poisoned agents across all three seeds.
  - [原文 Responsible-use statement. · b00032](https://arxiv.org/html/2610.29292v1#S6.SS0.SSS0.Px1.p1.1)：Our stress test shows that attribution can exclude fixed adversarial prompts, but this does not establish deployment safety.
  - [原文 3 Benchmarking · b00019](https://arxiv.org/html/2610.29292v1#S3.fig2.1)：CATS Random Score-only Poisoned agents \downarrow 0.0 \pm 0.0 2.0 \pm 1.0 1.3 \pm 2.3 Score % \uparrow 59.7 \pm 3.8 57.7 \pm 3.2 24.3 \pm 2.5 Tokens/task (k) \downarrow 12.7 \pm 5.3 15.1 \pm 4.3 3.8 \pm 2.5
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00063](https://arxiv.org/html/2610.29292v1#A1.T10.6)：HotpotQA CATS 18.39 2.11 20.50\pm 2.79 Random search 9.91 0 9.91\pm 2.20 Score-only search 10.63 0 10.63\pm 4.53
  - [原文 A.4 Evaluation Protocol · b00054](https://arxiv.org/html/2610.29292v1#A1.T7.6)：HotpotQA distractor , 100 disjoint tasks Exact match on last submit_answer phrase
  - [原文 A.4 Evaluation Protocol · b00053](https://arxiv.org/html/2610.29292v1#A1.T7)：Dataset splits and grading. Each held-out set contains 100 tasks.
  - [原文 3 Benchmarking · b00015](https://arxiv.org/html/2610.29292v1#S3.p1.1)：Gemma 4 12B for the MAS agents and the larger Gemma 4 31B endpoint for the attributer [ 4 ] .
  - [原文 A.3 Search and Baselines · b00047](https://arxiv.org/html/2610.29292v1#A1.T5.8)：Hyperparameter Value Search tasks 100 Seeds (search and evaluation) 13 , 14 , 15 Search steps, T 4 Candidates per step, K 4
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00062](https://arxiv.org/html/2610.29292v1#A1.T10)：Offline search tokens, separate from deployment. Millions of input plus output tokens for 16 candidates on 100 search tasks, averaged over seeds 13–15; totals include sample SD.
  - [原文 3 Benchmarking · b00018](https://arxiv.org/html/2610.29292v1#S3.T2)：Results for CATS, random search, and score-only search (mean \pm sample SD, 3 seeds, 100 tasks).
  - [原文 A.5 Per-Seed Results and Additional Analyses · b00055](https://arxiv.org/html/2610.29292v1#A1.T8)：Scores are percentages. Tokens are thousands of input plus output tokens per task.

## 原文支持的局限性

- 作者将信用视为优化信号而非因果贡献；未用人类判断验证，且归因器能看见任务分数，信用与成功的相关性仅是内部一致性检查。
  核验：原文支持；b00028明确将信用视为优化信号而非因果度量；b00030明确说明尚无人类判断验证，且可见任务分数使信用与成功的相关性仅能作为一致性检查。
  - [原文 5 Related Work · b00028](https://arxiv.org/html/2610.29292v1#S5.p1.1)：so we treat our credit as an optimization signal, not a causal measure.
  - [原文 6 Limitations, Responsible Use, and Conclusion · b00030](https://arxiv.org/html/2610.29292v1#S6.p2.1)：Attribution credits have not been validated against human judgments. Credit–success correlation (Table 9 ) is only a consistency check, since the attributer sees system_score .
- 仅分数基线未单独调参，无法隔离组件贡献；节点信用等量传播至已触发入边，与Graph-GRPO边级信用的比较留待未来。评估仅覆盖一个模型家族、三个领域、三个种子，token成本只追踪而未优化。
  核验：原文支持；b00030直接支持基线未单独调参、无法隔离组件贡献、节点信用传播及Graph-GRPO比较留待未来；b00029支持模型家族、领域、种子数量及仅追踪而未优化token成本的限制。
  - [原文 6 Limitations, Responsible Use, and Conclusion · b00030](https://arxiv.org/html/2610.29292v1#S6.p2.1)：The score-only baseline was not separately tuned and does not isolate which component of CATS accounts for the difference.
  - [原文 6 Limitations, Responsible Use, and Conclusion · b00030](https://arxiv.org/html/2610.29292v1#S6.p2.1)：Credit is node-level, propagated equally to all incoming fired edges. A comparison with Graph-GRPO’s statistical edge-level credit remains future work [ 3 ] .
  - [原文 6 Limitations, Responsible Use, and Conclusion · b00029](https://arxiv.org/html/2610.29292v1#S6.p1.1)：Evaluating a single model family across three domains and three seeds limits what we can conclude about broader transfer and variance
  - [原文 6 Limitations, Responsible Use, and Conclusion · b00029](https://arxiv.org/html/2610.29292v1#S6.p1.1)：we only track token cost without optimizing it
- 固定对抗提示的排除不构成部署安全保证；作者指出，自适应攻击可能避开截断轨迹窗口或直接攻击未经验证的归因器。
  核验：原文支持；b00032明确否认固定提示压力测试能确立部署安全，并将截断窗口之外的行为和直接利用归因器列为自适应攻击的可能路径。
  - [原文 Responsible-use statement. · b00032](https://arxiv.org/html/2610.29292v1#S6.SS0.SSS0.Px1.p1.1)：Our stress test shows that attribution can exclude fixed adversarial prompts, but this does not establish deployment safety. An adaptive adversary could act beyond the capped transcript window or exploit the unverified LLM attributer directly.

## 多智能体机制

- 角色与分工：已选团队的角色示例包括草稿编码者、实现者、测试设计者，以及问答中的第二跳阅读者、起草者或最终提交者；另有LLM归因器评价参与智能体。
  核验：原文支持；b00044–b00045支持选中编码及问答团队的角色示例；b00011支持另设LLM归因器评价参与智能体。
  - [原文 A.2 Selected Deployment Architectures · b00044](https://arxiv.org/html/2610.29292v1#A1.SS2.p1.1)：BigCodeBench seed 13 connects a draft coder, implementer, and test designer in a chain; MBPP seed 13 selects the same roles with only direct entry edges from start .
  - [原文 A.2 Selected Deployment Architectures · b00045](https://arxiv.org/html/2610.29292v1#A1.SS2.p2.1)：every selected team retains the second-hop reader and either the drafter or final submitter, with directed communication from a reader to the answer-submitting agent.
  - [原文 2 Method · b00011](https://arxiv.org/html/2610.29292v1#S2.p4.1)：An LLM attributer assigns each participating agent i in candidate k on task q a credit c_{k,q,i}\in[-1,1] (harmful to helpful) by comparing candidate rollouts on the same task.
- 协作结构：离线元智能体从固定池组装团队，通过更新链接概率和剪枝选择固定部署团队；执行智能体的模型、提示词、角色和工具不变。
  核验：原文支持；b00005明确给出离线元智能体、固定池、链接更新、剪枝及固定部署团队，并说明智能体模型、提示词、角色和工具不变。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：an offline meta-agent that assembles teams from a fixed agent pool.
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：CATS then updates link probabilities, prunes weak links and unreachable agents, and selects one fixed team for deployment. Agent models, prompts, roles, and tools never change.
- 通信机制：DAG边代表可选直接通信通道；由于共享环境，智能体不必都有下游消息接收者。
  核验：原文支持；b00009将边定义为直接通信；b00010明确说明共享环境下并非每个智能体都需要下游接收者，边是可选通信通道。
  - [原文 2 Method · b00009](https://arxiv.org/html/2610.29292v1#S2.p2.1)：Its nodes are agents and its edges denote direct communication (and thereby the scheduling order).
  - [原文 2 Method · b00010](https://arxiv.org/html/2610.29292v1#S2.p3.1)：Since agents share an environment, not every agent needs a downstream consumer: edges are optional communication channels.
- 共享记忆：共享状态体现为环境中的持久产物；只有入口边的团队仍可经产物交互。六个选中编码团队中，三个没有智能体间边。
  核验：原文支持；b00044明确指出只有入口边的团队仍可经持久产物交互；b00025报告六个选中编码团队中三个没有智能体间边，b00043亦与之相符。
  - [原文 A.2 Selected Deployment Architectures · b00044](https://arxiv.org/html/2610.29292v1#A1.SS2.p1.1)：Because agents access a shared environment, teams with only entry edges can still interact through the persisted artifact.
  - [原文 3 Benchmarking · b00025](https://arxiv.org/html/2610.29292v1#S3.p6.1)：Every selected coding team retains a draft coder; 3 of 6 have no inter-agent edges, but agents can still interact through the shared environment.
- 调度方式：有向通信边同时约束执行调度顺序；归因器按任务并行运行。
  核验：原文支持；b00009明确将通信边与调度顺序关联；b00011明确归因器跨任务并行运行。
  - [原文 2 Method · b00009](https://arxiv.org/html/2610.29292v1#S2.p2.1)：Its nodes are agents and its edges denote direct communication (and thereby the scheduling order).
  - [原文 2 Method · b00011](https://arxiv.org/html/2610.29292v1#S2.p4.1)：The attributer sees task scores, length-capped agent outputs, tool calls, and the final artifact state (e.g., the coding environment), and runs in parallel across tasks.

## 自进化机制

- 改变对象：结构适应对象是链接概率及剪枝后的团队结构；模型、提示词、角色和工具均不更新。
  核验：原文支持；b00005直接说明更新链接概率并剪枝，同时保持模型、提示词、角色和工具不变。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：CATS then updates link probabilities, prunes weak links and unreachable agents, and selects one fixed team for deployment. Agent models, prompts, roles, and tools never change.
- 反馈来源：反馈是同题跨候选比较得到的[-1,1]个体信用；输入包括任务分数、受长度限制的输出、工具调用和最终产物。归因器并非读取完整轨迹：部分字段及组装后的提示均受截断限制。
  核验：原文支持；b00011支持同题跨候选信用及归因输入；b00051明确部分字段和组装后的提示均保留前缀并受长度限制。结论未将字段截断规则扩大到所有工具效果日志。
  - [原文 2 Method · b00011](https://arxiv.org/html/2610.29292v1#S2.p4.1)：An LLM attributer assigns each participating agent i in candidate k on task q a credit c_{k,q,i}\in[-1,1] (harmful to helpful) by comparing candidate rollouts on the same task.
  - [原文 2 Method · b00011](https://arxiv.org/html/2610.29292v1#S2.p4.1)：The attributer sees task scores, length-capped agent outputs, tool calls, and the final artifact state (e.g., the coding environment), and runs in parallel across tasks.
  - [原文 A.4 Evaluation Protocol · b00051](https://arxiv.org/html/2610.29292v1#A1.SS4.p1.1)：Field caps use o200k_base tokens, retain the prefix, discard the tail, and append the marker ... [truncated] outside the cap.
  - [原文 A.4 Evaluation Protocol · b00051](https://arxiv.org/html/2610.29292v1#A1.SS4.p1.1)：The assembled attributer prompt is also prefix-capped at its model limit minus the attribution field cap.
- 更新方式：对已触发边的logit加ηA，对指向活跃节点的未触发非源边logit加ηρA；每步删除概率低于δα₀的边及源节点不可达的节点。
  核验：原文支持；b00012的两条更新公式及剪枝集合与结论一致；A具体为目标节点在对应候选中的优势A_{k,v}。
  - [原文 2 Method · b00012](https://arxiv.org/html/2610.29292v1#S2.p5.1)：Each edge (u,v) fired in candidate k is updated by \theta_{uv}\leftarrow\theta_{uv}+\eta A_{k,v} . Unfired non-source edges into an active agent v receive a smaller secondary update \theta_{uv}\leftarrow\theta_{uv}+\eta\rho A_{k,v} .
  - [原文 2 Method · b00012](https://arxiv.org/html/2610.29292v1#S2.p5.1)：After each step we prune weak edges whose probability has fallen below the fraction \delta of its initial value (the pruning fraction ), E\leftarrow\{e\in E:\alpha_{e}\geq\delta\alpha_{0}\} , and remove nodes that are no longer reachable from the source.
- 发生阶段：变化发生在离线团队搜索阶段，随后部署固定团队。
  核验：原文支持；b00005明确把搜索定义为离线过程，并说明最终选择一个固定团队用于部署。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：an offline meta-agent that assembles teams from a fixed agent pool.
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：CATS then updates link probabilities, prunes weak links and unreachable agents, and selects one fixed team for deployment.
- 保留范围：离线搜索跨任务聚合信用、跨步骤累积拓扑先验，并将选中结构保留为固定部署团队；所给材料未描述部署期间跨任务持续学习。
  核验：原文支持；b00012支持跨任务聚合信用，b00013支持跨步骤累积先验，b00005支持固定部署结构。关于持续学习的表述限定为所给材料未描述，没有扩大为系统绝不具备此能力。
  - [原文 2 Method · b00012](https://arxiv.org/html/2610.29292v1#S2.p5.1)：Credits are normalized into per-agent advantages A_{k,i}=|Q_{k,i}|^{-1}\sum_{q\in Q_{k,i}}(c_{k,q,i}-b_{q}) , where Q_{k,i} holds the tasks with a credit for i in k and b_{q} is the mean credit over participating agents and candidates for task q .
  - [原文 2 Method · b00013](https://arxiv.org/html/2610.29292v1#S2.p6.1)：After T steps we return the best final candidate G^{\star}=\arg\max_{k}\tfrac{1}{N}\sum_{q}s_{k,q} over the step- T candidates, which are sampled under the accumulated priors.
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.29292v1#S1.p3.1)：selects one fixed team for deployment. Agent models, prompts, roles, and tools never change.
- 独立任务验证：三个数据集各有100道与搜索任务不重叠的保留评测题；编码按最终存储程序的隐藏测试评分，问答按最后提交答案精确匹配评分。
  核验：原文支持；b00053明确每个保留集含100题；b00054列出各基准的100道不重叠搜索任务及评分方式。结合b00055的保留集说明，支持搜索与评测分离、编码隐藏测试及问答最后提交答案精确匹配的表述。
  - [原文 A.4 Evaluation Protocol · b00053](https://arxiv.org/html/2610.29292v1#A1.T7)：Table 7 : Dataset splits and grading. Each held-out set contains 100 tasks.
  - [原文 A.4 Evaluation Protocol · b00054](https://arxiv.org/html/2610.29292v1#A1.T7.6)：BigCodeBench v0.1.4 Instruct, 100 disjoint tasks Last stored program against hidden tests MBPP Revision 4bb6404f , 100 disjoint tasks Last stored program against hidden tests HotpotQA distractor , 100 disjoint tasks Exact match on last submit_answer phrase

## 系统分析与启发（推测）

- 系统分析：离线搜索成本与部署成本应分别评价；MBPP的CATS搜索token高于随机搜索、部署token更低，因此总成本优势取决于部署调用量（b00016、b00063）。
- 系统分析：共享持久产物提供显式通信边之外的交互通道；无智能体间边不能解释为无协作。要识别通信边的收益，需要固定成员再比较边（b00044、b00045）。
- 系统分析：本文可作为离线结构适应的案例；固定团队部署及保留集成绩不能证明部署期间具有持续自进化能力（b00005、b00013、b00053）。

## 待研究问题（系统分析）

- 系统分析：给仅分数基线独立调参，并匹配总token或实际计算预算后，CATS的优势能否保持（b00014、b00030）？
- 系统分析：固定成员后，改变通信边能带来多少收益；节点信用与边级信用应如何公平比较（b00030、b00045）？
- 系统分析：更换模型家族、增加种子，或让攻击者针对归因器和截断窗口自适应时，结果是否稳定（b00029、b00032）？

## 缺失信息

- 未提供相关前作全文，无法独立确认创新优先权或完整核查与前作的差异。
- 所给分块未包含完整归因器调用、完整角色提示词及实现代码；b00064明确称其示例调用经过摘录。
- b00052明确说明端点未公开权重哈希和量化信息，精确模型配置未知。
- b00016已提供直接LLM和ReAct单智能体的具体成绩；但所给材料未见等预算单智能体比较，因此对应字段为null。
- 所给分块未见准确率差异的显著性检验或置信区间；b00052说明报告的是三次运行的样本标准差。
- 所给材料未描述部署期间持续学习或跨任务在线更新机制。
- 本卡片仅核读提供的原文分块，未执行或复现实验。

## 阅读范围

读取 2 / 2 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

An LLM multi-agent system (MAS) is only as good as the agents it chooses to trust: its accuracy and cost hinge on its topology, meaning which agents are included and how they communicate. A single task score, however, does not reveal which agents help or hinder performance. We propose Contrastive Attribution Topology Search (CATS), which searches for compact teams within a fixed supergraph of specialized agents. An LLM attributer compares execution traces across candidate topologies and assigns credit to individual agents. CATS uses these credits to update supergraph edges while progressively pruning weak edges and agents, yielding a small team for deployment. With small open-weight models and matched candidate evaluations, CATS improves mean accuracy on BigCodeBench by 5.3 percentage points over score-only heuristic search while using 54$\%$ fewer deployment tokens. On MBPP, CATS matches the strongest baselines with fewer tokens than the other searches. In a HotpotQA prompt-poisoning stress test, CATS excludes all adversarially prompted agents in all three runs, whereas random search retains some at comparable accuracy. Per-agent credit thus supports both team optimization and the pruning of potentially harmful agents.
