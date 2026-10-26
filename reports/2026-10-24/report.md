# Agent Paper Radar 日报 · 2026-10-24

时区：America/Los_Angeles
新增 1004 · 修订 0 · 新分析 4 · 来源失败 0
来源发现已完成；新增数表示本系统新收录的论文数。

## 推荐阅读

- [EvoAgent: Towards Automatic Multi-Agent Generation via Evolutionary Algorithms](https://arxiv.org/abs/2406.14228v3)
  针对人工设计限制智能体扩展的问题，EvoAgent 用 LLM 模拟进化算子，生成专业智能体并整合答案；作者报告多任务表现改善，例如 ScienceWorld 的 GPT-4 总体得分由27.97升至30.42。
  推荐依据：系统分析：适合关注自动角色生成与查询内配置进化的读者；c010—c015 提供多任务及消融证据，c016—c018 则明确成本与扩展限制，等预算收益仍值得核查。
- [Automated Design of Agentic Systems](https://arxiv.org/abs/2408.08435v2)
  针对智能体系统依赖人工调优的问题，作者提出 Meta Agent Search，以档案和验证性能引导元智能体迭代编写智能体代码，并报告其在多个问答任务及部分跨域、跨模型比较中优于所选基线。
  推荐依据：系统分析：适合深入研究代码级智能体自动设计和档案驱动搜索；优先核查预算公平性、测试集候选选择及独立搜索稳定性。
- [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](https://arxiv.org/abs/2308.08155v2)
  AutoGen 面向复杂 LLM 应用开发，以可会话智能体和会话编程组织模型、工具与人工协作；作者报告其在 MATH 全测试集上准确率为69.48%，原始 GPT-4 为55.18%。
  推荐依据：系统分析：适合研究多智能体接口、会话控制与工具反馈设计；具体应用对照有参考价值，但预算公平性及群聊报告不一致需要进一步核查。
