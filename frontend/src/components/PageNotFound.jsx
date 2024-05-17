import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
function PageNotFound() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Header headerText={<FontAwesomeIcon icon={faTriangleExclamation} />} motto="Hata Sayfa Bulunamadı!" />
      
    </div>
  );
}
export default PageNotFound;
