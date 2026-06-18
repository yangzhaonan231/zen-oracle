<template>
  <div>
    <UPageHero
      title="Zen Oracle"
      description="融合八字命理、堪舆风水、奇门遁甲与脑神经科学，以东方千年智慧为根基、现代科学为佐证，探索身心平衡与命运之道。"
      :links="[{
        label: '开始探索',
        to: '/#features',
        color: 'primary',
        size: 'xl',
        trailingIcon: 'i-lucide-arrow-right'
      }, {
        label: '了解更多',
        to: '/#features',
        color: 'neutral',
        size: 'xl',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      id="features"
      title="核心服务"
      description="六位一体，从传统玄学到现代心理，全方位守护你的身心与运势。"
      :features="[{
        icon: 'i-lucide-compass',
        title: '命理堪舆',
        description: '八字命盘精解 + 居家风水布局，从先天命格到后天环境，为你揭示人生轨迹与空间能量的奥秘。'
      }, {
        icon: 'i-lucide-shield',
        title: '奇门遁甲',
        description: '上古三式之首，融汇天时、地利、人和，为重大决策提供精准的时空择吉与策略参考。'
      }, {
        icon: 'i-lucide-heart-handshake',
        title: '心理咨询',
        description: '结合东方心性修养与西方心理学，提供专业情绪管理与心理疏导，助你走出低谷、找回内在力量。'
      }, {
        icon: 'i-lucide-messages-square',
        title: '聊天应用',
        description: '随时随地与AI玄学助手对话，获取即时命理解读、风水建议与情绪陪伴，让智慧触手可及。'
      }, {
        icon: 'i-lucide-book-open',
        title: '文档站',
        description: '系统化命理知识库：八字入门、风水要诀、奇门基础、冥想指南，从零开始学玄学。'
      }, {
        icon: 'i-lucide-clock',
        title: '更新日志',
        description: '持续迭代进化，追踪每一次功能更新与内容扩充，见证 Zen Oracle 与你共同成长。'
      }]"
    />

    <UPageSection>
      <UPageCTA
        title="准备好探索命运的奥秘了吗？"
        description="无论你是想了解自己的命盘、改善居家风水，还是寻求心灵的平静，Zen Oracle 都会是你最可靠的向导。"
        variant="subtle"
        :links="[{
          label: '立即开始',
          to: '/#features',
          color: 'primary',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl'
        }, {
          label: '阅读文档',
          to: '/docs',
          target: '_blank',
          icon: 'i-lucide-book-open',
          color: 'neutral',
          size: 'xl',
          variant: 'outline'
        }]"
      />
    </UPageSection>
  </div>
</template>
