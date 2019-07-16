import  React from 'react';
import cx from "classnames";

export const FunctionsMenu = (props) => {
    const {categories,active_function,active_category:{name, sub_categories }, onCategoryChange,onFunctionClick} = props;
    return (
        <div className="fx__content">
            <div className="fx__menu">
                {categories && categories.map((category,i) =>
                    <div className={cx("fx-menu__item",{'fx-active__category':name === category.name})}
                         onClick={() => onCategoryChange(category)}
                         key={i}
                    >
                        <h6 className="fx-menu__title">{category.name}</h6>
                    </div>
                )}
            </div>
            <div className="fx__list">
                <div className="fx__list-left">
                    {sub_categories && sub_categories
                        .slice(0,Math.ceil(sub_categories.length/2))
                        .map((sub_category,i) =>
                            <div className="fx-list__item" key={i}>
                                <h4 className="fx-list__title">{sub_category.name}</h4>
                                {
                                    sub_category.functions_list && sub_category.functions_list.map(fx =>
                                        <p className={cx("fx-list__subtitle",{'fx-active':active_function.function_id === fx.function_id})}
                                           onClick={() =>onFunctionClick(fx)}
                                        >
                                            {fx.name}
                                        </p>
                                    )
                                }
                            </div>
                        ) }
                </div>
                <div className="fx__list-right">
                    {sub_categories && sub_categories
                        .slice(Math.floor(sub_categories.length/2) + 1,sub_categories.length)
                        .map((sub_category,i) =>
                            <div className="fx-list__item" key={i}>
                                <h4 className="fx-list__title" key={i}>{sub_category.name}</h4>
                                {
                                    sub_category.functions_list && sub_category.functions_list.map((fx,index) =>
                                        <p className={cx("fx-list__subtitle",{'fx-active':active_function.function_id === fx.function_id})}
                                           key={index}
                                           onClick={() => onFunctionClick(fx)}
                                        >
                                            {fx.name}
                                        </p>
                                    )
                                }
                            </div>
                        ) }
                </div>
            </div>
        </div>
    );
};