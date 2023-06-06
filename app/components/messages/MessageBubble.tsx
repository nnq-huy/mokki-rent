'use client'

import { Message } from '@prisma/client';
import Image from 'next/image';

interface MessageBubbleProps {
  message: Message;
  isLeft:boolean;
}
export const MessageBubble : React.FC<MessageBubbleProps> = ({message, isLeft})=>{

  if (isLeft) {return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="justify-end">
        {
					message.isPicture
					? <div className="rounded-xl shadow">
						<Image
							width={300}
							height={300}
							src={message.content}
							alt={'picture message'}>
						</Image>
					</div>
					: <div className="bg-white dark:bg-gray-500 p-3 rounded-r-lg shadow rounded-bl-lg">
            <p className="text-sm text-gray-800 dark:text-gray-100">
							{message.content}
						</p>
          </div>
				}
        <p className=" pt-1 text-xs text-gray-500">
					{message.createdAt.toLocaleDateString('fi')}
				</p>
      </div>
    </div>
    );} else {return(
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          {message.isPicture
						?	<div className="rounded-xl shadow">
							<Image
								width={300}
								height={300}
								src={message.content}
								alt={'picture message'}>
							</Image>
							</div>
						:
            <div className="bg-mokki-green text-white p-3 rounded-l-lg shadow rounded-br-lg">
              <p className="text-sm">{message.content}</p>
            </div>}
          <p className="text-end pt-1 text-xs text-gray-500 leading-none">
					{message.createdAt.toLocaleDateString('fi')}
					</p>
        </div>
      </div>
    )}

}