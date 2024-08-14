import React from 'react';
import { Sidebar, Navbar, Dropdown, Button, Table } from 'flowbite-react';
import { HiChartBar, HiCog, HiHome, HiPencil, HiUser } from 'react-icons/hi';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiHome}>
              Home
            </Sidebar.Item>
            <Sidebar.Item href="/posts" icon={HiPencil}>
              Posts
            </Sidebar.Item>
            <Sidebar.Item href="/categories" icon={HiUser}>
              Categories
            </Sidebar.Item>
            <Sidebar.Item href="/comments" icon={HiUser}>
              Comments
            </Sidebar.Item>
            <Sidebar.Item href="/users" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="/analytics" icon={HiChartBar}>
              Analytics
            </Sidebar.Item>
            <Sidebar.Item href="/settings" icon={HiCog}>
              Settings
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <Navbar className="bg-white shadow-md">
          <Navbar.Brand href="/">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Dashboard
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown inline label="Profile">
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>

        {/* Content Area */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Recent Posts</h3>
              <ul>
                <li>Post 1</li>
                <li>Post 2</li>
                <li>Post 3</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Traffic Stats</h3>
              <p>Daily Visitors: 1200</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Popular Posts</h3>
              <ul>
                <li>Post A</li>
                <li>Post B</li>
                <li>Post C</li>
              </ul>
            </div>
          </div>

          {/* Post Management Table */}
          <h2 className="text-2xl font-semibold mb-4">Manage Posts</h2>
          <Table>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Author</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Post 1</Table.Cell>
                <Table.Cell>Author A</Table.Cell>
                <Table.Cell>Category X</Table.Cell>
                <Table.Cell>Published</Table.Cell>
                <Table.Cell>
                  <Button size="xs">Edit</Button>
                </Table.Cell>
              </Table.Row>
              {/* Repeat for other posts */}
            </Table.Body>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
