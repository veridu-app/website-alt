'use client'
import type { Post } from '@/payload-types'

import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'

type ArchiveBlockClientProps = {
  id?: string
  introContent?: any
  posts: Post[]
  showViewAllLink?: boolean | null
  viewAllLink?: any
}

export const ArchiveBlockClient: React.FC<ArchiveBlockClientProps> = ({
  id,
  introContent,
  posts,
  showViewAllLink,
  viewAllLink,
}) => {
  const [visibleSections, setVisibleSections] = useState({
    intro: false,
    posts: false,
    link: false,
  })
  const introRef = useRef<HTMLDivElement>(null)
  const postsRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Intro Content Observer
    if (introRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, intro: true }))
            observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )
      observer.observe(introRef.current)
      observers.push(observer)
    }

    // Posts Observer
    if (postsRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, posts: true }))
            observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )
      observer.observe(postsRef.current)
      observers.push(observer)
    }

    // View All Link Observer
    if (linkRef.current && showViewAllLink) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, link: true }))
            observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )
      observer.observe(linkRef.current)
      observers.push(observer)
    }

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [showViewAllLink])

  return (
    <div id={`block-${id}`}>
      {introContent && (
        <div
          ref={introRef}
          className={`container mb-8 flex justify-center transition-all duration-700 ease-out ${
            visibleSections.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <RichText
            className="mx-auto max-w-[48rem] text-center"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <div
        ref={postsRef}
        className={`transition-all duration-700 ease-out ${
          visibleSections.posts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: introContent ? '200ms' : '0ms' }}
      >
        <CollectionArchive posts={posts} />
      </div>
      {showViewAllLink && viewAllLink && (
        <div
          ref={linkRef}
          className={`container mt-8 text-center transition-all duration-700 ease-out ${
            visibleSections.link ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <CMSLink {...viewAllLink} />
        </div>
      )}
    </div>
  )
}
