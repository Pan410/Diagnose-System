import Admin from "@/admin/Admin.vue";
import Sheet from "@/admin/Sheet.vue";
import Manger from "@/admin/Manger.vue";
import Record from "@/admin/Record.vue";
import Personal from "@/admin/Personal.vue";
import Symptom from "@/admin/symptom/Symptom.vue";
import Altersym from "@/admin/symptom/Altersym.vue";
import Pharmacy from "@/admin/pharmacy/Pharmacy.vue";
import Alterpha from "@/admin/pharmacy/Alterpha.vue";
import Consilia from "@/admin/consilia/Consilia.vue";
import Altercon from "@/admin/consilia/Altercon.vue";
import Person from "@/admin/personal/Person.vue";
import Release from "@/admin/personal/Release.vue";
import Patient from "@/admin/personal/Patient.vue";
import Composition from "@/admin/personal/Composition.vue";

import Content from "@/admin/Content.vue"; //渲染页面  重要重要
import ss from "@/admin/1.vue"; //测试

import {
  resolve
} from "path";

const admin = [{
  //管理员登录
  path: "/admin",
  name: "Admin",
  component: Admin
}];

export default admin;
export const powerRouter = [{
  //动态路由
  //后台首页
  path: "/",
  redirect: "/sheet",
  name: "sheet",
  component: Sheet,
  hidden: false,
  children: [{
      path: "/sheet",
      name: "首页",
      icon: "el-icon-tickets"
      // component: Sheet,
    },
    {
      path: "/manger",
      name: "管理员",
      component: Manger,
      icon: "el-icon-setting",
      meta: {
        role: "Super"
      }
    },
    { //个人中心
      path: "/personal",
      name: "个人中心",
      icon: "el-icon-service",
      component: Content,
      children: [{
          path: "/record",
          name: "我要记录",
          component: Record,
        },
        {
          path: "/personal",
          name: "个人中心",
          component: Personal,

          children: [{
              path: "/personal/person",
              name: "个人信息",
              component: Person
            },
            {
              path: "/personal/release",
              name: "我的发布",
              component: Release
            },
            {
              path: "/personal/patient",
              name: "我的患者",
              component: Patient
            },
            {
              path: "/personal/composition",
              name: "创作浏览",
              component: Composition
            }
          ]
        },
      ]
    },
    {
      path: "/sheet1",
      name: "症状信息",
      icon: "el-icon-edit",
      component: Content,

      meta: {
        role: "General"
      },
      children: [{
          //症状信息
          path: "/symptom",
          name: "添加症状",
          component: Symptom
        },
        {
          //修改症状
          path: "/altersym",
          name: "修改症状",
          component: Altersym
        }
      ]
    },
    {
      path: "/sheet2",
      name: "药材信息",
      icon: "el-icon-edit",
      component: Content,
      meta: {
        role: "General"
      },
      children: [{
          //药材信息
          path: "/pharmacy",
          name: "添加药材",
          component: Pharmacy
        },
        {
          //修改药材
          path: "/alterpha",
          name: "修改药材",
          component: Alterpha
        }
      ]
    },
    {
      path: "/sheet3",
      name: "患者信息",
      icon: "el-icon-view",
      component: Content,
      children: [{
          //医案信息
          path: "/consilia",
          name: "医案信息",
          component: Consilia,
          meta: {
            role: "General"
          }
        },
        {
          //修改医案
          path: "/altercon",
          name: "修改医案",
          component: Altercon,
          meta: {
            role: "General"
          }
        }
      ]
    },

  ]
}];
