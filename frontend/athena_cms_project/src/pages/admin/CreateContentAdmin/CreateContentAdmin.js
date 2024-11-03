import AdminNav from '../../../components/admin_components/AdminNav.js';
import AdminCreateContent from '../../../components/admin_components/AdminCreateContent.js';
import GoBackButton from '../../../components/UI_General/GoBackButton.js';




function CreateContentAdmin() {

    return (
        <>
            <GoBackButton />
            
            <p>Navigation</p>
            <AdminNav />
        
            Create Content Admin
            <AdminCreateContent />
        </>
    )
}

export default CreateContentAdmin