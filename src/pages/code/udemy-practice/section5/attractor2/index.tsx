import dynamic from 'next/dynamic'

const Component = dynamic(() => import('@/lib/component/attractor2'), {
  ssr: false,
})

const index = () => {
  return <Component />
}
export default index
