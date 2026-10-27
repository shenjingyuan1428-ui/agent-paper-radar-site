# Agent Paper Radar 日报 · 2026-10-27

时区：Asia/Taipei
新增 0 · 修订 0 · 新分析 3 · 来源失败 0
当日未完成来源发现，不能据此判断没有新论文。

## 推荐阅读

- [Credit Where Credit Is Due: Contrastive Attribution Topology Search for Multi-Agent Systems](https://arxiv.org/abs/2610.29292v1)
  针对团队分数难以识别个体贡献的问题，CATS从固定智能体池出发，以跨候选轨迹归因更新通信边概率并剪枝；作者报告，在候选评估次数匹配时，BigCodeBench准确率比仅分数搜索高5.3个百分点，部署token少54%。
  推荐依据：系统分析：本文直接涉及多智能体筛选、信用反馈和离线结构适应；应重点审查预算公平性、归因有效性及通信边的独立收益（b00005、b00014、b00030、b00045）。
- [HarnessPro: Recursive Harness Self-Improvement with Pareto Optimization for Performance-Cost Trade-offs](https://arxiv.org/abs/2610.26770v2)
  HarnessPro 针对递归改进 harness 的性能—成本权衡，以多智能体诊断、生成测试和三档候选选择进行无标签进化；作者报告 GPT-5.5＋Codex 下 heavy 相对 RHO 平均提高通过率2.0个百分点、降低每任务成本26.1%。
  推荐依据：系统判断：对关注多智能体 harness 自进化及性能—成本权衡的研究较有参考价值；所给材料包含候选选择、留出测试和组件消融证据，但总进化成本与等预算归因仍需核验。
- [Which Agent's Skill Should Change? Group-Relative Credit Assignment for Evolving Multi-Agent Teams](https://arxiv.org/abs/2610.27227v1)
  GRSE针对团队奖励难以归因到具体技能的问题，通过同题多次执行对比、结构化诊断和验证门控更新技能；作者报告其在HotpotQA及LoCoMo非开放域类别优于MASkills，LoCoMo多跳F1分别提升6.7和3.2。
  推荐依据：系统判断：同题行为比较、技能更新门控和污染修复与多智能体自进化高度相关；优先核对预算差异、观察性归因及内部数值冲突。
