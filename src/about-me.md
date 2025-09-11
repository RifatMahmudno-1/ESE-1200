---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: '/passport_size.jpg',
    name: 'Rifat Mahmud',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/RifatMahmudno-1' },
      { icon: 'gmail', link: 'mailto:rifatmahmudpc@gmail.com' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamMembers :members />
  <VPTeamPageTitle>
    <template #lead>
    I am an undergraduate student pursuing a Bachelor's degree in Energy Science and Engineering. This project is a part of my academics. <br/> I'm always open to new opportunities, collaborations, and ideas. Feel free to reach out.
    </template>
  </VPTeamPageTitle>
</VPTeamPage>
