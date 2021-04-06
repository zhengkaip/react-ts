import React from 'react';
import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;


interface treeItem {
    id: number,
    type: number,
    label: string,
    len: number,
    children?: treeItem[]
}

export const MyTreeNode = (treeData: treeItem[]) => {
    return (
        <>
            {
                treeData.map((item: treeItem) => {
                    return (
                        <TreeNode key={item.id} value={item.id} title={item.label}>
                            {item.children && MyTreeNode(item.children)}
                        </TreeNode>
                    )
                })
            }
        </>
    );
}
