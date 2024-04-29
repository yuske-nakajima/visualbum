import dynamic from 'next/dynamic'

const Component = dynamic(() => import('@/lib/component/midi/01'), {
  ssr: false,
})

const index = () => {
  return <Component />
}
export default index
