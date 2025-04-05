'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { 
      name: 'Marketplace', 
      href: '/marketplace', 
      icon: <Image src="/market_place.svg" width={24} height={24} alt="Marketplace" />
    },
    { 
      name: 'My Agents', 
      href: '/agents', 
      icon: <Image src="/my_agents.svg" width={24} height={24} alt="My Agents" />
    },
    { 
      name: 'Create an Agent', 
      href: '/create-agent', 
      icon: <Image src="/plus.svg" width={24} height={24} alt="Create an Agent" />
    },
  ];

  return (
    <div 
      className={`bg-black text-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[56px]' : 'w-[260px]'
      }`}
    >
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-[56px] h-[56px] rounded-md hover:bg-white/10 flex items-center justify-center transition-colors duration-150 cursor-pointer mt-3"
        >
          <Image 
            src="/sidebar.svg" 
            width={24} 
            height={24} 
            alt="sidebar"
            className="pointer-events-none" 
          />
        </button>
        {!collapsed && (
          <nav className="mt-4">
            <ul className="space-y-3 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center p-4 rounded-md whitespace-nowrap ${
                        isActive 
                          ? 'bg-white/10 text-white' 
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
    </div>
  );
};

export default Sidebar; 