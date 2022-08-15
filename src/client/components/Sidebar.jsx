import React, { useState, useEffect } from 'react';
import { FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import './sidebar.scss';
import axios from 'axios';

// Notes on use of material UI library checkbox components:
    // Form group acts as form element
    // form control label takes an input component (checkbox, textarea, etc) as control argument and label
    // https://mui.com/material-ui/react-checkbox/
//https://reactjs.org/docs/hooks-state.html
// useEffect -> in the use effect, we are sending a request to the backend to give us new posts based on the filter.
// in the dependency array, we are passing selectedFilters. Every time selectedFilters changes, it will trigger the 
// callback passed to useEffect, querying the database and giving new posts. As a result, posts should no longer depend on state of filters, just on what data is sent to them in response from backednd.

// If backend doesn't have these routes set up, you can change this component to filter the posts state array and update a "visible" index

// This design is highly dependent on backend to do the logic (filtering). Not the most efficient use of network resources, but benefit is less client side code which, when dealing with large amounts of data, will slow experience for user. For this project, it will allow the backend to spend more time on SQL/backend logic and free front end up to focus on connectivity of components, front and back end integration, and use of React library material UI

export default function Sidebar({ setPosts, filters = ['scissors, paper'] }) { // passed setIsFiltered
  // 
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleCheck = (e) => {
    setSelectedFilters(prev => {
      if (e.target.checked) { // check if checkbox is being activated or deactivated
        return [...prev, e.target.label];
      }
      return prev.filter((selectedFilter) => selectedFilter !== e.target.label);   
    })
  };


  useEffect(async () => {
    if (selectedFilters.length > 0) {
      const paramString = '?tags=';
      selectedFilters.forEach((filter) => {
        paramString = paramString += filter += ';'; // make sure back end splits on semicolon
      });
      const { body } = await axios.get(`/api/tag${paramString}`);
      setPosts(body);
      return;
    } 
    const { body } = axios.get('/api/tag');
    setPosts(body);
  }, [selectedFilters])

  // useEffect whenever selectedFilters changes, and there are filters present, setIsFiltered ==> true


  return (
    <div>
      <FormGroup>
        {
          filters.map((filter) => {
            <FormControlLabel onChange={handleCheck} control={<Checkbox />} label={filter} />
          })
        }
      </FormGroup>
    </div>
  )
}

