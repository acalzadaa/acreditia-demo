<!--
@component
DetailActions esta pensado para que tenga los IconButtons necesarios
para una pantalla de detalle, normalmente Edit.

-->

<script lang="ts">
	import Actions from "../ui/Actions.svelte";


    interface Props {
        item: unknown;
        showEdit: boolean;
        isEditDisabled: boolean;
        onClickEdit: ()=> void;
    }

    let {item, showEdit, isEditDisabled, onClickEdit} : Props = $props();
</script>

<Actions {item} {showEdit} {isEditDisabled} {onClickEdit}/>