import {Flex, Button } from 'antd-mobile';
import Router from 'next/router'
import Link from 'next/link'

import { imgBase }  from '../../utils'
import './TabBottom.less';

const IconBox = (icon) => {
  return (
    <div className="icon-box">
      <img src={icon} />
    </div>
  )
}


const tabData = [
  {title: "首页", href: '/index', icon: `${imgBase}/home-icon.png`, selectedIcon: `${imgBase}/home-icon-a.png`  },
  // {title: "关注", href: '/guanzhu', icon: `${imgBase}/guzhu-icon.png`, selectedIcon: `${imgBase}/guzhu-icon-a.png`  },
  {title: "MBI", href: "/brandrankings", icon: `${imgBase}/mbi.png`, selectedIcon: `${imgBase}/mbi-a.png`  },
  {title: "MCI", href: '/hotelrankings', icon: `${imgBase}/mci.png`, selectedIcon: `${imgBase}/mci-a.png` },
];

export default ({selectedTab}) => (
  <nav className="tab-bottom-box">
    <Flex justify="around">
        {
          tabData.map((item, index) => {
            const { title, href, icon, selectedIcon } = item;
            return (
              <Link key={`bt-h${index}`} href={href} prefetch >
                <Button className="bottom-href"  >
                  <img src={selectedTab === title? selectedIcon : icon} />
                  <p className={selectedTab === title ? 'active' : ''}>{title}</p>
                </Button>
              </Link>
            )
          })
        }
    </Flex>
  </nav>
)