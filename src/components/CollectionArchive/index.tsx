'use client'
import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-post-index') || '0', 10)
            setVisiblePosts((prev) => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    const postElements = containerRef.current.querySelectorAll('[data-post-index]')
    postElements.forEach((post) => observer.observe(post))

    return () => {
      postElements.forEach((post) => observer.unobserve(post))
      observer.disconnect()
    }
  }, [posts])

  return (
    <div ref={containerRef} className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              const isVisible = visiblePosts.has(index)

              return (
                <div
                  key={index}
                  data-post-index={index}
                  className={cn(
                    'col-span-4 transition-all duration-700 ease-out',
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-95',
                  )}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <Card
                    className="h-full transition-transform duration-300 ease-out hover:scale-[1.02]"
                    doc={result}
                    relationTo="posts"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
