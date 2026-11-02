# DuplexAgent-RSI: Recursive Harness Improvement for Full-Duplex Voice Agent Collaboration

作者：Yingda Shen, Yuxiang Wang, Kunyu Feng, Qinke Ni, Jiaqi Li, Minghao Hsu, Junan Zhang, Dekun Chen, Yutong Bian, Zhizheng Wu
原文：https://arxiv.org/abs/2610.11299v1
首次提交：2026-10-08T06:06:42Z · 版本更新：2026-10-08T06:06:42Z
版本：v1 · 待核验 · 全文文本已读取（不含图像视觉核验）
复现状态：not_reproduced（未复现实验）


## 一句话读懂

- 针对全双工对话与异步任务的协调难题，DuplexAgent 将协调层拆为六个模块，以轨迹诊断、定向编辑和配对门控改进；作者报告十轮后固定核心协作分数由54.6升至85.3。
  核验：部分支持；六模块、诊断编辑闭环及54.6→85.3均有支持（b00098、b00088）；但该数值属于VoiceChat十轮活动（b00083），且协作分数排除感知失败（b00042—b00043），结论遗漏这些适用条件。
  - [原文 7 Conclusion · b00098](https://arxiv.org/html/2610.11299v1#S7.p1.1)：DuplexAgent keeps a full-duplex interaction model on the live channel and a delegation pool for reasoning and longer work, and writes their exchange as six editable modules: Policy, Intake, Hold, Worker, Deliver, and Memory.
  - [原文 7 Conclusion · b00098](https://arxiv.org/html/2610.11299v1#S7.p1.1)：The Exam Planner chooses the next conversations from attributed failures and the repair archive, the Harness Editor revises the modules the diagnosis names, and paired checks on the fixed core and the protection set decide what is kept.
  - [原文 Pooled editing, sequential editing, and RSI. · b00088](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px1.p3.1)：Qwen-Audio-Agent and g_{0} both score 54.6, with different rates of missed and extra delegation. One-shot Editing reaches 57.4 and Sequential Editing reaches 61.9. The ten-round checkpoint r_{10} reaches 85.3, improving on g_{0} by 30.7 points and on Sequential Editing by 23.4 points.

## 研究问题

- 实时对话中的任务修改要求系统更新当前任务、拒绝过时结果，并等待合适的发言时机。
  核验：原文支持；b00005明确描述任务修改场景中更新当前任务、拒绝过时结果和等待有效发言机会的要求。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.11299v1#S1.p2.1)：The system must revise the active task, reject the obsolete result, and wait for a valid speaking opportunity.
- 作者指出，重复故障的轨迹可能无法定位应修改委派、任务理解、后台执行还是交付，使局部修复难以隔离、评估和迁移。
  核验：原文支持；b00005直接支持故障轨迹难以定位应修改的环节，以及局部修复难以隔离、评估和迁移；结论保留了作者观点的归属。
  - [原文 1 Introduction · b00005](https://arxiv.org/html/2610.11299v1#S1.p2.1)：When the same failure recurs, a trace may not clearly identify whether delegation, task interpretation, background execution, or delivery should change. A bounded repair is then difficult to isolate, evaluate, and transfer.

## 方法怎样工作

- 将协调层拆为六个模块，用任务账本追踪身份、版本、状态和交付历史，防止迟到结果重新成为当前任务。
  核验：原文支持；b00098列出六个模块；b00026明确规定账本字段及迟到返回不能使过时任务重新成为当前任务。
  - [原文 7 Conclusion · b00098](https://arxiv.org/html/2610.11299v1#S7.p1.1)：DuplexAgent keeps a full-duplex interaction model on the live channel and a delegation pool for reasoning and longer work, and writes their exchange as six editable modules: Policy, Intake, Hold, Worker, Deliver, and Memory.
  - [原文 3.1 The collaboration harness · b00026](https://arxiv.org/html/2610.11299v1#S3.SS1.p3.1)：A session engine keeps a task ledger with the task identity, version, status, and delivery history. A task can be accepted, run, completed, delivered, cancelled, or replaced; a late delegate return is still recorded, but it cannot make an obsolete task current again.
- 先划分开发、保护和封存条目，再编排对话时序、执行延迟、任务转换和交付窗口；根据运行轨迹归因故障的原因、模块和交互模式。
  核验：原文支持；b00031支持先划分集合再编排时序、延迟或失败、任务转换与发言窗口；b00097支持按原因、模块和模式归因。
  - [原文 3.2 Composing test conversations · b00031](https://arxiv.org/html/2610.11299v1#S3.SS2.p4.1)：Items are assigned to development, protection, and sealed sets before temporal composition, so alternate forms of one case cannot cross an evaluation boundary.
  - [原文 3.2 Composing test conversations · b00031](https://arxiv.org/html/2610.11299v1#S3.SS2.p4.1)：A deterministic composer then places the turns on a timeline, specifies delegate delays or failures, records the required task transitions, and defines the speaking windows in which a result is admissible.
  - [原文 6 Discussion and limitations · b00097](https://arxiv.org/html/2610.11299v1#S6.p2.1)：The Observer has aligned speech, delegation, and delivery with the expected behaviour, and the Diagnoser has named the cause, the module, and the pattern.
- Planner 根据归因故障和档案规划后续测试，Editor 提出可检验修复；候选经开发与保护门控决定保留，接受及拒绝的尝试均归档。
  核验：原文支持；b00045—b00046、b00049—b00050及b00086支持基于诊断和档案规划测试、提出可检验修复、双重门控及归档接受与拒绝尝试。
  - [原文 Pooled editing, sequential editing, and RSI. · b00086](https://arxiv.org/html/2610.11299v1#S5.I1.i3.p1.1)：Each round plans an exam, runs and diagnoses it, edits the harness, and applies the development and protection gates. The Exam Planner and the Harness Editor use that round’s diagnosis and the repair archive.
  - [原文 3.4 Duplex-Harness-RSI · b00046](https://arxiv.org/html/2610.11299v1#S3.SS4.p2.1)：The editor must turn that evidence into a testable hypothesis: it identifies the decision that produced the failure, proposes a coherent change on the declared editable surfaces, and records what the change is expected to improve.
  - [原文 3.4 Duplex-Harness-RSI · b00050](https://arxiv.org/html/2610.11299v1#S3.SS4.p8.1)：The repair archive keeps exam plans, traces, candidate changes, rationales, and visible verdicts for both accepted and rejected attempts.

## 作者声称的贡献

- 作者自述贡献包括六模块全双工协作系统，以及复用服务用户的委派池进行测试规划、模块编辑和验证的递归改进闭环。
  核验：部分支持；b00010—b00011及b00098支持作者自述的六模块系统，以及复用委派池承担Planner和Editor角色；但验证由模拟与评估连接完成，原文未说明委派池也承担验证。
  - [原文 7 Conclusion · b00098](https://arxiv.org/html/2610.11299v1#S7.p1.1)：DuplexAgent keeps a full-duplex interaction model on the live channel and a delegation pool for reasoning and longer work, and writes their exchange as six editable modules: Policy, Intake, Hold, Worker, Deliver, and Memory.
  - [原文 Contributions. · b00011](https://arxiv.org/html/2610.11299v1#S1.I1.i2.p1.1)：Duplex-Harness-RSI. A recursive improvement loop that reuses the delegation pool. A reasoning LLM acts as Exam Planner, selecting tests from attributed failures and the repair archive. A coding agent acts as Harness Editor, revising the relevant modules.
- 作者自述提供可复用协作模拟器，以19种请求类型和22种交互模式组织覆盖，包含内容生成、时间编排、语音渲染和评估；不要求实例化所有组合。
  核验：原文支持；b00012明确报告模拟器的四项流程及19种请求类型、22种交互模式；b00030明确仅组合兼容配对，不要求覆盖每个单元。
  - [原文 Contributions. · b00012](https://arxiv.org/html/2610.11299v1#S1.I1.i3.p1.1)：A reusable collaboration simulator. An automatic pipeline for content generation, temporal composition, speech rendering, and evaluation, with coverage organized by nineteen request types and twenty-two interaction patterns.
  - [原文 3.2 Composing test conversations · b00030](https://arxiv.org/html/2610.11299v1#S3.SS2.p3.1)：Only compatible request–pattern pairs are composed. The grid organizes coverage without requiring every cell to be instantiated.

## 本文报告的方法比较

- 固定核心上，初始协调层及 Qwen-Audio-Agent 均为54.6，一次编辑为57.4，连续编辑为61.9，十轮 RSI 为85.3；连续编辑使用相同考试顺序，但省去逐轮诊断和修复档案。
  核验：部分支持；分数、考试顺序及连续编辑省略诊断和档案均符合b00085—b00088；但遗漏该比较属于VoiceChat活动（b00083）以及分数排除感知失败（b00042—b00043）的条件。
  - [原文 Pooled editing, sequential editing, and RSI. · b00085](https://arxiv.org/html/2610.11299v1#S5.I1.i2.p1.1)：Sequential Editing gives the same coding agent the exams from those ten rounds in their original order and performs ten successive revisions. It omits the per-round diagnosis and the repair archive used by Duplex-Harness-RSI.
  - [原文 Pooled editing, sequential editing, and RSI. · b00087](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px1.p2.1)：Figure 6 compares the resulting harnesses on the fixed core.
  - [原文 Pooled editing, sequential editing, and RSI. · b00088](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px1.p3.1)：Qwen-Audio-Agent and g_{0} both score 54.6, with different rates of missed and extra delegation. One-shot Editing reaches 57.4 and Sequential Editing reaches 61.9. The ten-round checkpoint r_{10} reaches 85.3, improving on g_{0} by 30.7 points and on Sequential Editing by 23.4 points.
- 两种交互模型接入系统后口语知识和 BFCL 均分提高，但存在权衡：VoiceChat 无关请求准确率下降，Qwen-Realtime 工具选择 F1 下降。
  核验：原文支持；b00079支持两种模型的OBQA、MMSU提高；b00073支持BFCL均分提高及VoiceChat无关请求指标、Qwen-Realtime选择F1下降。
  - [原文 The same handoff lifts a spoken choice and can drop the call. · b00079](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS2.Px1.p3.1)：OBQA rises from 54.2 to 80.6 on VoiceChat and from 86.3 to 92.1 on Qwen-Realtime; MMSU rises from 36.1 to 80.5 and from 64.8 to 82.7.
  - [原文 Executable calls require a precise handoff. · b00073](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS1.Px1.p4.1)：On VoiceChat, BFCL average rises from 53.5 to 75.8 and FDB-v3 from 60.2 / 26.2 / 16.0 to 97.4 / 57.0 / 47.0. Irrelevance falls from 95.0 to 90.0: recovering required calls also admits some unnecessary ones.
  - [原文 Executable calls require a precise handoff. · b00073](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS1.Px1.p4.1)：On Qwen-Realtime, BFCL average rises from 82.0 to 90.8, parallel-multiple from 66.0 to 78.0, and irrelevance from 85.0 to 100.0. Selection F1 moves from 87.0 to 84.8, while argument accuracy rises from 47.8 to 55.0 and Pass@1 from 39.0 to 49.0

## 实验证据与条件

任务：VoiceBench 的 OBQA、MMSU 口语多选题
基础模型：VoiceChat、Qwen-Realtime；推理委派模型 DeepSeek-v4-flash
比较基线：对应独立交互模型
指标：解析回答选项并与参考答案比较的准确率
结果：VoiceChat：OBQA 54.2→80.6，MMSU 36.1→80.5；Qwen-Realtime：OBQA 86.3→92.1，MMSU 64.8→82.7。
资源条件：未报告 / 未提取
- 口语知识外部评测：作者报告两种交互模型接入系统后准确率均提高。
  核验：原文支持；任务和评分方法符合b00060；两种模型的四组准确率符合b00079，独立模型比较范围及委派模型配置可由b00064、b00054核对。该结论是作者报告，并非复现结果。
  - [原文 Spoken knowledge. · b00060](https://arxiv.org/html/2610.11299v1#S5.SS1.SSS0.Px1.p1.1)：We use OpenBookQA (OBQA) and Massive Multi-task Spoken Understanding (MMSU) from VoiceBench ( Chen et al., 2024 ) . Both present spoken multiple-choice questions.
  - [原文 Spoken knowledge. · b00060](https://arxiv.org/html/2610.11299v1#S5.SS1.SSS0.Px1.p1.1)：The response is parsed for an option letter and compared with the reference.
  - [原文 The same handoff lifts a spoken choice and can drop the call. · b00079](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS2.Px1.p3.1)：OBQA rises from 54.2 to 80.6 on VoiceChat and from 86.3 to 92.1 on Qwen-Realtime; MMSU rises from 36.1 to 80.5 and from 64.8 to 82.7.
  - [原文 4 Implementation · b00054](https://arxiv.org/html/2610.11299v1#S4.p2.1)：In the reported setup, DeepSeek-v4-flash handles reasoning and general delegated work, while Codex supplies coding capability.
任务：BFCL-v3、FDB-v3 工具调用
基础模型：VoiceChat、Qwen-Realtime
比较基线：对应独立交互模型
指标：BFCL 五个子集的非加权均分；FDB-v3 工具选择 F1、参数准确率、Pass@1
结果：VoiceChat：BFCL 53.5→75.8，FDB-v3 60.2/26.2/16.0→97.4/57.0/47.0；Qwen-Realtime：BFCL 82.0→90.8，FDB-v3 87.0/47.8/39.0→84.8/55.0/49.0。
资源条件：使用 RSI 后协调层；比较采用相同波形、schema 和检查。
- 工具外部评测：BFCL 均分和 FDB-v3 Pass@1 均提高，但存在指标间权衡。
  核验：原文支持；b00061—b00062支持任务范围和指标定义；b00073支持全部数值、指标权衡以及RSI后协调层采用相同波形、schema和检查的条件，比较范围符合b00064。
  - [原文 Executable tool use. · b00061](https://arxiv.org/html/2610.11299v1#S5.SS1.SSS0.Px2.p1.1)：The BFCL evaluation ( Patil et al., 2025 ) uses spoken requests from five single-turn subsets in the v3 release: simple, multiple, parallel, parallel-multiple, and irrelevance.
  - [原文 Executable tool use. · b00061](https://arxiv.org/html/2610.11299v1#S5.SS1.SSS0.Px2.p1.1)：We report each subset and their unweighted mean.
  - [原文 Executable tool use. · b00062](https://arxiv.org/html/2610.11299v1#S5.SS1.SSS0.Px2.p2.1)：Selection F1 measures agreement between expected and selected calls. Argument accuracy uses strict character-level exact-string matching, and Pass@1 requires the correct tool set with every argument matching exactly.
  - [原文 Executable calls require a precise handoff. · b00073](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS1.Px1.p4.1)：On VoiceChat, BFCL average rises from 53.5 to 75.8 and FDB-v3 from 60.2 / 26.2 / 16.0 to 97.4 / 57.0 / 47.0. Irrelevance falls from 95.0 to 90.0: recovering required calls also admits some unnecessary ones.
  - [原文 Executable calls require a precise handoff. · b00073](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS1.Px1.p4.1)：On Qwen-Realtime, BFCL average rises from 82.0 to 90.8, parallel-multiple from 66.0 to 78.0, and irrelevance from 85.0 to 100.0. Selection F1 moves from 87.0 to 84.8, while argument accuracy rises from 47.8 to 55.0 and Pass@1 from 39.0 to 49.0
  - [原文 Executable calls require a precise handoff. · b00073](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS1.Px1.p4.1)：Those rules are the harness after Duplex-Harness-RSI (Section 5.3 ), scored on the same waveforms, schemas, and checks as the other rows.
任务：FDB-v1 双工交互
基础模型：VoiceChat、Qwen-Realtime
比较基线：对应独立交互模型
指标：pause TOR 越低越好；turn TOR、interrupt TOR 越高越好
结果：VoiceChat：synthetic/Candor pause 0.162/0.343→0.117/0.241，turn/interrupt 0.983/1.000→0.961/0.965。Qwen-Realtime：turn/interrupt 0.898/0.890→0.966/0.970，Candor pause 0.278→0.231，synthetic pause 0.074→0.147。
资源条件：输入按实时时钟流式传输，输出语音与评估窗口对齐。
- 双工评测中改善与退步并存。
  核验：原文支持；b00063支持流式输入、窗口对齐及TOR方向；b00080支持全部数值，确实同时存在改善和退步。
  - [原文 Duplex timing. · b00063](https://arxiv.org/html/2610.11299v1#S5.SS1.SSS0.Px3.p1.1)：We use FDB-v1 ( Lin et al., 2025b ) pause handling, turn taking, and user interruption. Input is streamed on a realtime clock; output speech is aligned to the evaluation windows.
  - [原文 Duplex timing. · b00063](https://arxiv.org/html/2610.11299v1#S5.SS1.SSS0.Px3.p1.1)：Lower pause TOR means fewer premature responses during a hesitation. Higher turn TOR and interrupt TOR mean the system responds more often after a completed turn or an interruption.
  - [原文 Timing remains a separate constraint. · b00080](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS2.Px2.p1.1)：With VoiceChat, synthetic and Candor pause TOR fall from 0.162/0.343 to 0.117/0.241, while turn TOR and interrupt TOR decline slightly from 0.983/1.000 to 0.961/0.965.
  - [原文 Timing remains a separate constraint. · b00080](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS2.Px2.p1.1)：With Qwen-Realtime, turn TOR rises from 0.898 to 0.966 and interrupt TOR from 0.890 to 0.970. Candor pause TOR improves from 0.278 to 0.231, but synthetic pause TOR worsens from 0.074 to 0.147.
任务：模拟对话固定核心上的协调层改进消融
基础模型：VoiceChat；Harness Editor 为使用 gpt-5.6-sol 的 Codex
比较基线：初始协调层 g0、Qwen-Audio-Agent、One-shot Editing、Sequential Editing
指标：协作分数 Q：排除感知失败后的成功百分比
结果：初始协调层及 Qwen-Audio-Agent 54.6；One-shot 57.4；Sequential 61.9；RSI r10 85.3，较初始层和 Sequential 分别提高30.7、23.4个百分点。
资源条件：共享十轮考试材料；One-shot 编辑一次，Sequential 连续编辑十次；RSI 每轮三个候选、最多两次细化，固定核心占40%，每轮新条目预算30。
- VoiceChat 协调层消融：十轮 RSI 的固定核心分数高于初始层、一次编辑及缺少诊断和档案的连续编辑。
  核验：原文支持；b00083—b00088支持VoiceChat消融、共享考试材料、编辑次数和各组分数；b00043、b00058分别支持排除感知失败的指标及所列候选、细化和采样预算。未据此声称计算预算相等。
  - [原文 Pooled editing, sequential editing, and RSI. · b00083](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px1.p1.1)：We compare three ways of using the same exam material to improve the initial VoiceChat harness g_{0} :
  - [原文 Pooled editing, sequential editing, and RSI. · b00084](https://arxiv.org/html/2610.11299v1#S5.I1.i1.p1.1)：One-shot Editing pools all test cases encountered during the ten-round RSI campaign and gives them to the coding agent for one harness revision.
  - [原文 Pooled editing, sequential editing, and RSI. · b00085](https://arxiv.org/html/2610.11299v1#S5.I1.i2.p1.1)：Sequential Editing gives the same coding agent the exams from those ten rounds in their original order and performs ten successive revisions. It omits the per-round diagnosis and the repair archive used by Duplex-Harness-RSI.
  - [原文 Pooled editing, sequential editing, and RSI. · b00087](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px1.p2.1)：Figure 6 compares the resulting harnesses on the fixed core.
  - [原文 Pooled editing, sequential editing, and RSI. · b00088](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px1.p3.1)：Qwen-Audio-Agent and g_{0} both score 54.6, with different rates of missed and extra delegation. One-shot Editing reaches 57.4 and Sequential Editing reaches 61.9. The ten-round checkpoint r_{10} reaches 85.3, improving on g_{0} by 30.7 points and on Sequential Editing by 23.4 points.
  - [原文 3.3 Trace-based diagnosis and collaboration score · b00043](https://arxiv.org/html/2610.11299v1#S3.E4)：Q=\text{percentage of successes, excluding perception failures}. (4)
  - [原文 4 Implementation · b00058](https://arxiv.org/html/2610.11299v1#S4.T3.2)：Adaptive exam Fixed core share 40%; fresh-item budget of 30 per round, with weighted sampling of the remaining cases. Harness Editor Codex using gpt-5.6-sol ; three candidates and up to two refinement attempts per round.
任务：独立协调层递归改进活动
基础模型：Qwen-Realtime
比较基线：该活动的初始协调层 g0
指标：协作分数 Q：排除感知失败后的成功百分比
结果：g0 47.1→g8 84.8，提高37.7个百分点。
资源条件：八个保留版本。
- 独立 Qwen-Realtime 改进活动在八个保留版本后提高37.7个百分点；保留版本数不能直接当作轮数。
  核验：原文支持；b00090明确区分独立Qwen-Realtime活动与VoiceChat活动，报告47.1→84.8及37.7个百分点，并明确保留版本数不同于完成轮数；指标定义符合b00043。
  - [原文 Version lineage and progress. · b00090](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px2.p1.1)：Figure 7 follows the Qwen-Realtime campaign. It is separate from the VoiceChat checkpoint r_{10} : each attachment has its own initial harness and its own sequence of exams.
  - [原文 Version lineage and progress. · b00090](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px2.p1.1)：Here the initial harness g_{0} scores 47.1. Eight retained versions later, g_{8} scores 84.8, a gain of 37.7 points.
  - [原文 Version lineage and progress. · b00090](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px2.p1.1)：g_{k} counts retained versions and r_{t} counts completed rounds, so a round can finish without producing a new g_{k} .
  - [原文 3.3 Trace-based diagnosis and collaboration score · b00043](https://arxiv.org/html/2610.11299v1#S3.E4)：Q=\text{percentage of successes, excluding perception failures}. (4)

## 原文支持的局限性

- 作者明确指出，模块修复不改变交互模型对重叠语音的感知和话轮结束判断；协作分数排除了模型未感知输入的运行。
  核验：原文支持；b00097直接说明模块修复不改变模型的重叠语音感知和话轮结束判断；b00042明确将未感知输入的运行排除。
  - [原文 6 Discussion and limitations · b00097](https://arxiv.org/html/2610.11299v1#S6.p2.1)：A repair can require silence before speech, or a complete question before delegation, while the model’s perception of overlapped speech and its own judgement that a turn has ended remain as they were.
  - [原文 3.3 Trace-based diagnosis and collaboration score · b00042](https://arxiv.org/html/2610.11299v1#S3.SS3.p4.1)：Runs in which the interaction model fails to perceive the input are excluded, because that failure is outside the harness revision.
- 作者报告漏委派从30.3%降至1.3%，额外委派从3.9%升至6.6%，忽略控制仍为5.3%；过宽的交付超时或直接回答规则会引入新故障。
  核验：部分支持；全部百分比和过宽规则可能引发故障的描述符合b00089、b00095；但百分比针对VoiceChat活动固定核心条目，而结论未保留该样本及活动范围（b00083—b00089）。
  - [原文 Pooled editing, sequential editing, and RSI. · b00089](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px1.p4.1)：Missed delegation falls from 30.3% of items in the fixed core under g_{0} to 1.3% under Duplex-Harness-RSI. Extra delegation rises from 3.9% to 6.6%, and ignored control stays at 5.3%.
  - [原文 What the modules learned. · b00095](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px3.p2.1)：A broad delivery timeout can introduce other speech conflicts, and a broad direct-answer rule can miss required delegation.
- 作者限定证据范围：外部比较测量委派与协调层的合并效果；各模块修复的百分比降幅来自对应局部考试。
  核验：原文支持；b00059明确外部比较测量委派与协调层的合并效果；b00092明确模块修复百分比来自测试各项修复的局部考试。
  - [原文 5 Experiments · b00059](https://arxiv.org/html/2610.11299v1#S5.p1.1)：We evaluate the complete system on external tasks and examine harness revision separately on simulator conversations. External comparisons measure the combined effect of delegation and the harness.
  - [原文 What the modules learned. · b00092](https://arxiv.org/html/2610.11299v1#S5.SS3.SSS0.Px3.p1.1)：These percentages come from the local exam used to test each repair.

## 多智能体机制

- 角色与分工：交互模型负责实时听说，委派池异步执行长任务，协调层维护任务身份、时序和上下文；DeepSeek-v4-flash 兼任推理执行者与 Planner，Codex 兼任编码执行者与 Editor。
  核验：原文支持；b00018支持实时交互、异步长任务及协调层职责；b00054明确报告DeepSeek-v4-flash和Codex在服务与改进阶段的双重角色。
  - [原文 3 Method · b00018](https://arxiv.org/html/2610.11299v1#S3.p1.2)：F listens and speaks on the user-facing channel, members of B carry out longer jobs asynchronously, and H maintains the identity, timing, and context of the work between them.
  - [原文 4 Implementation · b00054](https://arxiv.org/html/2610.11299v1#S4.p2.1)：In the reported setup, DeepSeek-v4-flash handles reasoning and general delegated work, while Codex supplies coding capability. During Duplex-Harness-RSI, DeepSeek-v4-flash is reused as the Exam Planner and Codex as the Harness Editor.
- 协作结构：会话引擎用任务账本管理接受、执行、完成、交付、取消及替换；迟到返回会被记录，但不能恢复过时任务。
  核验：原文支持；b00026完整列出任务状态，并明确迟到结果仍被记录但不能恢复过时任务。
  - [原文 3.1 The collaboration harness · b00026](https://arxiv.org/html/2610.11299v1#S3.SS1.p3.1)：A session engine keeps a task ledger with the task identity, version, status, and delivery history. A task can be accepted, run, completed, delivered, cancelled, or replaced; a late delegate return is still recorded, but it cannot make an obsolete task current again.
- 通信机制：Worker 按能力选择委派者，传递当前目标、相关上下文和结果契约；结果通过交互模型返回。
  核验：原文支持；b00054支持按能力选委派者及传递目标、上下文和结果契约；b00047将结果通过交互模型返回列为不变量。
  - [原文 4 Implementation · b00054](https://arxiv.org/html/2610.11299v1#S4.p2.1)：Worker selects a delegate according to the requested capability and supplies the current goal, relevant context, and a result contract.
  - [原文 3.4 Duplex-Harness-RSI · b00047](https://arxiv.org/html/2610.11299v1#S3.SS4.p5.1)：results return through the interaction model; and test reference answers do not enter its prompt.
- 共享记忆：Memory 管理对话与后台任务的共享上下文，包括话轮组装、保留、压缩和重置恢复，并保留工具调用所需标识符与约束。
  核验：原文支持；b00025支持Memory的共享上下文、话轮组装、保留、压缩和重置恢复职责；b00073支持保留标识符与约束。
  - [原文 3.1 The collaboration harness · b00025](https://arxiv.org/html/2610.11299v1#S3.T1.2)：Memory Context shared by conversation and background work Turn assembly, retention, compaction, reset recovery
  - [原文 Executable calls require a precise handoff. · b00073](https://arxiv.org/html/2610.11299v1#S5.SS2.SSS1.Px1.p4.1)：Worker receives the official schema and the arguments carried by the user turn, and Memory retains the identifiers and constraints that a title or a short restatement drops.
- 调度方式：长任务异步执行，当前结果等待发言窗口才交付；改进阶段 Planner 离线运行，Editor 在隔离工作区运行。
  核验：原文支持；b00018支持异步执行长任务，b00027及b00073支持当前结果等待发言窗口，b00054支持Planner离线和Editor隔离运行。
  - [原文 3 Method · b00018](https://arxiv.org/html/2610.11299v1#S3.p1.2)：F listens and speaks on the user-facing channel, members of B carry out longer jobs asynchronously, and H maintains the identity, timing, and context of the work between them.
  - [原文 3.1 The collaboration harness · b00027](https://arxiv.org/html/2610.11299v1#S3.SS1.p4.1)：When Tetris becomes ready, Deliver waits for a speaking window and returns the current result through the interaction model.
  - [原文 4 Implementation · b00054](https://arxiv.org/html/2610.11299v1#S4.p2.1)：The planner runs offline, and the editor runs in an isolated workspace that contains the incumbent harness and the visible part of the repair archive.

## 自进化机制

- 改变对象：更新对象是六个协调模块的指令与可执行规则，模型权重固定；会话引擎、适配器契约、模拟器及评分规则不在编辑权限内。
  核验：原文支持；b00056、b00097支持仅修订六模块规则且权重固定；b00047明确会话引擎、适配器契约、模拟器和评分规则不在编辑权限内。
  - [原文 4 Implementation · b00056](https://arxiv.org/html/2610.11299v1#S4.p4.1)：The six harness modules are revised, and the model weights stay fixed.
  - [原文 6 Discussion and limitations · b00097](https://arxiv.org/html/2610.11299v1#S6.p2.1)：Duplex-Harness-RSI rewrites module instructions and executable rules, and the interaction-model weights stay fixed.
  - [原文 3.4 Duplex-Harness-RSI · b00047](https://arxiv.org/html/2610.11299v1#S3.SS4.p5.1)：The session engine, adapter contracts, simulator, and scoring rules are outside the editor’s write surfaces.
- 反馈来源：反馈包括轨迹、分数、失败签名、代表案例和可见档案；诊断器按固定优先级选终结原因，并利用中间决策与返回内容修正模块归因。
  核验：原文支持；b00046逐项列出Editor获得的证据；b00038明确固定优先级终结原因、默认模块映射及利用中间决策和返回内容修正归因。
  - [原文 3.4 Duplex-Harness-RSI · b00046](https://arxiv.org/html/2610.11299v1#S3.SS4.p2.1)：Its trace, score, failure signature, representative cases, and the visible part of the repair archive form the evidence given to the Harness Editor.
  - [原文 3.3 Trace-based diagnosis and collaboration score · b00038](https://arxiv.org/html/2610.11299v1#S3.SS3.p2.2)：The Diagnoser first identifies failure flags and then selects one terminal cause in a fixed priority order. A default mapping assigns that cause to a module, and intermediate decisions and returned payloads can revise the assignment.
- 更新方式：Editor 提出修复假设并与当前版本同题配对评估；仅因未感知输入而失败的运行不计协调层损失。开发门要求 wins>losses、不变量保持且原因级回归在容差内；保护门要求 wins≥losses 且不变量保持；拒绝不替换当前版本。
  核验：原文支持；b00046、b00048—b00049直接支持修复假设、同题配对、仅感知失败的排除规则、两道门的不同胜负要求及拒绝后不替换当前版本。
  - [原文 3.4 Duplex-Harness-RSI · b00046](https://arxiv.org/html/2610.11299v1#S3.SS4.p2.1)：The editor must turn that evidence into a testable hypothesis: it identifies the decision that produced the failure, proposes a coherent change on the declared editable surfaces, and records what the change is expected to improve.
  - [原文 3.4 Duplex-Harness-RSI · b00048](https://arxiv.org/html/2610.11299v1#S3.SS4.p6.1)：The incumbent and the candidate are evaluated on the same exam. A win is an incumbent failure that the candidate makes acceptable; a loss is the reverse. A run that fails only because the interaction model did not perceive the input is not counted as a harness loss.
  - [原文 3.4 Duplex-Harness-RSI · b00049](https://arxiv.org/html/2610.11299v1#S3.SS4.p7.1)：The development gate requires more wins than losses, preserved invariants, and cause regressions within a fixed tolerance.
  - [原文 3.4 Duplex-Harness-RSI · b00049](https://arxiv.org/html/2610.11299v1#S3.SS4.p7.1)：The protection gate requires at least as many wins as losses and preserved invariants. Protection traces stay hidden from the editor. A rejected candidate does not replace the incumbent.
- 发生阶段：改进以模拟测试轮次进行，每轮运行实时交互模型与委派池；规划离线完成，编辑在隔离工作区进行，权重保持固定。
  核验：原文支持；b00059支持在模拟对话中研究协调层修订；b00056支持每轮运行实际交互模型与委派池且权重固定；b00054支持离线规划和隔离编辑。
  - [原文 5 Experiments · b00059](https://arxiv.org/html/2610.11299v1#S5.p1.1)：We evaluate the complete system on external tasks and examine harness revision separately on simulator conversations.
  - [原文 4 Implementation · b00056](https://arxiv.org/html/2610.11299v1#S4.p4.1)：Each round runs the live interaction model and the delegation pool. The six harness modules are revised, and the model weights stay fixed.
  - [原文 4 Implementation · b00054](https://arxiv.org/html/2610.11299v1#S4.p2.1)：The planner runs offline, and the editor runs in an isolated workspace that contains the incumbent harness and the visible part of the repair archive.
- 保留范围：同一改进活动内跨轮保留协调层版本与接受、拒绝尝试的档案，用于后续测试和修复；跨独立活动或长期部署的持续性未在所给材料中交代。
  核验：原文支持；b00050—b00051支持活动内版本保留、接受与拒绝尝试归档及跨轮复用。所给文本未交代跨独立活动或长期部署的持久化机制，结论正确限定为本次材料的信息缺口。
  - [原文 3.4 Duplex-Harness-RSI · b00051](https://arxiv.org/html/2610.11299v1#S3.SS4.p9.1)：Rejection keeps the current version, and a repair that touches several modules still creates one retained version.
  - [原文 3.4 Duplex-Harness-RSI · b00050](https://arxiv.org/html/2610.11299v1#S3.SS4.p8.1)：The repair archive keeps exam plans, traces, candidate changes, rationales, and visible verdicts for both accepted and rejected attempts. In Figure 2 , experience is this archive carried into the next round.
  - [原文 3.4 Duplex-Harness-RSI · b00050](https://arxiv.org/html/2610.11299v1#S3.SS4.p8.1)：The Exam Planner and the Harness Editor use it to avoid repeating unsuccessful changes and to build on repairs that have already helped.
- 独立任务验证：内容在时间组合前按60/20/20分为开发、保护和封存集；通过开发门后另行执行保护集检查，保护轨迹对编辑器隐藏。所给材料未提供封存集最终结果。
  核验：原文支持；b00058明确时间组合前按60/20/20划分；b00049明确通过开发门后另行执行保护检查且隐藏保护轨迹。提供的原文块未见封存集最终结果，结论未将此扩大为全文没有报告。
  - [原文 4 Implementation · b00058](https://arxiv.org/html/2610.11299v1#S4.T3.2)：Content bank Content split before temporal composition into development, protection, and sealed sets (60/20/20).
  - [原文 3.4 Duplex-Harness-RSI · b00049](https://arxiv.org/html/2610.11299v1#S3.SS4.p7.1)：A candidate that passes is checked on the protection set in separate executions. The protection gate requires at least as many wins as losses and preserved invariants. Protection traces stay hidden from the editor.

## 系统分析与启发（推测）

- 系统分析：任务账本和编辑权限边界使协调错误具有明确的检查对象；这不构成相对前作的首创性认定（依据 b00026、b00047）。
- 系统分析：Sequential 同时移除了逐轮诊断与修复档案，现有消融无法独立估计两者各自贡献；相同考试材料也不等于相同计算预算（依据 b00085、b00088、b00058）。
- 系统分析：固定核心被反复用于考试，保护集参与版本保留，而 Q 与配对损失排除了相应感知失败；固定核心提升不能替代封存集泛化或包含感知失败的端到端证据（依据 b00031、b00042、b00048、b00049）。

## 待研究问题（系统分析）

- 系统分析：在相同调用次数、token、运行时间或费用预算下，完整 RSI 相对连续编辑和单智能体是否仍有优势？
- 系统分析：封存集、新交互模式及包含感知失败的端到端评测能否保持收益？
- 系统分析：分别移除诊断、档案、自适应测试规划及保护门后，各机制的独立收益和回归风险是多少？

## 缺失信息

- 所给原文块未提供各评测样本量、随机种子、重复次数、置信区间或显著性检验；数值变化不作统计显著性解释。
- 所给原文块未提供推理、编辑及评测的时间、token、费用或硬件成本，也未提供等预算单智能体比较。
- 已提供开发、保护和封存划分及门控规则，但所给原文块未提供封存集最终结果、保护集分数、原因级回归容差数值及采样权重调整界限。
- 所给原文块未提供 Qwen-Realtime 达到 g8 的总轮数、完整候选接受拒绝历史，以及局部修复百分比对应的失败计数和分母。
- 所给原文块未交代修复档案跨独立活动或长期部署的保留期限和持续改进效果。
- 未提供前作全文及完整基线实现配置，无法独立核验首次性、创新性或前作机制解释；本次仅依据所给原文块修订卡片，未复现实验。

## 阅读范围

读取 3 / 3 个分块。
全文指已提取的文本块；图片、图表视觉、公式和部分算法环境未独立核验。
未复现实验；发表信息如有列出，来自作者且未独立核实。

## 原文摘要

Voice agents are converging on a collaboration pattern: a full-duplex interaction model stays on the live channel as the entry to the conversation, while search, reasoning, and coding are handled through asynchronous delegation. A duplex model supports continuous listening and speaking, but complex reasoning and tool use may exceed its capabilities. A coding agent can plan and execute extended tasks, but its sequential interface is a poor fit for live conversation. Combining them requires a harness that coordinates task acceptance, progress, cancellation, replacement, and result delivery while keeping the conversation responsive. Existing harnesses often rely on coupled heuristics, making them difficult to improve systematically from evidence. We present DuplexAgent, a full-duplex collaboration system whose harness expresses this workflow as six editable modules, and Duplex-Harness-RSI, a closed loop that revises them from interaction traces. A simulator automatically generates timed test conversations, runs the system, and produces failure traces that identify the collaboration modules requiring repair. Reasoning LLMs and coding agents in the delegation pool also serve the improvement loop: the Exam Planner selects the next tests from observed weaknesses and the repair archive, and the Harness Editor proposes targeted module changes. The capabilities that serve the user thus also improve the system's coordination. Experiments on intelligence, agentic, and duplex benchmarks show that DuplexAgent combines continuous interaction with difficult reasoning and complex task execution, achieving stronger spoken-knowledge and executable-tool scores than the compared delegated systems while maintaining strong interruption response. A harness ablation further shows that this modular, verifiable loop outperforms the initial harness and repeated editing that lacks its diagnosis and repair archive.
