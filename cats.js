(function () {
    if (!window.location.href.startsWith('https://kanobu.ru/shouts')) return;

    let domNode = document.querySelector('section.skeleton');
    if (domNode === null) return;

    const EDITOR_SELECTOR = 'div.c-editor';
    const EDITOR_BUTTONS_BAR_SELECTOR = 'div.c-editor_options:not(.has-stickers)';
    const STICKER_MARK_CLASS = 'has-stickers';
    const SHOUT_SELECTOR = '.js-list-item';

    const BUTTON_TEMPLATE_HTML = `
<div style="margin-left: 5px; height: 24px; width: 36px; background-color: #eee; border-radius: 3px; cursor: pointer;">
    <svg height="24" viewBox="0 -32 512 512" width="36" xmlns="http://www.w3.org/2000/svg">
        <path d="m342.382812 239.351562c-23.039062-35.941406-62.277343-57.402343-104.964843-57.402343-42.683594 0-81.925781 21.460937-104.960938 57.402343l-55.515625 86.605469c-9.210937 14.371094-13.460937 30.96875-12.292968 47.996094 1.167968 17.03125 7.648437 32.890625 18.738281 45.871094 11.097656 12.976562 25.761719 21.84375 42.40625 25.648437 16.644531 3.800782 33.707031 2.179688 49.339843-4.691406l1.019532-.453125c39.339844-16.957031 84.304687-16.804687 123.546875.453125 10.121093 4.449219 20.84375 6.699219 31.664062 6.699219 5.882813 0 11.800781-.667969 17.664063-2.003907 16.644531-3.800781 31.308594-12.667968 42.410156-25.644531 11.09375-12.976562 17.578125-28.839843 18.75-45.871093 1.171875-17.035157-3.078125-33.632813-12.289062-48.007813zm26.246094 160.972657c-14.121094 16.507812-36.964844 21.726562-56.847656 12.984375-23.632812-10.394532-49-15.589844-74.375-15.589844-25.351562 0-50.714844 5.191406-74.332031 15.574219l-.671875.296875c-19.730469 8.34375-42.238282 3.058594-56.203125-13.265625-14.105469-16.511719-15.710938-39.886719-3.992188-58.171875l55.519531-86.605469c17.492188-27.289063 47.28125-43.582031 79.691407-43.582031 32.410156 0 62.203125 16.292968 79.699219 43.582031l55.511718 86.601563c11.722656 18.292968 10.113282 41.671874-4 58.175781zm0 0" />
        <path d="m91.894531 239.238281c16.515625-6.34375 29.0625-19.652343 35.332031-37.476562 5.960938-16.960938 5.472657-36.109375-1.382812-53.921875-6.859375-17.800782-19.335938-32.332032-35.128906-40.921875-16.597656-9.019531-34.828125-10.488281-51.316406-4.132813-33.171876 12.753906-48.394532 53.746094-33.929688 91.398438 11.554688 29.96875 38.503906 48.886718 65.75 48.886718 6.957031 0 13.933594-1.234374 20.675781-3.832031zm-58.417969-55.835937c-8.523437-22.1875-1.035156-45.789063 16.703126-52.609375 3.203124-1.234375 6.589843-1.847657 10.046874-1.847657 5.335938 0 10.847657 1.457032 16.152344 4.34375 9.539063 5.183594 17.160156 14.183594 21.457032 25.335938 4.292968 11.160156 4.675781 22.941406 1.074218 33.179688-3.300781 9.382812-9.617187 16.28125-17.78125 19.417968l-.015625.007813c-17.714843 6.828125-39.085937-5.660157-47.636719-27.828125zm0 0" />
        <path d="m199.613281 171.386719c41.46875 0 75.207031-38.4375 75.207031-85.683594 0-47.257813-33.738281-85.703125-75.207031-85.703125-41.464843 0-75.199219 38.445312-75.199219 85.703125 0 47.246094 33.734376 85.683594 75.199219 85.683594zm0-141.375c24.917969 0 45.195313 24.984375 45.195313 55.691406 0 30.695313-20.277344 55.671875-45.195313 55.671875s-45.1875-24.976562-45.1875-55.671875c0-30.707031 20.269531-55.691406 45.1875-55.691406zm0 0" />
        <path d="m329.496094 192.4375h.003906c6.378906 2.117188 12.886719 3.128906 19.367188 3.128906 30.242187 0 59.714843-22.011718 70.960937-55.839844 6.476563-19.472656 6.050781-40.0625-1.199219-57.972656-7.585937-18.746094-21.644531-32.355468-39.589844-38.324218-17.945312-5.960938-37.363281-3.476563-54.664062 7-16.527344 10.011718-29.191406 26.246093-35.65625 45.71875-13.652344 41.078124 4.640625 84.273437 40.777344 96.289062zm-12.296875-86.824219c4.222656-12.714843 12.292969-23.191406 22.726562-29.511719 9.652344-5.847656 20.183594-7.335937 29.648438-4.191406 9.460937 3.148438 17 10.640625 21.234375 21.101563 4.574218 11.304687 4.769531 24.53125.539062 37.246093-8.433594 25.375-31.933594 40.492188-52.382812 33.699219-20.433594-6.796875-30.199219-32.96875-21.765625-58.34375zm0 0" />
        <path d="m487.875 182.4375-.011719-.011719c-28.597656-21.125-71.367187-11.96875-95.347656 20.421875-23.957031 32.40625-20.210937 75.972656 8.34375 97.113282 10.414063 7.714843 22.71875 11.402343 35.3125 11.402343 21.949219 0 44.785156-11.203125 60.046875-31.804687 23.957031-32.40625 20.214844-75.972656-8.34375-97.121094zm-15.777344 79.265625c-14.160156 19.113281-38.101562 25.453125-53.378906 14.136719-15.265625-11.300782-16.195312-36.042969-2.074219-55.144532 9.386719-12.679687 23.097657-19.734374 35.734375-19.734374 6.390625 0 12.507813 1.804687 17.648438 5.605468 15.253906 11.3125 16.179687 36.046875 2.070312 55.136719zm0 0" />
    </svg>
</div>`;

    const PANEL_TEMPLATE_HTML = `
<div style="background-color: #2b303b; border: 1px solid #4f535c; margin-top: 10px; overflow-y: scroll; max-height: 225px;">
    <div class="cat-stickers" style="display: flex; flex-wrap: wrap; margin-bottom: 5px;"></div>
</div>`;

    const STICKER_TEMPLATE_HTML = `
<div class="cat-sticker" style="margin: 5px; cursor: pointer; width: 64px; height: 64px; text-align: center;">
    <img class="cat-sticker-img" style="max-height: 100%; max-width: 100%;">
</div>`;

    const STICKER_URLS = [
        'https://u.kanobu.ru/cries/2020/10/03/0df51b7d-6b5a-48c3-92f2-d27d2f52542b.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/617ede8e-8976-4b77-b939-3d7fa0b576e0.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/40816cbf-6101-4f16-8121-515496a61d9f.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/4d9c5627-92b6-4ef4-b971-7e6b3bb7971c.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/0ae35b5b-ac51-4f76-85f4-f707e56cc554.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/aece1043-d613-469a-af78-b4b184e6cf67.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/d2b541be-83f5-4b85-86c1-762fba55cd70.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/bd65597d-742c-48c6-b731-e15bf0b594da.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/04553416-6217-4734-ba58-7003018a3dd3.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/b0a14412-dd6c-433d-9ce5-b73aead5a53e.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/6c2f4098-58d4-44cf-a64d-e3e95eadfffc.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/e25821f3-8036-4ac2-b0e5-b99d1f457aad.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/d5eac08d-4863-497d-9037-ab90980ccfe6.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/9b2d918f-1934-4a87-8111-e4f2b29cc8d7.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/9d6f485e-789e-4e9d-a468-59131f59ef3e.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/48084fe9-21f2-40d5-881a-ccd010764e7e.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/537df399-854f-4324-a9da-d15e043eb759.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/c9442ffc-380d-4e3a-84a6-eac7059a9aeb.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/285ceeb7-c7c1-4749-9bed-8ebc28a9d17a.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/4a9c57a9-91ef-466b-bc24-47eba45b4878.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/c2548269-a6cc-4b29-ba1a-dd4632ef39b2.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/7fdf8fe5-361f-4aa3-94c0-fa8fb3e148d9.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/c8a4fd8b-2851-4d65-81dc-a92e93f553af.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/d58bf4ba-d1ef-401d-ba15-97b3e56b1a12.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/4a8a2f83-a7c5-43ef-8e4b-000c034daad5.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/cd0548f0-c1db-46a2-b046-c0912a103923.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/61b70053-1902-461d-b6dc-44867a23f5bc.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/f3cbee31-3184-4d7d-853c-f89289e91d2d.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/ba2d3c31-24f7-4bf4-adc7-22623e5edd8c.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/1dbfd9b7-89a0-4f99-87fd-0f65faee1356.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/e42f6f69-630a-43b0-9550-c70797e8b3fa.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/ff3837ce-91fd-4ea9-b2dd-507d055508c8.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/b01b014a-1636-4296-aa97-de0147e89d07.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/bc17c853-ee81-4562-b162-0ef947ff7217.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/c5397017-f0c2-4705-9e22-3fd7f3d70473.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/763441f1-c94f-4e1f-81fa-9afccaaf433d.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/64a8136e-fd31-4c99-818a-6e762dae700e.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/7355efe4-2668-40e6-b473-231f3f3ede15.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/da28dd3d-ca3e-4fe1-a55c-319f0ab10dfc.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/23708330-74ac-4d50-a88c-366426fa84d7.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/dfdfb879-4623-419f-b4df-8dccb860b10f.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/5433ae46-b762-4b76-854f-b76fe39bd4db.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/fbcd09ee-5d91-42fe-bbdd-ca515d290cab.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/8969b4f5-52f8-4d2a-8b7d-24b8f5a2b4c8.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/592a7b5b-4148-4f87-b971-c18ac5b9399a.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/62fae515-19ad-4a94-a079-f5c2858a6f9f.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/7fd654b5-bd88-4967-82d0-fed6a9cbeb20.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/de21b7f8-d5a4-4aaa-8f30-e850078be08d.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/322094e7-5d68-4190-8b48-0a7607ae81f8.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/a9709eec-858e-4e73-a2d3-aa3d2fab9e0f.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/0ae12d56-a0fa-478c-b7b5-2a9581a575d9.jpg',
        'https://u.kanobu.ru/cries/2020/10/03/522ed1fc-c244-46f2-a557-b22e40629284.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/e43edc25-70db-4033-9708-40cfdbc8f437.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/e9bb0715-4336-49da-afa3-6678be30af8f.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/138a5dea-f9ee-4ff7-b498-d9d58f4b7b8a.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/72bbf5a3-6a1b-4cb3-bc82-0ea75b027e10.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/624b9f85-a215-4563-961a-2780e16f2423.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/561b0b68-5791-43aa-806a-4e4acc0d0f9c.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/328e18f0-ff93-4482-9e6f-992d846b82e7.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/a51be19f-fa0f-4477-b8a9-168da0f49742.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/6c5d99a1-a90d-43d0-9a9f-97db934e44a4.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/88176cc5-5699-449e-99a1-98ca16605b93.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/6dd8a249-44ac-4109-9348-09195a1f8c32.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/4614301b-cfc3-470f-bdf8-cf4f0f094142.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/f8ad9978-a6d4-49b5-9b35-74e73d925141.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/73b8759b-9e61-4bf7-9da3-5beb4d78908d.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/05600cb3-052f-47e9-91c3-1ec0e35235ae.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/72ac6b2b-dc02-42b4-8c64-c01b7288d710.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/425d9cc0-13bc-4c12-ab70-23a5017d61f0.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/77d98138-8ae8-4877-b96e-ca8dacf04a77.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/3032fd51-b592-4902-97e7-1a37470c53fc.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/1c19b6ba-4328-4883-9a45-9c57fc74826f.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/4c688c13-0f69-47c0-9008-25d97a5d6839.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/b7d32842-70af-4ecc-9293-d1a6b7920ade.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/64d1f2d5-f942-4686-af31-44e9a04d086b.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/271ad151-cda3-4dfc-8444-379bbdd76d9b.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/beb0a023-4850-4a8e-851f-d5daa949d323.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/0104b149-26d5-4bc5-960e-09398093ed64.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/b2a9d27d-4e99-4816-9bfd-e9f95f178408.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/b8c3d884-1844-4259-9b2c-c556bf489570.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/dc44778d-a28e-43c6-a094-b377cf388834.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/e3caed74-556a-4d06-a161-7767bea34a40.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/89f70fa2-9898-4c9d-a25f-7957d3689293.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/ab642bec-abdb-40f6-862a-5bcbcce18942.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/3c8a5723-d361-436c-a5b0-bcbca67035cd.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/727780fe-c3e5-4f87-9a41-f2fa6ba80c02.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/9018e2d1-d554-436e-ae47-32492893d908.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/a4e0f610-d67c-41e0-9f9f-f91658c57208.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/5b411226-f87b-4896-bed5-4f31e93c5cdd.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/84a242d0-c222-4762-a167-8965980c41dd.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/6d6ea0fd-9fe9-4885-a060-b1abe9a2c5fe.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/fd919999-c9fe-4bec-a77e-e8cc944dbbaa.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/9cf5e4c8-87f0-40d1-8781-d2d7872b7df4.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/c2682d89-a18b-4892-87ce-e5fcd9322bf3.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/1da2cfef-82e5-4ff1-8699-9c76d19544f6.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/9dce15ea-4506-4724-ade4-b6dd62ebbfa7.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/04b277f6-e478-4cf2-b09c-c4de59566d3a.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/29a13ba9-99d5-444b-9568-7488fbcb87a6.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/8e7ebdb7-1ef7-4507-8cfb-983d6862bc93.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/9b874b17-af5c-4096-8dd8-f66feb72edad.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/be1e24f1-f35a-43a4-b4cf-7e21f3ae2d4d.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/1d1e721c-b16e-4fcc-a04e-65563ed46775.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/105fd5da-8f5d-4e2a-acc6-c376afcc56ff.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/7beb3bf1-8aca-4024-a99f-cc5cd9f246ff.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/5337bfb6-6939-4742-b14b-c965322b0204.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/d05b5b49-7d94-4a4e-960a-25e310f31727.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/81654044-b4ea-4642-88a7-224ffd282433.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/2fb6d0c1-45d0-402e-81c9-66c3fe2dff7c.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/105b2de6-3eee-4488-908c-efd9f0a39223.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/f0a5e7a0-7218-434f-894a-4de1d7577bef.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/14d50cc3-7484-4365-9274-12f8d26be999.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/36889a09-6d70-4a34-bbb8-eb71d408c8d4.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/b75d1188-a295-47b9-919a-f754468348b1.jpg',
        'https://u.kanobu.ru/cries/2020/10/04/bedcb8f5-6c20-4319-9944-3aa06838b32a.jpg'
    ];

    const BUTTON_TEMPLATE = htmlToElement(BUTTON_TEMPLATE_HTML);

    const stickerPanel = createStickersPanel();

    function catify() {
        const buttonsBars = document.querySelectorAll(EDITOR_BUTTONS_BAR_SELECTOR);
        for (buttonsBar of buttonsBars) {
            buttonsBar.classList.add(STICKER_MARK_CLASS);
            addStickersButton(buttonsBar);
        }
    }

    function addStickersButton(buttonsBar) {
        const button = BUTTON_TEMPLATE.cloneNode(true);
        button.addEventListener('click', event => {
            event.preventDefault();
            const editor = button.closest(EDITOR_SELECTOR);
            if (editor) {
                if (editor.contains(stickerPanel)) {
                    editor.removeChild(stickerPanel);
                } else {
                    editor.appendChild(stickerPanel);
                }
            }
        });
        buttonsBar.appendChild(button);
    }

    function createStickersPanel() {
        const panel = htmlToElement(PANEL_TEMPLATE_HTML);
        const stickers = panel.querySelector('.cat-stickers');
        const stickerTemplate = htmlToElement(STICKER_TEMPLATE_HTML);
        for (let url of STICKER_URLS) {
            let sticker = stickerTemplate.cloneNode(true);
            sticker.querySelector('.cat-sticker-img').src = url;
            stickers.appendChild(sticker);
        }

        stickers.addEventListener('click', event => {
            if (!event.target.classList.contains('cat-sticker-img')) return;
            event.preventDefault();
            event.stopPropagation();
            sendSticker(event.target.src, getTargetPostUrl(panel));
            panel.remove();
        });

        return panel;
    }

    function sendSticker(stickerUrl, targetPostUrl) {
        fetch(stickerUrl)
            .then(response => response.blob())
            .then(blob => {
                const data = new FormData();
                data.append('image', blob, 'image.png');

                return fetch(targetPostUrl,
                {
                    method: 'post',
                    body: data,
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        'X-CSRFToken': getCookieValue('csrftoken')
                    }
                });
            });
    }

    function getTargetPostUrl(panel) {
        const shout = panel.closest(SHOUT_SELECTOR);
        if (shout === null) {
            return 'https://kanobu.ru/api/v1/cries/';
        }

        let shoutId = shout.querySelector('a[href^="/shouts/"]').href.match(/\/shouts\/(\d+)\//)[1];
        return `https://kanobu.ru/api/v1/cries/${shoutId}/answers/`;
    }

    function htmlToElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }

    function getCookieValue(name) {
        let matches = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return matches ? matches.pop() : '';
    }

    const observerOptions = { childList: true, subtree: true };
    const observer = new MutationObserver(catify);
    observer.observe(domNode, observerOptions);

    catify();
    window.__stickers = { observer };
})();