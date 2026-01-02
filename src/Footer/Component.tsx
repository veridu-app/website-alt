import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Mail, Linkedin, Instagram } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const linkCategories = footerData?.linkCategories || []
  const contact = footerData?.contact

  const hasContactInfo = contact?.email || contact?.linkedIn || contact?.instagram

  return (
    <footer className="mt-auto border-t border-dark-teal/20 bg-dark-teal text-off-white">
      <div className="container py-8 gap-8 flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          {/* Logo */}
          <Link className="flex items-center w-[5rem]" href="/">
            <Logo color="white" variant="vertical" />
          </Link>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Link Kategorien - Rechts ausgerichtet */}
            {linkCategories.map((category, categoryIndex) => {
              if (!category?.heading || !category?.links || category.links.length === 0) {
                return null
              }

              return (
                <nav key={categoryIndex} className="flex flex-col gap-3">
                  <h3 className="font-semibold text-off-white mb-2">{category.heading}</h3>
                  <div className="flex flex-col gap-2">
                    {category.links.map((linkItem, linkIndex) => {
                      if (!linkItem?.link) return null
                      return (
                        <CMSLink
                          className="text-off-white/80 hover:text-frozen-green transition-colors"
                          key={linkIndex}
                          {...linkItem.link}
                        />
                      )
                    })}
                  </div>
                </nav>
              )
            })}

            {/* Kontakt-Bereich - Rechts ausgerichtet */}
            {hasContactInfo && (
              <nav className="flex flex-col gap-3 md:items-end">
                <h3 className="font-semibold text-off-white mb-2">Kontakt</h3>
                <div className="flex flex-col gap-3 md:items-end">
                  {contact?.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-off-white/80 hover:text-frozen-green transition-colors"
                      aria-label="E-Mail senden"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{contact.email}</span>
                    </a>
                  )}
                  {contact?.linkedIn && (
                    <a
                      href={contact.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-off-white/80 hover:text-frozen-green transition-colors"
                      aria-label="LinkedIn Profil öffnen"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {contact?.instagram && (
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-off-white/80 hover:text-frozen-green transition-colors"
                      aria-label="Instagram Profil öffnen"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Instagram</span>
                    </a>
                  )}
                </div>
              </nav>
            )}
          </div>
        </div>

        {/* Copyright - Ganz unten, rechts ausgerichtet */}
        <div className="flex justify-end">
          <p className="text-sm text-off-white/60">© veridu UG (haftungsbeschränkt)</p>
        </div>
      </div>
    </footer>
  )
}
