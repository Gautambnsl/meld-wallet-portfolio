const useCreateRestricted = () => {
  // get all the current permissions of the admin
  const permission: any = localStorage.getItem('admin-permission');
  // get the current project name which one is selected
  const project: any = sessionStorage.getItem('menu-key');

  // example - permissions.banji.dashboard.view = true
  const createRestricted = (module: any) => {
    return JSON.parse(permission)?.[project]?.[module]?.create;
  }

  return { createRestricted };
}

export default useCreateRestricted;
