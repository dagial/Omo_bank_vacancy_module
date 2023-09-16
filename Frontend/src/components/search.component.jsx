import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { load_departments, search } from '../actions/omo'
import "../styles/search.style.scss"
import { GoSearch, GoSettings } from 'react-icons/go'
const Search = (props) => {
    const { user, departments, load_departments, search, results, searching, handleSearch, handleChange, filter } = props 
    const [filterDisplay, setFilterDisplay] = useState(false)
    useEffect(() => {
        load_departments()
    }, [])
    function showFilter() {
        setFilterDisplay(prevFilterDisplay => (!prevFilterDisplay))
    }
    function handleSubmit(event) {
        event.preventDefault()
        search(filter.model, filter.query)
        handleSearch()
    }
    return (
    <div className="search-container">
        <div className='search-box'>
            <GoSettings className='filter-button' onClick={showFilter} />
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    minLength="3"
                    required
                    placeholder="Search jobs" 
                    className="search-bar"
                    value={filter.query}
                    onChange={handleChange}
                    name="query" />
                <button name="submit" className="search-button"><GoSearch /></button>
            </form>
        </div>
        {
            user ? user.user_type.toLowerCase() === 'recruit' ? 
                <div className={filterDisplay ? 'filter-block' : 'filter-hidden'}>
                    <h4>Filters</h4>
                    <label htmlFor='app-chbox'>
                    <input 
                        type='checkbox' 
                        name='ofApplied' 
                        checked={filter.ofApplied}
                        id='app-chbox'
                        onChange={handleChange}
                        />
                         Jobs I applied for</label>
                    <label htmlFor='app-range'>Minimum salary
                    <abbr title={filter.salary}>
                    <input 
                        type='range' 
                        name='salary'
                        value={filter.salary}
                        id='app-range'
                        min='1000'
                        max='20000'
                        step='100'
                        onChange={handleChange}
                        />
                    </abbr>
                    </label>
                    <label htmlFor='dep-select'>Department
                    {departments ?
                    <select
                    name='department'
                    id='dep-select'
                    value={filter.department}
                    onChange={handleChange}
                    > 
                    <option value="">Any</option>
                        {departments.map((department, index) =>
                            <option key={index} value={department.name}>{department.name}</option>)}
                    </select> : <></>}
                    </label>
                </div> :
                <div className={filterDisplay ? 'filter-block' : 'filter-hidden'}>
                    <h4>Filters</h4>
                    <div className='candidate-applications'>
                    <label htmlFor='application-radio'>
                    <input 
                        type='radio' 
                        name='model' 
                        checked={filter.model==='Application'}
                        value='Application'
                        id='application-radio'
                        onChange={handleChange}
                        />
                         Applications</label>
                    <label htmlFor='cand-radio'>
                    <input 
                        type='radio' 
                        name='model' 
                        checked={filter.model==='Candidate'}
                        value='Candidate'
                        id='cand-radio'
                        onChange={handleChange}
                        />
                         Candidates</label>
                    </div>
                    <div className='job-salary'>
                    <label htmlFor='job-radio'>
                    <input 
                        type='radio' 
                        name='model' 
                        checked={filter.model==='Job'}
                        id='job-radio'
                        value='Job'
                        onChange={handleChange}
                        />
                         Jobs</label>
                    <label htmlFor='app-range'>Minimum salary
                    <abbr title={filter.salary}>
                    <input 
                        type='range' 
                        name='salary'
                        value={filter.salary}
                        id='app-range'
                        min='1000'
                        max='20000'
                        step='100'
                        onChange={handleChange}
                        />
                      </abbr>  
                    </label>
                    
                    </div>
                    {
                        user.user_type.toLowerCase() === 'hr user' ?
                        <label htmlFor='salary-range'>Department
                       {departments?
                        <select
                        name='department'
                        value={filter.department}
                        onChange={handleChange}
                        id='salary-range'>
                        <option value="">Any</option> 
                            {departments.map((department, index) =>
                                <option key={index} value={department.name}>{department.name}</option>)}
                        </select> : <></>}
                        </label> :
                        <></>
                    }
                    
                </div> :
                <></>
        }
    </div>
    )
}

const mapStateToProps = state => ({
    user: state.omo.user,
    departments: state.omo.departments,
    results: state.omo.results
})
export default connect(mapStateToProps, { search, load_departments })(Search);