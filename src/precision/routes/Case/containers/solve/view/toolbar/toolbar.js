import { connect } from 'react-redux';

const mapStateToProps = ({ cases: { data_sets } , functions: { categories, functions }}) => ({
    data_sets,
    categories: !!categories && categories
        .filter(category => category._links.parent === undefined)
        .map(cat => ({
            category: cat,
            sub_categories: categories
                .filter(c => c._links.parent !== undefined && c._links.parent.href === cat._links.self.href)
                .map(cat => ({
                    subCategory: cat,
                    functions: !!functions && functions
                            .filter((f) => f._links.self !== undefined)
                            .filter(fn => cat.functions.indexOf(fn._links.self.href) >= 0).map(fn => fn)
                }))
        }))
});


export const ToolbarContainer = connect(mapStateToProps, null );