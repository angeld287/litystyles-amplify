
import { connect } from 'react-redux';
import { setCompanyService, removeCompanyService, setItemsFromStore } from '../../../redux/services/services.actions'

const useServices = (props) => {

}

const mapStateToProps = state => ({
    _companyServices: state.services.companyServices,
    services: state.services.services,
})

const mapDispatchToProps = dispatch => ({
    setCompanyService: companyService => dispatch(setCompanyService(companyService)),
    removeCompanyService: companyService => dispatch(removeCompanyService(companyService)),
    setItemsFromStore: companyService => dispatch(setItemsFromStore(companyService))
})

export default connect(mapStateToProps, mapDispatchToProps)(useServices);