import React, { useState } from 'react'
import UseTailwind from '../../../utils/use-tailwind/UseTailwind'
import { useFeature } from '../../../Hooks/adminDashBoard/setting/useFeature'
import { customErrorLog } from '../../../utils/customErrorLog';
import { BASE_URL_IMG } from '../../../utils/constants';
import { Trash } from 'lucide-react';
import { deleteFeature } from '../../../api/admin/setting/deleteFeature';
import { useQueryClient } from '@tanstack/react-query';


const FeatureList = () => {
  const { data } = useFeature();
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient();

  const handleDeleteFeature = async (id) => {
    try {
      setLoading(true)
      const response = await deleteFeature(id)
      customErrorLog({ error: response })
      queryClient.invalidateQueries(['website-feature']);
    } catch (error) {
      console.log("error delete feature", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UseTailwind>
      {
        data?.data?.map(item => {

          let img = null;
          let title = null
          let descriptions = null
          let features = null
          try {
            img = JSON.parse(item.img);
            title = JSON.parse(item.titles); // ['["en","ar"]']
            title = JSON.parse(title); // ['en', 'ar']
            descriptions = JSON.parse(item.descriptions); // ['["en","ar"]']
            descriptions = JSON.parse(descriptions); // ['en', 'ar']
            features = JSON.parse(item.features); // ['["en","ar"]']
            features = JSON.parse(features); // ['en', 'ar']

          } catch (error) {
            console.error("Failed to parse item", error);
          }
          return (
            <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-mt-4 tw-shadow-sm tw-flex tw-flex-col tw-gap-4">
              <div className="tw-flex tw-justify-between tw-gap-4">
                {/* Left: Image + Info */}
                <div className="tw-flex tw-gap-4">
                  <img
                    src={`${BASE_URL_IMG}${img}`}
                    alt={item.name}
                    className="tw-w-24 tw-h-24 tw-object-cover tw-rounded-lg tw-border"
                  />
                  <div className="tw-flex tw-flex-col tw-gap-1">
                    <p className="tw-font-semibold tw-text-lg tw-text-black">{title?.[0]}</p>
                    <p className="tw-text-sm tw-text-gray-700">
                      Description: <span className="tw-text-gray-600">{descriptions?.[0]}</span>
                    </p>
                    <div>
                      <p className="tw-text-sm tw-font-medium tw-text-black">Features:</p>
                      <ul className="tw-list-disc tw-pl-4 tw-text-sm tw-text-gray-600">
                        {features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right: Delete Button */}
                <div className="tw-shrink-0">
                  <button className="tw-text-red-600 hover:tw-text-red-800 tw-transition" onClick={() => handleDeleteFeature(item.id)}>
                    <Trash size="24px" />
                  </button>
                </div>
              </div>
            </div>

          )
        }
        )
      }
    </UseTailwind>
  )
}

export default FeatureList