import dynamic from 'next/dynamic'

const Component = dynamic(() => import('@/lib/component/attractor3'), {
  ssr: false,
})

const index = () => {
  return <Component />
}
export default index
