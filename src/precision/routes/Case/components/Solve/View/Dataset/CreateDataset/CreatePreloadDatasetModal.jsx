import React, {Component} from 'react';
import {sortedUniq} from "lodash-es";
import {CreatePloadDataset} from "../../../../../containers/solve/view/dataset/createDataset/createPreloadDatasetModal";
import {Button} from "../../../../../../../components/Buttons/Button";

const SELECT_CATEGORY = 'Select Category';
const SELECT_SUBCATEGORY = 'Select Sub-Category';
const SELECT_DATASET = 'Select Dataset';
const ALL = 'All';

class CreatePreloadDatasetModal extends Component{
    categoryInputSelect = "";
    subcategoryInputSelect = "";
    state = {
        dataSets: this.props.data_sets || []
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.data_set_succeeded && this.props.data_set_succeeded !== prevProps.data_set_succeeded){
            this.setState({
                dataSets: this.props.data_sets
            } , () => this.initialiseDatasets());
        }
    }

    getCategories = () => [ALL].concat(this.state.dataSets.map(dataset => dataset.category));

    getSubCategoriesBy = (category) => {
        if (category === ALL) {
            return [ALL].concat(this.state.dataSets.map(dataset => dataset.subcategory));
        }
        else {
            return [ALL].concat(this.state.dataSets.filter(dataset => dataset.category === category)
                .map(dataset => dataset.subcategory));
        }
    };

    getTitlesBy = (category, subcategory) => {
        if (category === ALL && subcategory === ALL) {
            return [SELECT_DATASET].concat(this.state.dataSets.map(dataset => dataset.title));
        }
        else if (category === ALL) {
            return [SELECT_DATASET].concat(this.state.dataSets.filter(dataset => dataset.subcategory === subcategory)
                .map(dataset => dataset.title));
        }
        else if (subcategory === ALL) {
            return [SELECT_DATASET].concat(this.state.dataSets.filter(dataset => dataset.category === category)
                .map(dataset => dataset.title));
        }
        else {
            return [SELECT_DATASET].concat(this.state.dataSets.filter(dataset => dataset.category === category && dataset.subcategory === subcategory)
                .map(dataset => dataset.title));
        }
    };

    getCurrentDataSet = () => {
        const { title_selected, dataSets } = this.state;
        return dataSets.filter(({ title }) => title === title_selected).shift();
    };

    getFilepath = () => {
        const current_dataset = this.getCurrentDataSet();
        return current_dataset ? current_dataset.filepath : '';
    };

    handleCategoryChange = (category) => {
        this.initialiseDatasets();
        category = category === SELECT_CATEGORY ? '' : category;
        this.setState({
            category_selected: category,
            sub_categories: this.getSubCategoriesBy(category),
            titles: this.getTitlesBy(category, this.state.subcategory_selected),
        });
    };

    handleSubCategoryChange = (subcategory) => {
        this.setState({
            subcategory_selected: subcategory === SELECT_SUBCATEGORY ? '' : subcategory,
            titles: this.getTitlesBy(this.state.category_selected, subcategory === SELECT_SUBCATEGORY ? '' : subcategory),
            title_selected: '',
            show_preview: false
        });
    };

    handleTitleChange = (title) => {
        this.setState({
            title_selected: title === SELECT_DATASET ? '' : title,
        });
    };

    initialiseDatasets = () => {
        this.setState({
            categories: sortedUniq(this.getCategories()),
            sub_categories: this.getSubCategoriesBy(ALL),
            titles: this.getTitlesBy(ALL, ALL),
            category_selected: ALL,
            subcategory_selected: ALL,
            title_selected: SELECT_DATASET,
            show_preview: false
        });
    };

    handleSubmit = () => {
        if (this.getFilepath() !== '') {
            const filenames = this.getFilepath();
            this.props.handleSubmitPreloadModal(filenames)
        }
    };

    render() {
        const {categories, datasets, sub_categories, titles} = this.state;
        return(
            <div className="upload-container">
                <div style={{marginBottom: '20px', display: 'flex', flexFlow: 'column'}}>
                <label>Category </label>
                <select ref={ref => (this.categoryInputSelect = ref)} onChange={ev => this.handleCategoryChange(ev.target.value)} style={{width: '300px'}}>
                    {categories && categories.map((category, i) => <option key={i}>{category}</option>)}
                </select>
                </div>
                <div style={{marginBottom: '20px', display: 'flex', flexFlow: 'column'}}>
                    <label>Sub-category </label>
                    <select ref={ref => (this.subcategoryInputSelect = ref)} onChange={ev => this.handleSubCategoryChange(ev.target.value)} style={{width: '300px'}}>
                        {sub_categories && sub_categories.map((subcategory, i) => <option key={i}>{subcategory}</option>)}
                    </select>
                </div>
                <div style={{marginBottom: '20px', display: 'flex', flexFlow: 'column'}}>
                    <label>Dataset </label>
                    <select style={{marginRight: '25px'}} ref={ref => (this.datasetInputSelect = ref)} onChange={ev => this.handleTitleChange(ev.target.value)} style={{width: '300px'}}>
                        {titles && titles.map((title, i) => <option key={i}>{title}</option>)}
                    </select>
                </div>
                <Button buttonType="primary" onClick={this.handleSubmit}>Create</Button>
            </div>
        )
    }
}

export default CreatePloadDataset(CreatePreloadDatasetModal)