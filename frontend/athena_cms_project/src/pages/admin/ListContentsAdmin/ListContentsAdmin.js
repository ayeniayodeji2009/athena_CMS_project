import AdminNav from '../../../components/admin_components/AdminNav.js';
import AdminContentList from '../../../components/admin_components/AdminContentList.js';
import GoBackButton from '../../../components/UI_General/GoBackButton.js';
import ContentSearchPage from '../../../components/UI_General/ContentSearchPage.js';



function ListContentsAdmin() {

    return (
        <>
            <GoBackButton />
            <ContentSearchPage />
            <p>Navigation</p>
            <AdminNav />

            List Content Admin
            <AdminContentList />
        </>
    )
}

export default ListContentsAdmin