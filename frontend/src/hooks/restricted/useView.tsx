const useViewRestricted = () => {
    // get all the current permissions of the admin
    const permission: any = localStorage.getItem('admin-permission');
    // get the current project name which one is selected
    const project: any = sessionStorage.getItem('menu-key');

    // example - permissions.banji.dashboard.view = true
    const viewRestricted = (module: any) => {
        return JSON.parse(permission)?.[project]?.[module]?.view;
    }

    return { viewRestricted };
};

export default useViewRestricted;


