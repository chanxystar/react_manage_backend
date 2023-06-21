import { useAppDispatch, useAppSelector } from "@/store";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { useAliveController } from "react-activation";
import JSON5 from "json5";

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";
import { Button, Row, Tabs } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
  onActiveBarTransform: (className: string) => void;
}
//拖拽组件
const DraggableTabNode = ({
  className,
  onActiveBarTransform,
  ...props
}: DraggableTabPaneProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({
    id: props["data-node-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (!isSorting) {
      onActiveBarTransform("");
    } else if (className?.includes("ant-tabs-tab-active")) {
      onActiveBarTransform(
        css`
          .ant-tabs-ink-bar {
            transform: ${CSS.Transform.toString(transform)};
            transition: ${transition} !important;
          }
        `
      );
    }
  }, [className, isSorting, onActiveBarTransform, transform, transition]);

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

//RouterTabs组件

const RouterTabs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const tabs = useAppSelector((state) => state.tab.tabs);
  const activeTab = useAppSelector((state) => state.tab.activeTab);
  const [items, setItems] = useState<
    {
      key: string;
      label: string;
    }[]
  >([]);
  const [className, setClassName] = useState("");
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  useEffect(() => {
    window.onbeforeunload = function () {
      sessionStorage.setItem("tabs", JSON5.stringify(tabs));
      sessionStorage.setItem("activeTab", JSON5.stringify(activeTab));
    };
  }, [tabs, activeTab]);

  useEffect(() => {
    setItems(tabs);
    tabs.length === 1 ? setTabsType("card") : setTabsType("editable-card");
  }, [tabs]);
  useEffect(() => {
    navigate(activeTab);
  }, [activeTab]);

  const tabChange = (key: string) => {
    navigate(key);
    dispatch({ type: "tab/setActiveTab", payload: key });
  };

  //拖拽结束
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  //引入keepAlive操作函数
  const { drop, refresh, clear } = useAliveController();
  //改变单个标签
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "remove") {
      const newItems = items.filter((item) => item.key !== targetKey);
      if (activeTab === targetKey) {
        dispatch({
          type: "tab/setActiveTab",
          payload: newItems[newItems.length - 1].key,
        });
        navigate(newItems[newItems.length - 1].key);
      }
      setItems(newItems);
      dispatch({ type: "tab/setTabs", payload: newItems });
      drop(targetKey as string);
    }
  };

  //控制按钮关闭状态
  const [tabsType, setTabsType] = useState<"editable-card" | "card">("card");

  //tab右侧的按钮
  const renderExtraContent = () => {
    return (
      <Row>
        <Button onClick={() => refresh(activeTab)}>
          <ReloadOutlined />
        </Button>
        <Button onClick={clearAll}>
          <CloseOutlined />
        </Button>
      </Row>
    );
  };
  // const refresh = () => {
  //   dispatch({ type: "tab/reload", payload: true });
  // };
  const clearAll = () => {
    clear();
    dispatch({
      type: "tab/setTabs",
      payload: [
        {
          key: "/home",
          label: "工作台",
        },
      ],
    });
    dispatch({ type: "tab/setActiveTab", payload: "/home" });
    navigate("/home");
  };
  return (
    <Tabs
      style={{ marginTop: 10 }}
      type={tabsType}
      hideAdd
      className={className}
      items={items}
      activeKey={activeTab}
      onEdit={onEdit}
      onChange={tabChange}
      tabBarExtraContent={renderExtraContent()}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext
            items={items.map((i) => i.key)}
            strategy={horizontalListSortingStrategy}
          >
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode
                  {...node.props}
                  key={node.key}
                  onActiveBarTransform={setClassName}
                >
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
};

export default memo(RouterTabs);
