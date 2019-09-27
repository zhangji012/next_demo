import { withRouter } from 'next/router'
import '../static/less/app.less'

export default withRouter(({ children, title, description, keywords, author }) => {
  return(
  <div>
    {children}
  </div>
)
})