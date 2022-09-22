import * as React from 'react'
import { IoCalendar, IoGrid, IoHelpBuoy } from 'react-icons/io5'
import { MdWeb } from 'react-icons/md'

export const links = [
  { label: 'Shows', href: '/shows' },
  // { label: 'Analytics', href: '/analytics' },
  { label: 'Scorecards', href: '/scorecards' },
  {
    label: 'FightCloud',
    children: [
      // {
      //   label: 'Fighter Talk',
      //   description: 'Fighters discuss all things fighting.',
      //   href: '/discussions',
      //   icon: <IoGrid />,
      // },
      // {
      //   label: 'Latest Boxing News',
      //   description: 'Updated in real-time.',
      //   href: '/news',
      //   icon: <IoHelpBuoy />,
      // },
      {
        label: 'Blog',
        description: 'Get the latest boxing insights from the team.',
        href: '/blog',
        icon: <MdWeb />,
      },
      {
        label: 'FightSync Live!',
        description: 'The boxing trivia game show you can play, too!',
        href: '/live',
        icon: <IoCalendar />,
      },
    ],
  }
]