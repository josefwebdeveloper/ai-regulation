import { GetServerSideProps } from 'next'
import { generateRobotsTxt } from '../lib/seo'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate robots.txt content
  const robotsTxt = generateRobotsTxt()

  // Set proper headers
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  
  // Write the robots.txt content
  res.write(robotsTxt)
  res.end()

  return {
    props: {}
  }
}

// This component won't be rendered since we return the text directly
export default function RobotsTxt() {
  return null
} 