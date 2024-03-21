import dynamic from 'next/dynamic'

const Component = dynamic(
  () => import('@/pages/code/udemy-practice/section5/attractor3/component'),
  {
    ssr: false,
  },
)

const index = () => {
  return <Component />
}
export default index
