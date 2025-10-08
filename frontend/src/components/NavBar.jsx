import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Musafir",
    href: "https://github.com/ishpeeedy/Musafir",
    description:
      "Travel destination sharing platform inspired by YelpCamp",
  },
  {
    title: "SkillForge",
    href: "https://github.com/ishpeeedy/skillForge",
    description:
      "Full-featured e-commerce platform for online courses",
  },
]

export default function Navbar() {
  return (
    <div  className="flex justify-center w-full">
      <NavigationMenu className="z-5 bg-main rounded-full">
      <NavigationMenuList>
        <NavigationMenuItem className="sm:block hidden">
          <NavigationMenuTrigger>BlinkURL</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-3 p-2 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-base p-6 no-underline outline-hidden bg-gradient-to-b from-main/50 to-main"
                    href="https://github.com/ishpeeedy/BlinkURL"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="mb-2 mt-4 text-lg font-heading">
                      BlinkURL
                    </div>
                    <p className="text-sm font-base leading-tight">
                      Modern URL shortener with comprehensive analytics. Track clicks,
                      monitor traffic, and gain insights into your audience.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Home" internal>
                Create and shorten URLs instantly
              </ListItem>
              <ListItem
                href="/dashboard"
                title="Dashboard"
                internal
              >
                View and manage all your shortened URLs
              </ListItem>
              <ListItem
                href="/auth"
                title="Login / Sign Up"
                internal
              >
                Create an account for custom URLs and analytics
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2">
              {projects.map((project) => (
                <ListItem
                  key={project.title}
                  title={project.title}
                  href={project.href}
                >
                  {project.description}
                </ListItem>
              ))}
              <ListItem
                title="More Projects"
                href="https://github.com/ishpeeedy"
              >
                View all my projects on GitHub
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="https://github.com/ishpeeedy/BlinkURL" target="_blank" rel="noopener noreferrer">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              GitHub
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  className,
  title,
  children,
  internal,
  ...props
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        {internal ? (
          <Link
            to={props.href}
            className={cn(
              "hover:bg-accent block text-main-foreground select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-hidden transition-colors hover:border-border",
              className,
            )}
          >
            <div className="text-base font-heading leading-none">{title}</div>
            <p className="font-base line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        ) : (
          <a
            className={cn(
              "hover:bg-accent block text-main-foreground select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-hidden transition-colors hover:border-border",
              className,
            )}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            <div className="text-base font-heading leading-none">{title}</div>
            <p className="font-base line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </a>
        )}
      </NavigationMenuLink>
    </li>
  )
}
ListItem.displayName = "ListItem"
